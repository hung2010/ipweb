import Link from "next/link"
import { PDFTools } from "@/components/pdf-tools"
import { ArrowLeft, FileText, Zap, ShieldCheck, FileDown } from "lucide-react"

export const metadata = {
  title: "Chuyển PDF sang Word miễn phí | IPWeb",
  description:
    "Công cụ chuyển PDF sang Word (.doc) miễn phí, trích xuất nội dung nhanh chóng, không cần upload server, bảo mật cao.",
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
            <FileText className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Chuyển PDF sang Word miễn phí
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Trích xuất nội dung từ file PDF thành file Word (.doc) nhanh chóng.
            Xử lý trực tiếp trên trình duyệt, không cần upload file, đảm bảo an
            toàn dữ liệu.
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
              Chuyển đổi PDF sang Word chỉ trong vài giây.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Bảo mật</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Dữ liệu được xử lý trên trình duyệt, không lưu trữ trên server.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <FileDown className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Dễ chỉnh sửa</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              File Word xuất ra dễ chỉnh sửa nội dung hơn PDF.
            </p>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            PDF sang Word là gì?
          </h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Chuyển PDF sang Word là quá trình trích xuất nội dung văn bản từ
              file PDF sang định dạng có thể chỉnh sửa như DOC hoặc DOCX. Điều
              này giúp bạn dễ dàng chỉnh sửa nội dung mà không cần tạo lại tài
              liệu từ đầu.
            </p>

            <p>
              Công cụ online giúp bạn thực hiện thao tác này nhanh chóng mà không
              cần cài đặt phần mềm. Việc xử lý trực tiếp trên trình duyệt giúp
              đảm bảo tính riêng tư và bảo mật.
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
            <Link href="/pdf-to-excel" className="text-primary hover:underline">
              PDF sang CSV
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