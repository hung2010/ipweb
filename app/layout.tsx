import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Script from "next/script"

const geist = Geist({
  subsets: ["latin", "vietnamese"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-geist-mono",
})

const siteUrl = "https://prev.io.vn" // Sau này có domain riêng thì đổi ở đây

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "PREV - Check IP, Tra cứu mã số thuế và công cụ PDF miễn phí",
    template: "%s | PREV",
  },

  description:
    "PREV cung cấp công cụ Check IP, kiểm tra IP Location, tra cứu mã số thuế doanh nghiệp, chuyển PDF sang ảnh, PDF sang DOC, PDF sang CSV, nén PDF và ghép ảnh thành PDF miễn phí.",

  keywords: [
    "check ip",
    "kiểm tra ip",
    "ip location",
    "tra cứu mã số thuế",
    "mã số thuế doanh nghiệp",
    "công cụ PDF",
    "PDF sang ảnh",
    "PDF sang Word",
    "PDF sang Excel",
    "PDF sang CSV",
    "nén PDF",
    "ghép ảnh thành PDF",
    "ảnh sang PDF",
  ],

  authors: [{ name: "Hung" }],
  creator: "Hung",
  publisher: "PREV",

  applicationName: "PREV",
  generator: "Next.js",

  verification: {
  google: "FE9klt5LLEtNppMyDcb0z-cMJdzaUn6GDVAsv2Rpfd0",
},


  alternates: {
    canonical: "/",
  },

openGraph: {
  title: "PREV - Công cụ Check IP, mã số thuế và PDF miễn phí",
  description:
    "Check IP, tra cứu mã số thuế, chuyển đổi PDF, nén PDF và ghép ảnh thành PDF miễn phí ngay trên trình duyệt.",
  url: siteUrl,
  siteName: "PREV",
  locale: "vi_VN",
  type: "website",
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: "PREV - Công cụ miễn phí",
    },
  ],
},

  twitter: {
    card: "summary_large_image",
    title: "PREV - Công cụ miễn phí",
    description:
      "Check IP, tra cứu mã số thuế và xử lý PDF online miễn phí.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className="bg-background">
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
        
        {process.env.NODE_ENV === "production" && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-G5SQPC0F9Y"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-G5SQPC0F9Y');
            `}
          </Script>
        </>
      )}

      </body>
    </html>
  )
}