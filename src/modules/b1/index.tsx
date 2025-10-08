"use client";

import Image from "next/image";
import logo from "../../../public/images/TịchVanTrang.png";
import main from "../../../public/images/TịchVan.png";
import { Ticket } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function B1() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef(null);
  const mainContentRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-100px" });
  const isMainContentInView = useInView(mainContentRef, {
    once: true,
    margin: "-100px",
  });
  return (
    <div className="text-white relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black z-20"></div>
      <div className="absolute inset-0 w-full h-full z-10">
        <video
          ref={videoRef}
          autoPlay
          controls={false}
          muted={true}
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/Trailer.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <motion.div
        ref={headerRef}
        className="relative z-10 py-5 px-20 flex justify-between items-center backdrop-blur-md"
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
          className="text-[#FCF9F6] font-font-moncheri text-base flex flex-row gap-10"
          initial={{ opacity: 0, x: 50 }}
          animate={
            { opacity: 1, x: 0 }
            // : { opacity: 0, x: 50 }
          }
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.1, color: "#E3D06D" }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            Trang chủ
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, color: "#E3D06D" }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            Đặt vé
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, color: "#E3D06D" }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            Về chúng tôi
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, color: "#E3D06D" }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            Reviews
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.1, color: "#E3D06D" }}
            transition={{ duration: 0.2 }}
            className="cursor-pointer"
          >
            Liên hệ
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="relative z-30 grid grid-cols-12 h-screen">
        <motion.div
          ref={mainContentRef}
          className="col-span-6 flex flex-col justify-center items-center ml-32 pb-36"
          initial={{ opacity: 0, x: -100 }}
          animate={
            isMainContentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }
          }
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="">
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
                className="w-[75%] h-full"
              />
            </motion.div>
            <motion.div
              className="text-[#FCF9F6] font-font-moncheri text-xl w-full my-5 text-center pr-40"
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
              className="flex flex-row items-center justify-center gap-10 pr-40"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isMainContentInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.div
                className="flex flex-row items-center justify-center gap-3 bg-[#FCF9D6] text-black rounded-lg h-12 w-52 cursor-pointer"
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
                <div className="text-lg pt-1 font-bold font-font-moncheri">
                  Mua vé
                </div>
              </motion.div>
              <motion.div
                className="font-font-moncheri pt-1 flex flex-row items-center justify-center gap-2 text-[#FCF9D6] text-xl rounded-lg h-12 w-52 border-2 border-[#FCF9D6] cursor-pointer hover:bg-[#FCF9D6] hover:text-black transition-all duration-300"
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
      </div>
    </div>
  );
}
