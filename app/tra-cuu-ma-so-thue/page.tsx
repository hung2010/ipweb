import Link from "next/link"
import { TaxLookup } from "@/components/tax-lookup"
import { ArrowLeft, Building2, Search, Zap, ShieldCheck } from "lucide-react"

export const metadata = {
  title: "Tra cứu mã số thuế doanh nghiệp miễn phí | PREV",
  description:
    "Tra cứu mã số thuế doanh nghiệp, xem thông tin công ty nhanh chóng và miễn phí theo mã số thuế.",
}

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <div className="container mx-auto max-w-4xl px-4 py-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ
        </Link>

        <section className="mt-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Building2 className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Tra cứu mã số thuế doanh nghiệp
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Nhập mã số thuế để tìm kiếm thông tin doanh nghiệp, tên công ty,
            địa chỉ và các dữ liệu liên quan một cách nhanh chóng.
          </p>
        </section>

        <section className="mt-8">
          <TaxLookup />
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Search className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Tra cứu nhanh</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Tìm thông tin doanh nghiệp theo mã số thuế chỉ với vài thao tác.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Building2 className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Thông tin doanh nghiệp</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hỗ trợ xem tên công ty, địa chỉ và các thông tin liên quan.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Zap className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Miễn phí</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Công cụ tra cứu mã số thuế miễn phí, không cần đăng nhập.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Tra cứu mã số thuế dùng để làm gì?
          </h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Tra cứu mã số thuế giúp bạn kiểm tra nhanh thông tin doanh nghiệp
              trước khi giao dịch, xuất hóa đơn, ký hợp đồng hoặc xác minh thông
              tin đối tác.
            </p>

            <p>
              Mã số thuế là thông tin quan trọng để nhận diện doanh nghiệp trong
              các hoạt động kế toán, thuế và kinh doanh. Công cụ này giúp việc
              tìm kiếm trở nên thuận tiện hơn.
            </p>
          </div>
        </section>

        <section className="mt-8 text-sm text-muted-foreground">
          <p>
            Xem thêm:{" "}
            <Link href="/check-ip" className="text-primary hover:underline">
              Check IP
            </Link>{" "}
            ·{" "}
            <Link href="/pdf-to-image" className="text-primary hover:underline">
              PDF sang ảnh
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