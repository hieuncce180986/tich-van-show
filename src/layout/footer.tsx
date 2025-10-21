"use client";

import { VideoText } from "@/components/ui/video-text";
import bgImg from "../../public/images/tich-van-footer.gif";

const Footer = () => {
  return (
    <div id="contact" className="text-black relative">
      <div className="absolute bottom-[17%] left-0 w-full h-72 bg-gradient-to-t from-black to-transparent z-[70]"></div>
      <div className="relative h-full w-full overflow-hidden flex items-center justify-center">
        <div
          className="font-font-1ftv-vip-boogo text-[235px] pt-10 text-transparent bg-clip-text"
          style={{
            backgroundImage: `url(${bgImg.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            // textFillColor: "transparent",
          }}
        >
          TICH VĂN
        </div>
      </div>
    </div>
  );
};

export default Footer;
