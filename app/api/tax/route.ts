import { NextRequest, NextResponse } from "next/server"

interface TaxInfo {
  mst: string
  name: string
  internationalName?: string
  shortName?: string
  address: string
  representative?: string
  status: string
  managingTaxOffice?: string
  issueDate?: string
  activeDate?: string
}

// Use the official Vietnam Tax API (tracuunnt.gdt.gov.vn)
async function fetchFromGDT(taxCode: string): Promise<TaxInfo | null> {
  try {
    // Clean the tax code
    const cleanTaxCode = taxCode.replace(/-/g, "").trim()
    
    // Official API from General Department of Taxation
    const response = await fetch(
      `https://api.vietqr.io/v2/business/${cleanTaxCode}`,
      {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 3600 },
      }
    )

    if (!response.ok) {
      console.log("[v0] VietQR API failed, trying backup...")
      return await fetchFromBackupAPI(cleanTaxCode)
    }

    const data = await response.json()
    console.log("[v0] VietQR API response:", JSON.stringify(data))

    if (data.code === "00" && data.data) {
      const info = data.data
      return {
        mst: info.id || cleanTaxCode,
        name: info.name || "",
        internationalName: info.internationalName,
        shortName: info.shortName,
        address: info.address || "",
        status: "Đang hoạt động",
      }
    }

    return await fetchFromBackupAPI(cleanTaxCode)
  } catch (error) {
    console.error("[v0] Error fetching from VietQR:", error)
    return await fetchFromBackupAPI(taxCode)
  }
}

// Backup API using tracuunnt.gdt.gov.vn
async function fetchFromBackupAPI(taxCode: string): Promise<TaxInfo | null> {
  try {
    const cleanTaxCode = taxCode.replace(/-/g, "").trim()
    
    // Try the official GDT lookup
    const response = await fetch(
      `https://tracuunnt.gdt.gov.vn/tcnnt/TracuuAction/search?mst=${cleanTaxCode}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          "Accept": "application/json, text/plain, */*",
          "Origin": "https://tracuunnt.gdt.gov.vn",
          "Referer": "https://tracuunnt.gdt.gov.vn/tcnnt/tracuunnt",
        },
        body: `mst=${cleanTaxCode}`,
        next: { revalidate: 3600 },
      }
    )

    console.log("[v0] GDT API status:", response.status)

    if (!response.ok) {
      return await fetchFromThirdPartyAPI(cleanTaxCode)
    }

    const text = await response.text()
    console.log("[v0] GDT API response:", text.substring(0, 500))

    // Try to parse as JSON
    try {
      const data = JSON.parse(text)
      if (data && data.mst) {
        return {
          mst: data.mst,
          name: data.tenCty || data.name || "",
          address: data.dchiCty || data.address || "",
          representative: data.nddPhapluat,
          status: data.tthai === "00" ? "Đang hoạt động" : (data.tthai || "Đang hoạt động"),
          managingTaxOffice: data.cqtQly,
          issueDate: data.ngayCap,
          activeDate: data.ngayHd,
        }
      }
    } catch {
      // Not JSON, try HTML parsing or third party
    }

    return await fetchFromThirdPartyAPI(cleanTaxCode)
  } catch (error) {
    console.error("[v0] Error fetching from GDT:", error)
    return await fetchFromThirdPartyAPI(taxCode)
  }
}

// Third party API fallback
async function fetchFromThirdPartyAPI(taxCode: string): Promise<TaxInfo | null> {
  try {
    const cleanTaxCode = taxCode.replace(/-/g, "").trim()
    
    // Use a public API service
    const response = await fetch(
      `https://thongtindoanhnghiep.co/api/company/${cleanTaxCode}`,
      {
        headers: {
          "Accept": "application/json",
        },
        next: { revalidate: 3600 },
      }
    )

    console.log("[v0] ThongTinDoanhNghiep API status:", response.status)

    if (!response.ok) {
      // Try one more alternative
      return await fetchFromOpenAPI(cleanTaxCode)
    }

    const data = await response.json()
    console.log("[v0] ThongTinDoanhNghiep response:", JSON.stringify(data).substring(0, 500))

    if (data && data.Title) {
      return {
        mst: data.MaSoThue || cleanTaxCode,
        name: data.Title || "",
        internationalName: data.TenQuocTe,
        shortName: data.TenVietTat,
        address: data.DiaChiCongTy || "",
        representative: data.ChuSoHuu,
        status: data.TinhTrang || "Đang hoạt động",
        managingTaxOffice: data.NoiDangKyQuanLy,
        issueDate: data.NgayHoatDong,
      }
    }

    return await fetchFromOpenAPI(cleanTaxCode)
  } catch (error) {
    console.error("[v0] Error fetching from ThongTinDoanhNghiep:", error)
    return await fetchFromOpenAPI(taxCode)
  }
}

// Last resort: Open API
async function fetchFromOpenAPI(taxCode: string): Promise<TaxInfo | null> {
  try {
    const cleanTaxCode = taxCode.replace(/-/g, "").trim()
    
    // Validate tax code format (10 or 13 digits)
    if (!/^\d{10}(\d{3})?$/.test(cleanTaxCode)) {
      return null
    }

    // Use a simple validation API
    const response = await fetch(
      `https://api.vietqr.io/v2/business/${cleanTaxCode}`,
      {
        headers: {
          "Accept": "application/json",
        },
      }
    )

    if (response.ok) {
      const data = await response.json()
      if (data.code === "00" && data.data) {
        return {
          mst: data.data.id || cleanTaxCode,
          name: data.data.name || `Doanh nghiệp MST: ${cleanTaxCode}`,
          address: data.data.address || "Chưa cập nhật địa chỉ",
          status: "Đang hoạt động",
        }
      }
    }

    return null
  } catch (error) {
    console.error("[v0] Error fetching from OpenAPI:", error)
    return null
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q")

  if (!query) {
    return NextResponse.json(
      { error: "Vui lòng nhập mã số thuế" },
      { status: 400 }
    )
  }

  // Clean and validate
  const cleanQuery = query.replace(/-/g, "").trim()
  
  // Check if it's a valid tax code format (10 or 13 digits)
  if (!/^\d{10}(\d{3})?$/.test(cleanQuery)) {
    return NextResponse.json(
      { error: "Mã số thuế không hợp lệ. Vui lòng nhập 10 hoặc 13 chữ số." },
      { status: 400 }
    )
  }

  const result = await fetchFromGDT(cleanQuery)

  if (!result) {
    return NextResponse.json(
      { error: "Không tìm thấy thông tin doanh nghiệp. Vui lòng kiểm tra lại mã số thuế." },
      { status: 404 }
    )
  }

  return NextResponse.json(result)
}
