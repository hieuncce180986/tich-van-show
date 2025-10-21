"use client";

import Footer from "@/layout/footer";
import B1 from "../b1";
import B2 from "../b2";
import B3 from "../b3";
import B4 from "../b4";
import Header from "@/layout/header";

export default function HomeClient() {
  return (
    <div className="mx-auto min-h-screen max-w-[1990px] relative">
      <Header />
      <div className="relative -translate-y-20">
        <B1 />
        <B2 />
        <B3 />
        <B4 />
      </div>
      <Footer />
    </div>
  );
}
