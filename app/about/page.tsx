export const metadata = {
  title: "Giới thiệu | IPWeb",
  description:
    "Giới thiệu về IPWeb và các công cụ online miễn phí dành cho người dùng.",
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Giới thiệu</h1>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          IPWeb là website cung cấp các công cụ online miễn phí giúp người dùng
          xử lý công việc nhanh chóng và tiện lợi.
        </p>

        <p>
          Các công cụ bao gồm:
        </p>

        <ul className="list-disc pl-5">
          <li>Check IP và thông tin mạng</li>
          <li>Tra cứu mã số thuế doanh nghiệp</li>
          <li>Chuyển đổi và xử lý file PDF</li>
        </ul>

        <p>
          Mục tiêu của chúng tôi là tạo ra các công cụ đơn giản, dễ sử dụng và
          bảo mật, giúp tiết kiệm thời gian cho người dùng.
        </p>

        <p>
          Tất cả công cụ được thiết kế để hoạt động trực tiếp trên trình duyệt,
          hạn chế việc tải dữ liệu lên server nhằm bảo vệ quyền riêng tư.
        </p>
      </div>
    </main>
  )
}