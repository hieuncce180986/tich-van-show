"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import flowing from "../../public/videos/Flowing.gif";
import logo from "../../public/images/TịchVanTrang.png";
// import hamburger from "../../public/hamburger.svg";
// import { useCopyToClipboard } from "usehooks-ts";
// import toast from "react-hot-toast";

export default function Header() {
  const [open, setOpen] = useState(false);
  // const [, copy] = useCopyToClipboard();

  return (
    <div className="relative z-0">
      {/* <Image
        src={flowing}
        alt="logo"
        fill
        priority
        className="object-cover z-0"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-60"></div> */}
      <div className="relative z-10 py-5 px-20 flex justify-between items-center">
        <div>
          <Image
            src={logo}
            alt="logo"
            width={1000}
            height={1000}
            className="w-16 h-full"
          />
        </div>
        <div className="text-[#FCF9F6] font-font-helvetica text-lg flex flex-row gap-10">
          <div>Trang chủ</div>
          <div>Đặt vé</div>
          <div>Về chúng tôi</div>
          <div>Reviews</div>
          <div>Liên hệ</div>
        </div>
      </div>
      {/* <div
        onClick={() => setOpen(!open)}
        className="md:hidden flex justify-end"
      >
        <Image src={hamburger} height={25} width={25} alt="Hamburger Menu" />
      </div> */}
      {open && (
        <div className="fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-white shadow-md z-20">
          <div
            onClick={() => setOpen(!open)}
            className="text-black text-2xl flex justify-end pr-10 pt-5"
          >
            <p>X</p>
          </div>
          <ul className="flex flex-col space-y-10 py-10 px-5">
            <li className="font-normal text-xl text-black">
              <Link
                href={process.env.NEXT_PUBLIC_DEXS_URL || "#"}
                target="_blank"
              >
                Discovery
              </Link>
            </li>
            <li className="font-normal text-xl text-black">
              <Link
                href={process.env.NEXT_PUBLIC_DEX_URL || "#"}
                target="_blank"
              >
                About $BMoney
              </Link>
            </li>
            <li className="font-normal text-xl text-black">
              <Link
                href={process.env.NEXT_PUBLIC_TELE_URL || "#"}
                target="_blank"
              >
                TELEGRAM
              </Link>
            </li>

            <li className="font-normal text-xl text-black">
              <Link href={process.env.NEXT_PUBLIC_X_URL || "#"} target="_blank">
                TWITTER
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
