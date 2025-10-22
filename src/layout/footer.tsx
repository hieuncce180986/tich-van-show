"use client";

import { VideoText } from "@/components/ui/video-text";
import bgImg from "../../public/images/tich-van-footer.gif";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Footer = () => {
  const footerRef = useRef(null);
  const isFooterInView = useInView(footerRef, { once: true, margin: "-100px" });

  return (
    <div id="contact" className="text-black relative">
      <div className="absolute lg:bottom-[17%] bottom-[00%] left-0 w-full h-40 lg:h-72 bg-gradient-to-t from-black to-transparent z-[70]"></div>
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        <motion.div
          ref={footerRef}
          className="font-font-1ftv-vip-boogo text-[55px] lg:text-[235px] pt-10 text-transparent bg-clip-text"
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // textFillColor: "transparent",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={
            isFooterInView
              ? { opacity: 1, scale: 1 }
              : { opacity: 0, scale: 0.5 }
          }
          transition={{ duration: 1, delay: 0.2 }}
        >
          TICH VĂN
        </motion.div>
      </div>
    </div>
  );
};

export default Footer;
