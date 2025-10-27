import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tịch Văn",
  description:
    "TỊCH VĂN - TÁI HIỆN HỒN VĂN, ĐÁNH THỨC CẢM QUAN Minishow – Tịch Văn nơi bạn trải nghiệm văn học cùng những câu chuyện không chỉ được kể, mà còn len lỏi vào cảm quan, lay động ký ức và cảm xúc của chính bạn. Hãy sẵn sàng để cùng chúng tôi đánh thức cảm quan và sống trọn vẹn trong thế giới văn chương Nam Bộ.",
  openGraph: {
    title: "TỊCH VĂN",
    description:
      "TỊCH VĂN - TÁI HIỆN HỒN VĂN, ĐÁNH THỨC CẢM QUAN Minishow – Tịch Văn nơi bạn trải nghiệm văn học cùng những câu chuyện không chỉ được kể, mà còn len lỏi vào cảm quan, lay động ký ức và cảm xúc của chính bạn. Hãy sẵn sàng để cùng chúng tôi đánh thức cảm quan và sống trọn vẹn trong thế giới văn chương Nam Bộ.",
    url: "https://tich-van-show.vercel.app/",
    images: [
      {
        url: "https://res.cloudinary.com/dx1ejni0o/image/upload/v1761462702/tich-van/tnpnqw3ofdepren3jxmz.png",
        width: 1200,
        height: 630,
        alt: "TỊCH VĂN",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TỊCH VĂN",
    description:
      "TỊCH VĂN - TÁI HIỆN HỒN VĂN, ĐÁNH THỨC CẢM QUAN Minishow – Tịch Văn nơi bạn trải nghiệm văn học cùng những câu chuyện không chỉ được kể, mà còn len lỏi vào cảm quan, lay động ký ức và cảm xúc của chính bạn. Hãy sẵn sàng để cùng chúng tôi đánh thức cảm quan và sống trọn vẹn trong thế giới văn chương Nam Bộ.",
    images: [
      "https://res.cloudinary.com/dx1ejni0o/image/upload/v1761462702/tich-van/tnpnqw3ofdepren3jxmz.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        {children}

        <Toaster />
      </body>
    </html>
  );
}
