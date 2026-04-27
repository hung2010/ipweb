import Link from "next/link"
import { PDFTools } from "@/components/pdf-tools"
import { ArrowLeft, FileImage, Zap, ShieldCheck, ImageIcon } from "lucide-react"

export const metadata = {
  title: "Chuyển PDF sang ảnh PNG miễn phí | PREV",
  description:
    "Công cụ chuyển PDF sang ảnh PNG chất lượng cao online miễn phí. Xử lý trực tiếp trên trình duyệt, không cần upload server.",
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
            <FileImage className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Chuyển PDF sang ảnh PNG miễn phí
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Chuyển mỗi trang PDF thành ảnh PNG chất lượng cao. Xử lý trực tiếp
            trên trình duyệt, không cần upload file, đảm bảo an toàn dữ liệu.
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
              Chuyển PDF sang ảnh chỉ trong vài giây.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">An toàn</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              File không được upload lên server, xử lý ngay trên trình duyệt.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ImageIcon className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Chất lượng cao</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Xuất ảnh PNG rõ nét, giữ nguyên nội dung PDF.
            </p>
          </div>
        </section>

        {/* SEO content */}
        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">
            Khi nào cần chuyển PDF sang ảnh?
          </h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Chuyển PDF sang ảnh giúp bạn dễ dàng chia sẻ nội dung tài liệu dưới
              dạng hình ảnh. Điều này rất hữu ích khi đăng lên mạng xã hội, gửi
              qua chat hoặc sử dụng trong các bài thuyết trình.
            </p>

            <p>
              Ngoài ra, ảnh PNG có thể mở trên mọi thiết bị mà không cần phần mềm
              đọc PDF, giúp tăng tính tương thích khi sử dụng.
            </p>
          </div>
        </section>

        {/* Internal links */}
        <section className="mt-8 text-sm text-muted-foreground">
          <p>
            Xem thêm:{" "}
            <Link href="/pdf-to-word" className="text-primary hover:underline">
              PDF sang Word
            </Link>{" "}
            ·{" "}
            <Link href="/images-to-pdf" className="text-primary hover:underline">
              Ảnh sang PDF
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