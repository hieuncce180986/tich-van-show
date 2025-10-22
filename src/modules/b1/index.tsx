"use client";

import Image from "next/image";
import logo from "../../../public/images/TịchVanTrang.png";
import main from "../../../public/images/TịchVan.png";
import { Ticket } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "@/styles/styles.css";

export default function B1() {
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

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
    <div className="text-white relative" id="home">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-20"></div>
      <div className="absolute inset-0 w-full h-full z-10">
        <video
          ref={videoRef}
          autoPlay
          controls={false}
          muted={!isAudioPlaying}
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/Trailer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative z-30 grid grid-cols-12 h-screen">
        <div
          className="cursor-pointer loading absolute bottom-[10%] right-[5%] rotate-180 backdrop-blur-lg border border-white/20 w-14 h-14 flex items-center justify-center rounded-full hover:bg-white/10 transition-all duration-300"
          onClick={() => {
            setIsAudioPlaying(!isAudioPlaying);
            if (videoRef.current) {
              videoRef.current.muted = isAudioPlaying;
            }
          }}
        >
          <div className={`${isAudioPlaying ? "load" : "load-stop"}`}></div>
          <div className={`${isAudioPlaying ? "load" : "load-stop"}`}></div>
          <div className={`${isAudioPlaying ? "load" : "load-stop"}`}></div>
          <div className={`${isAudioPlaying ? "load" : "load-stop"}`}></div>
        </div>
        <motion.div
          ref={mainContentRef}
          className="col-span-12 lg:col-span-6 flex flex-col justify-center items-center lg:ml-32 pb-0"
          initial={{ opacity: 0, x: -100 }}
          animate={
            isMainContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
          }
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="w-full lg:w-[100%] px-10 lg:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isMainContentInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Image
                src={main}
                alt="logo"
                width={1000}
                height={1000}
                className="w-full lg:w-[65%] h-full"
              />
            </motion.div>
            <motion.div
              className="text-[#FCF9F6] font-font-moncheri text-xl w-full my-5 text-center lg:pr-40"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isMainContentInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Tái hiện hồn văn, đánh thức cảm quan
            </motion.div>
            <motion.div
              className="flex flex-row items-center justify-center gap-5 lg:gap-10 lg:pr-40"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isMainContentInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.div
                className="flex flex-row items-center justify-center gap-3 bg-[#FCF9D6] text-black rounded-lg h-12 w-60 lg:w-52 cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(252, 249, 214, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Ticket
                  fill="#000000"
                  stroke="#000000"
                  className="w-8 h-8 -rotate-45"
                />
                <div className="text-base lg:text-lg pt-1 font-bold font-font-moncheri">
                  Mua vé
                </div>
              </motion.div>
              <motion.div
                className="font-font-moncheri pt-1 flex flex-row items-center justify-center gap-2 text-[#FCF9D6] text-base lg:text-xl rounded-lg h-12 w-60 lg:w-52 border-2 border-[#FCF9D6] cursor-pointer hover:bg-[#FCF9D6] hover:text-black transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#FCF9D6",
                  color: "#000000",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Thông tin
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        {/* <div
          className="col-span-6 text-white cursor-pointer flex items-center justify-center"
          onClick={() => {
            setIsAudioPlaying(!isAudioPlaying);
            if (videoRef.current) {
              videoRef.current.muted = isAudioPlaying;
            }
          }}
        >
          {isAudioPlaying ? "🔊 AUDIO ON" : "🔇 MUTE"}
        </div> */}
        {/* 
        <div
          id="dexscreener-embed"
          className="w-full h-[580px] mt-20 mb-10 lg:mb-5"
        >
          <iframe
            src="https://dexscreener.com/bsc/0x2D4659a43FEA82E8E143e483EA6E08480a820BC4?embed=1&loadChartSettings=0&trades=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=usd&interval=15"
            title="DexScreener Chart"
            className="px-5 rounded-[0px]"
          />
        </div> */}
      </div>
    </div>
  );
}
