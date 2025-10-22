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
  title: "Tịch Văn Show",
  description:
    "TỊCH VĂN - TÁI HIỆN HỒN VĂN, ĐÁNH THỨC CẢM QUAN Minishow – Tịch Văn nơi bạn trải nghiệm văn học cùng những câu chuyện không chỉ được kể, mà còn len lỏi vào cảm quan, lay động ký ức và cảm xúc của chính bạn. Hãy sẵn sàng để cùng chúng tôi đánh thức cảm quan và sống trọn vẹn trong thế giới văn chương Nam Bộ.",
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
