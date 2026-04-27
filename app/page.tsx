import Link from "next/link"
import {
  Globe,
  Building2,
  FileImage,
  FileText,
  FileSpreadsheet,
  Minimize2,
  ImageIcon,
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react"

const tools = [
  {
    title: "Check IP",
    description: "Kiểm tra IP, vị trí, ISP và thông tin mạng.",
    href: "/check-ip",
    icon: Globe,
  },
  {
    title: "Tra cứu mã số thuế",
    description: "Tìm thông tin doanh nghiệp theo mã số thuế.",
    href: "/tra-cuu-ma-so-thue",
    icon: Building2,
  },
  {
    title: "PDF sang ảnh",
    description: "Chuyển từng trang PDF thành ảnh PNG.",
    href: "/pdf-to-image",
    icon: FileImage,
  },
  {
    title: "PDF sang Word",
    description: "Trích xuất nội dung PDF sang file DOC.",
    href: "/pdf-to-word",
    icon: FileText,
  },
  {
    title: "PDF sang CSV",
    description: "Trích xuất dữ liệu PDF sang CSV mở bằng Excel.",
    href: "/pdf-to-excel",
    icon: FileSpreadsheet,
  },
  {
    title: "Nén PDF",
    description: "Giảm dung lượng file PDF nhanh chóng.",
    href: "/compress-pdf",
    icon: Minimize2,
  },
  {
    title: "Ảnh sang PDF",
    description: "Ghép nhiều ảnh JPG/PNG thành một file PDF.",
    href: "/images-to-pdf",
    icon: ImageIcon,
  },
]

export const metadata = {
  title: "IPWeb - Công cụ PDF, Check IP và tra cứu mã số thuế miễn phí",
  description:
    "Bộ công cụ online miễn phí: Check IP, tra cứu mã số thuế, chuyển PDF sang ảnh, PDF sang Word, PDF sang CSV, nén PDF và ghép ảnh thành PDF.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/40">
      <header className="border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-sm">
              IP
            </div>

            <div>
              <p className="font-bold leading-none">IPWeb</p>
              <p className="text-xs text-muted-foreground">
                Công cụ online miễn phí
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/check-ip" className="hover:text-foreground">
              Check IP
            </Link>
            <Link href="/tra-cuu-ma-so-thue" className="hover:text-foreground">
              Mã số thuế
            </Link>
            <Link href="/pdf-to-image" className="hover:text-foreground">
              PDF Tools
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="inline-flex items-center rounded-full border bg-background px-4 py-2 text-sm text-muted-foreground shadow-sm mb-6">
            Miễn phí · Nhanh chóng · Dễ sử dụng
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Công cụ PDF, Check IP và tra cứu mã số thuế miễn phí
          </h1>

          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Bộ công cụ online giúp bạn xử lý PDF, kiểm tra thông tin IP và tra cứu
            doanh nghiệp nhanh chóng ngay trên trình duyệt.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              href="/pdf-to-image"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:opacity-90"
            >
              Dùng công cụ PDF
            </Link>

            <Link
              href="/check-ip"
              className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium shadow-sm hover:bg-muted"
            >
              Check IP ngay
            </Link>
          </div>

          <p className="mt-3 text-sm text-muted-foreground">
            Hoặc bắt đầu với{" "}
            <Link href="/images-to-pdf" className="text-primary underline">
              ghép ảnh thành PDF
            </Link>
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Danh sách công cụ</h2>
          <p className="mt-2 text-muted-foreground">
            Chọn công cụ bạn cần sử dụng bên dưới.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const Icon = tool.icon

            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">{tool.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {tool.description}
                </p>

                <p className="mt-4 text-sm font-medium text-primary">
                  Mở công cụ →
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container mx-auto max-w-6xl px-4 py-14">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl bg-background p-6 border">
              <Zap className="h-6 w-6 mb-4" />
              <h3 className="font-semibold">Nhanh chóng</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Các công cụ được tối ưu để thao tác đơn giản và xử lý nhanh.
              </p>
            </div>

            <div className="rounded-2xl bg-background p-6 border">
              <Lock className="h-6 w-6 mb-4" />
              <h3 className="font-semibold">Riêng tư hơn</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Nhiều thao tác PDF được xử lý trực tiếp trên trình duyệt của bạn.
              </p>
            </div>

            <div className="rounded-2xl bg-background p-6 border">
              <ShieldCheck className="h-6 w-6 mb-4" />
              <h3 className="font-semibold">Miễn phí</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sử dụng các công cụ cơ bản miễn phí, không cần đăng nhập.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold">
          Công cụ online cho công việc hằng ngày
        </h2>

        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            IPWeb cung cấp các công cụ miễn phí giúp bạn kiểm tra địa chỉ IP,
            tra cứu mã số thuế doanh nghiệp và xử lý file PDF trực tuyến.
          </p>

          <p>
            Bạn có thể sử dụng các công cụ như{" "}
            <Link href="/pdf-to-image" className="text-primary underline">
              PDF sang ảnh
            </Link>
            ,{" "}
            <Link href="/pdf-to-word" className="text-primary underline">
              PDF sang Word
            </Link>
            ,{" "}
            <Link href="/pdf-to-excel" className="text-primary underline">
              PDF sang CSV
            </Link>{" "}
            hoặc{" "}
            <Link href="/compress-pdf" className="text-primary underline">
              nén PDF
            </Link>{" "}
            để xử lý tài liệu dễ dàng hơn.
          </p>

          <p>
            Website được thiết kế để sử dụng nhanh, giao diện đơn giản và phù hợp
            cho học tập, văn phòng, kế toán, kinh doanh hoặc nhu cầu cá nhân.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-2xl font-bold">
          Các công cụ PDF và tiện ích phổ biến
        </h2>

        <div className="mt-4 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Các công cụ PDF online giúp người dùng xử lý tài liệu nhanh chóng mà
            không cần cài đặt phần mềm.
          </p>

          <p>
            Bạn có thể chuyển PDF sang ảnh, trích xuất nội dung PDF sang DOC
            hoặc CSV, nén file PDF để giảm dung lượng và ghép nhiều ảnh thành
            một tài liệu PDF duy nhất.
          </p>

          <p>
            Ngoài ra, công cụ Check IP và tra cứu mã số thuế giúp kiểm tra thông
            tin mạng và doanh nghiệp một cách nhanh chóng, hỗ trợ tốt cho công
            việc văn phòng và kinh doanh.
          </p>
        </div>
      </section>

      <section className="container mx-auto max-w-4xl px-4 pb-16">
        <h2 className="text-2xl font-bold">Câu hỏi thường gặp</h2>

        <div className="mt-4 space-y-4 text-sm text-muted-foreground leading-relaxed">
          <div>
            <h3 className="font-semibold text-foreground">
              Các công cụ này có miễn phí không?
            </h3>
            <p className="mt-1">
              Có, bạn có thể sử dụng miễn phí mà không cần đăng ký tài khoản.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              Dữ liệu có bị lưu trên server không?
            </h3>
            <p className="mt-1">
              Nhiều thao tác PDF được xử lý trực tiếp trên trình duyệt, giúp hạn
              chế việc gửi dữ liệu lên server.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              Có cần cài phần mềm không?
            </h3>
            <p className="mt-1">
              Không, tất cả công cụ chạy trực tiếp trên website.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t">
        <div className="container mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} IPWeb. Công cụ online miễn phí.</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="hover:text-foreground">
              Chính sách bảo mật
            </Link>
            <Link href="/about" className="hover:text-foreground">
              Giới thiệu
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Liên hệ
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}