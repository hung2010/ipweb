export const metadata = {
  title: "Liên hệ | PREV",
  description:
    "Thông tin liên hệ và hỗ trợ người dùng PREV.",
}

export default function Page() {
  return (
    <main className="container mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Liên hệ</h1>

      <div className="mt-6 space-y-4 text-sm text-muted-foreground leading-relaxed">
        <p>
          Nếu bạn có câu hỏi, góp ý hoặc cần hỗ trợ, vui lòng liên hệ với chúng
          tôi qua thông tin bên dưới.
        </p>

        <p>
          Email: <span className="text-foreground">hung2010pro2010@gmail.com</span>
        </p>

        <p>
          Chúng tôi sẽ phản hồi trong thời gian sớm nhất có thể.
        </p>
      </div>
    </main>
  )
}