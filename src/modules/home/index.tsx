"use client";

import Footer from "@/layout/footer";
import B1 from "../b1";
import B2 from "../b2";

export default function HomeClient() {
  return (
    <div className="mx-auto min-h-screen max-w-[1990px]">
      {/* <Header /> */}
      <B1 />
      <B2 />
      <Footer />
    </div>
  );
}
