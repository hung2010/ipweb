"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import {
  Building2,
  Search,
  Copy,
  Check,
  MapPin,
  User,
  FileText,
  Calendar,
  Phone,
  BadgeCheck,
} from "lucide-react"

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
  phone?: string
}

export function TaxLookup() {
  const [query, setQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<TaxInfo | TaxInfo[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedMst, setCopiedMst] = useState<string | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch(`/api/tax?q=${encodeURIComponent(query.trim())}`)
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Có lỗi xảy ra khi tra cứu")
        return
      }

      setResult(data)
    } catch {
      setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyMst = async (mst: string) => {
    await navigator.clipboard.writeText(mst)
    setCopiedMst(mst)
    setTimeout(() => setCopiedMst(null), 2000)
  }

  const isSingleResult = result && !Array.isArray(result)
  const isMultipleResults = result && Array.isArray(result)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center rounded-full bg-primary/10 p-3 mb-4">
          <Building2 className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tra Cứu Mã Số Thuế
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Tra cứu mã số thuế doanh nghiệp, công ty, cá nhân nhanh chóng và chính xác
        </p>
      </div>

      {/* Search Form */}
      <Card className="border-2 border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="text"
              placeholder="Nhập mã số thuế (VD: 0100109106)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-background"
            />
            <Button type="submit" disabled={isLoading || !query.trim()} className="sm:w-auto w-full">
              {isLoading ? (
                <Spinner className="h-4 w-4" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              <span className="ml-2">Tra cứu</span>
            </Button>
          </form>
          <p className="text-sm text-muted-foreground mt-3">
            Nhập mã số thuế gồm 10 hoặc 13 chữ số. VD: 0100109106 (Vinamilk), 0101326329 (FPT)
          </p>
        </CardContent>
      </Card>

      {/* Error Message */}
      {error && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardContent className="pt-6">
            <p className="text-destructive text-center">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center py-8 gap-4">
              <Spinner className="h-8 w-8" />
              <p className="text-muted-foreground">Đang tra cứu thông tin...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Single Result */}
      {isSingleResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Building2 className="h-5 w-5" />
              {(result as TaxInfo).name}
            </CardTitle>
            {(result as TaxInfo).internationalName && (
              <p className="text-sm text-muted-foreground mt-1">
                {(result as TaxInfo).internationalName}
              </p>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <InfoRow
                icon={<FileText className="h-4 w-4" />}
                label="Mã số thuế"
                value={(result as TaxInfo).mst}
                onCopy={() => handleCopyMst((result as TaxInfo).mst)}
                copied={copiedMst === (result as TaxInfo).mst}
              />
              {(result as TaxInfo).shortName && (
                <InfoRow
                  icon={<Building2 className="h-4 w-4" />}
                  label="Tên viết tắt"
                  value={(result as TaxInfo).shortName!}
                />
              )}
              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Địa chỉ"
                value={(result as TaxInfo).address}
              />
              {(result as TaxInfo).representative && (
                <InfoRow
                  icon={<User className="h-4 w-4" />}
                  label="Người đại diện"
                  value={(result as TaxInfo).representative!}
                />
              )}
              <InfoRow
                icon={<BadgeCheck className="h-4 w-4" />}
                label="Trạng thái"
                value={(result as TaxInfo).status}
                status={(result as TaxInfo).status}
              />
              {(result as TaxInfo).managingTaxOffice && (
                <InfoRow
                  icon={<Building2 className="h-4 w-4" />}
                  label="Cơ quan thuế quản lý"
                  value={(result as TaxInfo).managingTaxOffice!}
                />
              )}
              {(result as TaxInfo).issueDate && (
                <InfoRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Ngày cấp"
                  value={(result as TaxInfo).issueDate!}
                />
              )}
              {(result as TaxInfo).activeDate && (
                <InfoRow
                  icon={<Calendar className="h-4 w-4" />}
                  label="Ngày hoạt động"
                  value={(result as TaxInfo).activeDate!}
                />
              )}
              {(result as TaxInfo).phone && (
                <InfoRow
                  icon={<Phone className="h-4 w-4" />}
                  label="Số điện thoại"
                  value={(result as TaxInfo).phone!}
                />
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Multiple Results */}
      {isMultipleResults && (result as TaxInfo[]).length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">
            Tìm thấy {(result as TaxInfo[]).length} kết quả
          </h2>
          {(result as TaxInfo[]).map((item, index) => (
            <Card key={index} className="hover:border-primary/30 transition-colors">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg leading-tight">
                        {item.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-sm text-muted-foreground">MST:</span>
                        <code className="px-2 py-0.5 bg-muted rounded text-sm font-mono">
                          {item.mst}
                        </code>
                        <button
                          onClick={() => handleCopyMst(item.mst)}
                          className="p-1 hover:bg-muted rounded transition-colors"
                          title="Sao chép MST"
                        >
                          {copiedMst === item.mst ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>{item.address}</span>
                  </div>
                  {item.representative && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4 shrink-0" />
                      <span>Người đại diện: {item.representative}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* No Results */}
      {isMultipleResults && (result as TaxInfo[]).length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground py-8">
              Không tìm thấy kết quả phù hợp
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tra cứu mã số thuế là gì?</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm dark:prose-invert max-w-none">
          <p className="text-muted-foreground leading-relaxed">
            <strong>Mã số thuế (MST)</strong> là một dãy số được Cơ quan thuế cấp cho người nộp thuế, 
            dùng để quản lý thuế và là một thông tin bắt buộc phải có trên hóa đơn khi mua bán hàng hóa, dịch vụ.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong>Tra cứu mã số thuế</strong> giúp bạn kiểm tra thông tin doanh nghiệp, xác minh tính hợp lệ 
            của đối tác kinh doanh, và đảm bảo giao dịch an toàn.
          </p>
          <ul className="text-muted-foreground space-y-1">
            <li>MST doanh nghiệp: 10 số hoặc 13 số (có dấu gạch ngang)</li>
            <li>MST cá nhân: 10 số</li>
            <li>Chi nhánh/Văn phòng đại diện: MST công ty mẹ + 3 số</li>
          </ul>
          <p className="text-sm text-muted-foreground italic mt-4">
            <strong>Lưu ý:</strong> Thông tin được tổng hợp từ các nguồn công khai và chỉ mang tính chất tham khảo.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  onCopy,
  copied,
  status,
}: {
  icon: React.ReactNode
  label: string
  value: string
  onCopy?: () => void
  copied?: boolean
  status?: string
}) {
  return (
    <div className="flex items-start gap-4 py-3 border-b border-border last:border-0">
      <div className="flex items-center gap-2 w-44 shrink-0 text-muted-foreground">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-2 flex-1">
        {status ? (
          <StatusBadge status={status} />
        ) : (
          <span className="text-sm">{value}</span>
        )}
        {onCopy && (
          <button
            onClick={onCopy}
            className="p-1 hover:bg-muted rounded transition-colors"
            title="Sao chép"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isActive = status.toLowerCase().includes("hoạt động") || 
                   status.toLowerCase().includes("active")
  
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive
          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-green-500" : "bg-yellow-500"}`} />
      {status}
    </span>
  )
}
