"use client";

import { VideoText } from "@/components/ui/video-text";

const Footer = () => {
  return (
    <div className="text-black relative">
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent z-20"></div>
      <div className="relative h-[400px] w-full overflow-hidden translate-y-24">
        <VideoText
          fontFamily="Helvetica, Arial, sans-serif"
          src="https://res.cloudinary.com/dx1ejni0o/video/upload/v1760351999/medicare-video/kytqibd72nsyrswvycsk.mp4"
        >
          TICH VAN
        </VideoText>
      </div>
    </div>
  );
};

export default Footer;
