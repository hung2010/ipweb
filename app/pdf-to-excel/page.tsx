import Link from "next/link"
import { PDFTools } from "@/components/pdf-tools"
import { ArrowLeft, FileSpreadsheet, Zap, ShieldCheck, Table } from "lucide-react"

export const metadata = {
  title: "Chuyển PDF sang CSV miễn phí | PREV",
  description:
    "Công cụ chuyển PDF sang CSV giúp trích xuất dữ liệu bảng từ PDF nhanh chóng và dễ dàng, hỗ trợ mở bằng Excel.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ
        </Link>

        {/* Hero */}
        <section className="mt-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <FileSpreadsheet className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Chuyển PDF sang CSV miễn phí
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Trích xuất dữ liệu bảng từ file PDF sang định dạng CSV để mở bằng Excel.
            Xử lý trực tiếp trên trình duyệt, không cần upload file.
          </p>
        </section>

        {/* Tool */}
        <section className="mt-8">
          <PDFTools />
        </section>

        {/* Benefits */}
        <section className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Zap className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Nhanh chóng</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Trích xuất dữ liệu PDF chỉ trong vài giây.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">An toàn</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              File được xử lý trên trình duyệt, không lưu trữ trên server.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Table className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Dễ sử dụng</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              File CSV có thể mở trực tiếp bằng Excel hoặc Google Sheets.
            </p>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">PDF sang CSV là gì?</h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Chuyển PDF sang CSV giúp bạn trích xuất dữ liệu dạng bảng từ tài
              liệu PDF sang định dạng có thể xử lý bằng Excel hoặc Google Sheets.
              Điều này rất hữu ích cho kế toán, thống kê và phân tích dữ liệu.
            </p>

            <p>
              Công cụ online giúp bạn thực hiện thao tác này nhanh chóng mà không
              cần cài đặt phần mềm. Dữ liệu được xử lý trực tiếp trên trình duyệt,
              đảm bảo tính riêng tư.
            </p>
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-8 text-sm text-muted-foreground">
          <p>
            Xem thêm:{" "}
            <Link href="/pdf-to-image" className="text-primary hover:underline">
              PDF sang ảnh
            </Link>{" "}
            ·{" "}
            <Link href="/pdf-to-word" className="text-primary hover:underline">
              PDF sang Word
            </Link>{" "}
            ·{" "}
            <Link href="/compress-pdf" className="text-primary hover:underline">
              Nén PDF
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}