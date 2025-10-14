"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import flowing from "../../public/videos/Flowing.gif";
import logo from "../../public/images/TịchVanTrang.png";
import { useInView, AnimatePresence, motion } from "framer-motion";
// import hamburger from "../../public/hamburger.svg";
// import { useCopyToClipboard } from "usehooks-ts";
// import toast from "react-hot-toast";

export default function Header() {
  const [open, setOpen] = useState(false);
  // const [, copy] = useCopyToClipboard();

  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef(null);
  const mainContentRef = useRef(null);
  // const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isMainContentInView = useInView(mainContentRef, {
    once: true,
    margin: "-100px",
  });

  const [selectedTab, setSelectedTab] = useState("trang-chu");
  const tabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [tabPositions, setTabPositions] = useState<
    { x: number; width: number }[]
  >([]);

  // Helper function to get tab index
  const getTabIndex = (tab: string) => {
    const tabs = ["trang-chu", "dat-ve", "ve-chung-toi", "reviews", "lien-he"];
    return tabs.indexOf(tab);
  };

  // Update tab positions when component mounts or selectedTab changes
  useEffect(() => {
    const updatePositions = () => {
      const positions = tabRefs.current.map((ref) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          const containerRect = ref.parentElement?.getBoundingClientRect();
          return {
            x: rect.left - (containerRect?.left || 0),
            width: rect.width,
          };
        }
        return { x: 0, width: 0 };
      });
      setTabPositions(positions);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    return () => window.removeEventListener("resize", updatePositions);
  }, [selectedTab]);

  return (
    <motion.div
      ref={headerRef}
      className="py-5 px-20 flex justify-between items-center backdrop-blur-md sticky top-0 left-0 w-full z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={
          { opacity: 1, scale: 1 }
          // : { opacity: 0, scale: 0.5 }
        }
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Image
          src={logo}
          alt="logo"
          width={1000}
          height={1000}
          className="w-16 h-full"
        />
      </motion.div>
      <motion.div
        className="text-[#FCF9F6] font-font-montserrat text-base flex flex-row gap-10 z-50 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={
          { opacity: 1, x: 0 }
          // : { opacity: 0, x: 50 }
        }
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Animated background */}
        <AnimatePresence>
          {tabPositions.length > 0 && (
            <motion.div
              className="absolute bg-[#B8931B] rounded-lg z-10"
              initial={false}
              animate={{
                x: tabPositions[getTabIndex(selectedTab)]?.x || 0,
                width: tabPositions[getTabIndex(selectedTab)]?.width || 0,
                height: 33,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              style={{
                top: 0,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          ref={(el) => {
            tabRefs.current[0] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className={`cursor-pointer px-3 pt-1 rounded-lg z-20 relative ${
            selectedTab === "trang-chu" ? "bg-[#B8931B]" : ""
          }`}
          onClick={() => setSelectedTab("trang-chu")}
        >
          Trang chủ
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[1] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => setSelectedTab("dat-ve")}
        >
          Đặt vé
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[2] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => setSelectedTab("ve-chung-toi")}
        >
          Về chúng tôi
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[3] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => setSelectedTab("reviews")}
        >
          Reviews
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[4] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => setSelectedTab("lien-he")}
        >
          Liên hệ
        </motion.div>
      </motion.div>

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
    </motion.div>
  );
}
