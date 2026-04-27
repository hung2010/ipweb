import Link from "next/link"
import { PDFTools } from "@/components/pdf-tools"
import { ArrowLeft, Minimize2, Zap, ShieldCheck, FileDown } from "lucide-react"

export const metadata = {
  title: "Nén PDF miễn phí - Giảm dung lượng PDF online | IPWeb",
  description:
    "Công cụ nén PDF miễn phí giúp giảm dung lượng file nhanh chóng, không cần upload server, đảm bảo riêng tư.",
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
            <Minimize2 className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Nén PDF miễn phí
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Giảm dung lượng file PDF nhanh chóng để gửi email hoặc upload dễ dàng.
            Tất cả xử lý trực tiếp trên trình duyệt, đảm bảo riêng tư.
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
              Nén PDF chỉ trong vài giây với thao tác đơn giản.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Riêng tư</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              File không được upload lên server, xử lý ngay trên trình duyệt.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <FileDown className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Dễ sử dụng</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Kéo thả file và tải xuống ngay sau khi xử lý.
            </p>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">Nén PDF là gì?</h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Nén PDF là quá trình giảm dung lượng file PDF mà vẫn giữ được nội
              dung cần thiết. Điều này giúp bạn dễ dàng gửi file qua email hoặc
              upload lên các hệ thống có giới hạn dung lượng.
            </p>

            <p>
              Công cụ nén PDF online giúp bạn thực hiện thao tác này nhanh chóng
              mà không cần cài đặt phần mềm. Việc xử lý trực tiếp trên trình
              duyệt giúp đảm bảo an toàn dữ liệu cá nhân.
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
            <Link href="/images-to-pdf" className="text-primary hover:underline">
              Ảnh sang PDF
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}