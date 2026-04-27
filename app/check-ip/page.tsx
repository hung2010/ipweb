import Link from "next/link"
import { IPInfo } from "@/components/ip-info"
import { ArrowLeft, Globe, ShieldCheck, Zap, MapPin } from "lucide-react"

export const metadata = {
  title: "Check IP - Kiểm tra địa chỉ IP miễn phí | PREV",
  description:
    "Kiểm tra địa chỉ IP của bạn, xem vị trí IP, ISP, quốc gia, thành phố và thông tin mạng nhanh chóng miễn phí.",
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
            <Globe className="h-7 w-7" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Kiểm tra địa chỉ IP miễn phí
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground leading-relaxed">
            Xem địa chỉ IP hiện tại, vị trí IP, nhà mạng, quốc gia, thành phố và
            các thông tin liên quan đến kết nối Internet của bạn.
          </p>
        </section>

        <section className="mt-8">
          <IPInfo />
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <Zap className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Nhanh chóng</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Hiển thị thông tin IP trong vài giây, giao diện dễ sử dụng.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <MapPin className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Thông tin vị trí</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Xem quốc gia, thành phố, múi giờ và nhà cung cấp Internet.
            </p>
          </div>

          <div className="rounded-2xl border bg-background p-5 shadow-sm">
            <ShieldCheck className="mb-3 h-5 w-5" />
            <h2 className="font-semibold">Miễn phí</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Công cụ check IP miễn phí, không cần đăng ký tài khoản.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-2xl border bg-background p-6 shadow-sm">
          <h2 className="text-xl font-bold">Check IP dùng để làm gì?</h2>

          <div className="mt-4 space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              Check IP giúp bạn biết địa chỉ IP công khai mà thiết bị đang sử
              dụng khi truy cập Internet. Thông tin này hữu ích khi kiểm tra kết
              nối mạng, cấu hình VPN, proxy hoặc xác định nhà cung cấp Internet.
            </p>

            <p>
              Công cụ cũng hỗ trợ xem nhanh vị trí IP như quốc gia, thành phố,
              múi giờ và ISP. Kết quả vị trí chỉ mang tính tương đối vì phụ
              thuộc vào cơ sở dữ liệu định vị IP.
            </p>
          </div>
        </section>

        <section className="mt-8 text-sm text-muted-foreground">
          <p>
            Xem thêm:{" "}
            <Link href="/tra-cuu-ma-so-thue" className="text-primary hover:underline">
              Tra cứu mã số thuế
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