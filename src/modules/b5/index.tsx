"use client";

import ThreeDCarousel from "@/components/ui/3d-carousel";
import { IMAGES } from "@/utils/image";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function B5() {
  const sponsorsRef = useRef(null);
  const isSponsorsInView = useInView(sponsorsRef, {
    once: true,
    margin: "-100px",
  });

  return (
    <div className="text-white " id="don-vi">
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
            <source
              src="https://res.cloudinary.com/dx1ejni0o/video/upload/v1761461775/tich-van/k6qld0zknqw2zzsonqbg.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
        <motion.div
          ref={sponsorsRef}
          className="relative z-30 h-full flex lg:flex-row flex-col items-center justify-center mx-auto gap-20 lg:gap-40"
          initial={{ opacity: 0, y: 100 }}
          animate={
            isSponsorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={
              isSponsorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="pb-10 text-xl lg:text-3xl font-font-moncheri text-[#FCF9D6]"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isSponsorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              ĐƠN VỊ TỔ CHỨC
            </motion.div>
            <motion.div
              className="flex lg:flex-row flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isSponsorsInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Image
                src={IMAGES.SPONSOR_1}
                alt="SPONSOR_1"
                width={1000}
                height={1000}
                className="w-full h-20 lg:h-28 object-contain"
              />
              <Image
                src={IMAGES.SPONSOR_2}
                alt="SPONSOR_1"
                width={1000}
                height={1000}
                className="w-full h-20 lg:h-28 object-contain"
              />
            </motion.div>
          </motion.div>
          <motion.div
            className="flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={
              isSponsorsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }
            }
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.div
              className="pb-10 text-xl lg:text-3xl font-font-moncheri text-[#FCF9D6]"
              initial={{ opacity: 0, y: 30 }}
              animate={
                isSponsorsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              ĐƠN VỊ ĐỒNG HÀNH
            </motion.div>
            <motion.div
              className="flex lg:flex-row flex-col items-center justify-center gap-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isSponsorsInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Image
                src={IMAGES.SPONSOR_3}
                alt="SPONSOR_1"
                width={1000}
                height={1000}
                className="w-full h-28 lg:h-28 object-contain"
              />
              <Image
                src={IMAGES.SPONSOR_4}
                alt="SPONSOR_1"
                width={1000}
                height={1000}
                className="w-full h-28 lg:h-28 object-contain"
              />
              <Image
                src={IMAGES.SPONSOR_5}
                alt="SPONSOR_1"
                width={1000}
                height={1000}
                className="w-full h-28 lg:h-28 object-contain"
              />
              <Image
                src={IMAGES.SPONSOR_6}
                alt="SPONSOR_1"
                width={1000}
                height={1000}
                className="w-full h-28 lg:h-28 object-contain"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
