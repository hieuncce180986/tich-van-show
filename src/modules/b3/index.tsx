"use client";

import ThreeDCarousel from "@/components/ui/3d-carousel";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function B3() {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const aboutRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  return (
    <div className="text-white" id="actor">
      <div className="text-white relative py-20">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black z-20"></div>
        <div className="absolute inset-0 w-full h-full z-10">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/Flowing.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="relative z-30 h-full max-w-[85rem] flex flex-col items-center justify-center mx-auto">
          <motion.div
            ref={titleRef}
            className="w-full h-full my-10 backdrop-blur-sm bg-gray-200/5 rounded-full"
            initial={{ opacity: 0, y: -50 }}
            animate={
              isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
            }
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* <motion.div
            className="bg-[#E3D06D] text-[#FCF9D6] font-font-moncheri text-4xl flex items-center justify-center rounded-full w-full h-16"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(227, 208, 109, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="translate-y-1.5">ABOUT US</span>
          </motion.div> */}
            <motion.div
              className=" text-[#FCF9D6] font-font-moncheri text-2xl sm:text-3xl lg:text-4xl flex items-center justify-center rounded-full w-full h-12 sm:h-14 lg:h-[4.5rem] shadow-2xl lg:mx-0"
              transition={{ duration: 0.3 }}
            >
              <span className="translate-y-1.5">DIỄN VIÊN</span>
            </motion.div>
          </motion.div>
        </div>
        <div className="relative hidden lg:block z-30 w-full h-full">
          <ThreeDCarousel cardH={450} cardW={250} spacingMultiplier={1.2} />
        </div>
        <div className="relative block lg:hidden z-30 w-full h-full">
          <ThreeDCarousel cardH={400} cardW={240} spacingMultiplier={1} />
        </div>
      </div>
    </div>
  );
}
