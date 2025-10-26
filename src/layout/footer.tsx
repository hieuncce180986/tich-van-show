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
      <div className="absolute lg:bottom-[17%] bottom-[0%] left-0 w-full h-40 lg:h-72 bg-gradient-to-t from-black to-transparent z-[70]"></div>
      <div className="relative lg:h-[400px] h-[120px] w-full overflow-hidden flex items-center justify-center">
        <motion.div
          ref={footerRef}
          className="font-font-1ftv-vip-boogo text-[55px] lg:text-[235px] pt-10 text-white bg-clip-text-fallback h-full flex items-center justify-center"
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // Fallback for browsers that don't support background-clip: text
            color: "white",
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
