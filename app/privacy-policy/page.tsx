export const metadata = {
  title: "Chính sách bảo mật | PREV",
  description:
    "Chính sách bảo mật và quyền riêng tư khi sử dụng các công cụ trên PREV.",
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Chính sách bảo mật</h1>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          Chúng tôi cam kết bảo vệ quyền riêng tư của người dùng khi sử dụng các
          công cụ trên PREV.
        </p>

        <h2 className="font-semibold text-foreground">1. Thu thập thông tin</h2>
        <p>
          Website có thể thu thập thông tin cơ bản như địa chỉ IP, loại trình
          duyệt để cải thiện trải nghiệm người dùng.
        </p>

        <h2 className="font-semibold text-foreground">2. Xử lý dữ liệu</h2>
        <p>
          Các công cụ PDF xử lý trực tiếp trên trình duyệt của bạn. Chúng tôi
          không lưu trữ hoặc tải file lên máy chủ.
        </p>

        <h2 className="font-semibold text-foreground">3. Cookie</h2>
        <p>
          Website có thể sử dụng cookie để phân tích lưu lượng truy cập và cải
          thiện dịch vụ.
        </p>

        <h2 className="font-semibold text-foreground">4. Bên thứ ba</h2>
        <p>
          Website có thể sử dụng dịch vụ bên thứ ba như Google Analytics hoặc
          quảng cáo để phân tích và hiển thị nội dung phù hợp.
        </p>

        <h2 className="font-semibold text-foreground">5. Thay đổi</h2>
        <p>
          Chính sách này có thể được cập nhật theo thời gian. Người dùng nên kiểm
          tra thường xuyên.
        </p>
      </div>
    </main>
  )
}