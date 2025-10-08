"use client";

import { useState, useRef } from "react";
import Image, { StaticImageData } from "next/image";
import qv1 from "../../../public/images/QV-1.jpg";
import qv2 from "../../../public/images/QV-2-2.jpg";
import mt1 from "../../../public/images/MT-1.jpg";
import mt2 from "../../../public/images/MT-2-2.jpg";
import cb1 from "../../../public/images/CB-1.jpg";
import cb2 from "../../../public/images/CB-2-2.jpg";
import pv1 from "../../../public/images/PV-1.jpg";
import pv2 from "../../../public/images/PV-2-2.jpg";
import ch1 from "../../../public/images/CH-1.jpg";
import ch2 from "../../../public/images/CH-2-2.jpg";
import { CometCard } from "@/components/ui/comet-card";
import { motion, useInView } from "framer-motion";

export default function B2() {
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });

  // Move useState outside the aboutCard function
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const data = [
    {
      image1: ch1,
      image2: ch2,
      name: "Công Hiếu",
      align: ["left", "top"],
      scale: 1,
      role: "CTO",
    },
    {
      image1: cb1,
      image2: cb2,
      name: "Chí Bảo",
      align: ["60% 15%", "top"],
      scale: 1.35,
      role: "CTO",
    },
    {
      image1: qv1,
      image2: qv2,
      name: "Quỳnh Vy",
      align: ["55% 30%", "top"],
      scale: 1.2,
      role: "CTO",
    },
    {
      image1: mt1,
      image2: mt2,
      name: "Minh Thi",
      align: ["50% 20%", "top"],
      scale: 1.35,
      role: "CTO",
    },
    {
      image1: pv1,
      image2: pv2,
      name: "Phước Vinh",
      align: ["top", "top"],
      scale: 1.2,
      role: "CTO",
    },
  ];
  const aboutCard = (
    image1: StaticImageData,
    image2: StaticImageData,
    name: string,
    alignBefore: string,
    alignAfter: string,
    scale: number,
    role: string,
    cardIndex: number
  ) => {
    const isHovered = hoveredCard === cardIndex;

    return (
      <div>
        <CometCard>
          <motion.button
            type="button"
            className="mt-10 flex w-64 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121]"
            aria-label="View invite F7RA"
            style={{
              transformStyle: "preserve-3d",
              transform: "none",
              opacity: 1,
            }}
            whileHover={{ scale: 1.05, y: -10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-0 flex-1">
              <motion.div
                className="relative mt-0 aspect-[2/3] w-full h-full"
                onMouseEnter={() => setHoveredCard(cardIndex)}
                onMouseLeave={() => setHoveredCard(null)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* <Image
                // loading="lazy"
                className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-top"
                alt="Invite background"
                src={image2}
                style={{
                  // boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                  opacity: 1,
                }}
                width={1000}
                height={1000}
              /> */}
                <Image
                  src={image1}
                  alt={name}
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-top transition-opacity duration-500"
                  style={{
                    // transform: `scale(${scale})`,
                    transformOrigin: alignBefore,
                    opacity: isHovered ? 0 : 1,
                  }}
                />
                <Image
                  src={image2}
                  alt={name}
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-top transition-opacity duration-500"
                  style={{
                    // transform: `scale(${scale})`,
                    transformOrigin: alignAfter,
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              </motion.div>
            </div>
          </motion.button>
        </CometCard>
        <motion.div
          className="w-full flex flex-shrink-0 items-center justify-between p-4 font-mono text-white z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="text-sm px-2 py-1 rounded-lg text-white font-font-moncheri pt-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{ color: "white" }}
          >
            {name}
          </motion.div>
          <motion.div
            className="text-sm px-2 py-1 rounded-lg text-white font-font-moncheri pt-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
            style={{ color: "white" }}
          >
            {role}
          </motion.div>
        </motion.div>
      </div>
    );
  };

  return (
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
      <div className="relative z-30 h-full max-w-[90rem] flex flex-col items-center justify-center mx-auto">
        <motion.div
          ref={titleRef}
          className="w-full h-full my-10"
          initial={{ opacity: 0, y: -50 }}
          animate={
            isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }
          }
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="bg-[#E3D06D] text-[#FCF9D6] font-font-moncheri text-4xl flex items-center justify-center rounded-full w-full h-16"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(227, 208, 109, 0.3)",
            }}
            transition={{ duration: 0.3 }}
          >
            <span className="translate-y-1.5">ABOUT US</span>
          </motion.div>
        </motion.div>
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={isCardsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="w-full h-full"
              initial={{ opacity: 0, y: 50 }}
              animate={
                isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
            >
              {aboutCard(
                item?.image1,
                item?.image2,
                item?.name,
                item?.align[0],
                item?.align[1],
                item?.scale,
                item.role,
                index
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
