import Link from "next/link"
import { PDFTools } from "@/components/pdf-tools"
import { ArrowLeft, ImageIcon, Zap, ShieldCheck, FileText } from "lucide-react"

export const metadata = {
  title: "Ghép ảnh thành PDF miễn phí | IPWeb",
  description:
    "Công cụ ghép nhiều ảnh JPG, PNG thành một file PDF miễn phí, nhanh chóng và xử lý trực tiếp trên trình duyệt.",
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
            <ImageIcon className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Ghép ảnh thành PDF miễn phí
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Chuyển nhiều ảnh JPG/PNG thành một file PDF duy nhất. Công cụ xử lý
            trực tiếp trên trình duyệt, nhanh chóng và bảo mật.
          </p>
        </section>

        <section className="mt-8">
          <PDFTools />
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Zap className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Nhanh chóng</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ghép nhiều ảnh thành PDF chỉ với vài thao tác đơn giản.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Riêng tư</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ảnh được xử lý ngay trên trình duyệt, hạn chế gửi dữ liệu lên server.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <FileText className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Một file gọn gàng</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Gộp nhiều ảnh rời thành một tài liệu PDF dễ lưu trữ và chia sẻ.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">Khi nào nên ghép ảnh thành PDF?</h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Ghép ảnh thành PDF hữu ích khi bạn cần gom nhiều ảnh chụp tài liệu,
              hóa đơn, giấy tờ hoặc bài tập thành một file duy nhất để gửi email,
              in ấn hoặc lưu trữ.
            </p>

            <p>
              Định dạng PDF giúp tài liệu dễ mở trên nhiều thiết bị và giữ thứ tự
              trang rõ ràng hơn so với việc gửi nhiều ảnh riêng lẻ.
            </p>
          </div>
        </section>

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