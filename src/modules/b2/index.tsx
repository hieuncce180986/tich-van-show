"use client";

import { useRef } from "react";
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
import rope from "../../../public/images/day.png";
import cloud from "../../../public/images/May.png";
import { CometCard } from "@/components/ui/comet-card";
import { motion, useInView } from "framer-motion";
import "../../styles/styles.css";
// import LiquidGlass from "@/components/ui/liquid-glass-2";
import { Swiper as SwiperCore } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import "@/styles/styles.css";

export default function B2() {
  const titleRef = useRef(null);
  const aboutRef = useRef(null);
  const cardsRef = useRef(null);
  const cloudsRef = useRef(null);
  const swiperRef = useRef<SwiperCore | null>(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const isCardsInView = useInView(cardsRef, { once: true, margin: "-100px" });
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });
  const isCloudsInView = useInView(cloudsRef, { once: true, margin: "-200px" });

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev(500);
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext(500);
    }
  };
  // Move useState outside the aboutCard function
  // const [hoveredCard, setHoveredCard] = useState<number | null>(null);

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
      role: "CPO",
    },
    {
      image1: qv1,
      image2: qv2,
      name: "Quỳnh Vy",
      align: ["55% 30%", "top"],
      scale: 1.2,
      role: "CEO",
    },
    {
      image1: mt1,
      image2: mt2,
      name: "Minh Thi",
      align: ["50% 20%", "top"],
      scale: 1.35,
      role: "COO",
    },
    {
      image1: pv1,
      image2: pv2,
      name: "Phước Vinh",
      align: ["top", "top"],
      scale: 1.2,
      role: "CCO",
    },
  ];
  const aboutCard = (
    image1: StaticImageData,
    image2: StaticImageData,
    name: string,
    alignBefore: string,
    alignAfter: string,
    scale: number,
    role: string
    // cardIndex: number
  ) => {
    // const isHovered = hoveredCard === cardIndex;

    return (
      <div>
        <CometCard className="">
          <motion.button
            type="button"
            className="mt-10 flex w-[85%] lg:w-[240px] h-full lg:h-[470px] cursor-pointer flex-col items-stretch rounded-[16px] mx-auto"
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
                // onMouseEnter={() => setHoveredCard(cardIndex)}
                // onMouseLeave={() => setHoveredCard(null)}
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
                {/* <Image
                  src={image1}
                  alt={name}
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-top transition-opacity duration-500"
                  style={{
                    // transform: `scale(${scale})`,
                    transformOrigin: alignBefore,
                    // opacity: isHovered ? 0 : 1,
                  }}
                /> */}
                <Image
                  src={image2}
                  alt={name}
                  width={1000}
                  height={1000}
                  className="absolute inset-0 h-full w-full rounded-[16px] object-cover object-top transition-opacity duration-500"
                  style={{
                    // transform: `scale(${scale})`,
                    transformOrigin: alignAfter,
                    // opacity: isHovered ? 1 : 0,
                  }}
                />
              </motion.div>
            </div>
          </motion.button>
        </CometCard>
        <motion.div
          className="w-full flex flex-shrink-0 items-center justify-between p-2 px-5 lg:px-0 sm:p-4 font-mono !text-white z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div
            className="text-md sm:text-sm px-2 py-1 rounded-lg !text-white font-font-moncheri pt-2 cursor-pointer"
            whileHover={{ scale: 1.1, color: "white" }}
            transition={{ duration: 0.2 }}
            style={{ color: "white" }}
          >
            {name}
          </motion.div>
          <motion.div
            className="text-md sm:text-sm px-2 py-1 rounded-lg !text-white font-font-moncheri pt-2 cursor-pointer"
            whileHover={{ scale: 1.1, color: "white" }}
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
    <div className="text-white relative py-20 bg-white" id="about">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black z-20"></div>
      {/* <div className="lg:hidden block absolute inset-0 w-full h-full bg-black/80 z-20"></div> */}
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
      {/* Clouds Container */}
      <div ref={cloudsRef} className="absolute inset-0 w-full h-full">
        {/* Right side clouds */}
        <motion.div
          className="absolute top-[22%] right-[2%] h-full z-50 cloud-animation-1"
          initial={{ x: 150, opacity: 0 }}
          animate={
            isCloudsInView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }
          }
          transition={{
            duration: 1.8,
            delay: 1.0,
            ease: "easeOut",
          }}
        >
          <Image
            src={cloud}
            alt="cloud"
            width={1000}
            height={1000}
            className="w-full h-16 lg:h-24 object-contain scale-x-[-1]"
          />
        </motion.div>

        <motion.div
          className="absolute top-[13%] right-[0%] h-full z-50 cloud-animation-2"
          initial={{ x: 150, opacity: 0 }}
          animate={
            isCloudsInView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }
          }
          transition={{
            duration: 1.8,
            delay: 1.3,
            ease: "easeOut",
          }}
        >
          <Image
            src={cloud}
            alt="cloud"
            width={1000}
            height={1000}
            className="w-full h-12 lg:h-20 object-contain scale-x-[-1] blur-[1.5px]"
          />
        </motion.div>

        {/* Left side clouds */}
        <motion.div
          className="absolute top-[53%] left-[2%] h-full z-50 cloud-animation-3"
          initial={{ x: -200, opacity: 0 }}
          animate={
            isCloudsInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }
          }
          transition={{
            duration: 1.5,
            delay: 1.0,
            ease: "easeOut",
          }}
        >
          <Image
            src={cloud}
            alt="cloud"
            width={1000}
            height={1000}
            className="w-full h-20 lg:h-24 object-contain "
          />
        </motion.div>

        <motion.div
          className="absolute top-[18%] left-[0%] h-full z-30 cloud-animation-4"
          initial={{ x: -150, opacity: 0 }}
          animate={
            isCloudsInView ? { x: 0, opacity: 1 } : { x: -150, opacity: 0 }
          }
          transition={{
            duration: 1.8,
            delay: 1.3,
            ease: "easeOut",
          }}
        >
          <Image
            src={cloud}
            alt="cloud"
            width={1000}
            height={1000}
            className="w-full h-16 lg:h-20 object-contain  blur-[1.5px]"
          />
        </motion.div>
      </div>
      <div className="relative z-30 h-full max-w-[85rem] flex flex-col items-center justify-center mx-auto">
        <motion.div
          ref={titleRef}
          className="w-full h-full my-10 px-5 lg:px-0"
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
            className="backdrop-blur-3xl bg-gray-200/5 text-[#FCF9D6] font-font-moncheri text-2xl sm:text-3xl lg:text-4xl flex items-center justify-center rounded-full w-full h-12 sm:h-14 lg:h-[4.5rem] shadow-2xl lg:mx-0"
            transition={{ duration: 0.3 }}
          >
            <span className="translate-y-1.5 ">VỀ CHÚNG TÔI</span>
          </motion.div>
        </motion.div>
        <motion.div
          ref={cardsRef}
          className="hidden lg:grid grid-cols-5 gap-9"
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
                item.role
                // index
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* <motion.div
          ref={cardsRef}
          className="lg:hidden grid grid-cols-1 gap-6"
          initial={{ opacity: 0 }}
          animate={isCardsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          
        </motion.div> */}

        <div className="relative w-full max-w-sm mx-auto lg:hidden !bg-none">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            grabCursor={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            loop={true}
            spaceBetween={20}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-white/30 !w-3 !h-3",
              bulletActiveClass:
                "swiper-pagination-bullet-active !bg-white !w-3 !h-3",
            }}
            modules={[Pagination, Autoplay]}
            className="w-full h-full"
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="">
                {/* <motion.div
                  key={index}
                  className="w-full h-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isCardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                  }
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                > */}
                {aboutCard(
                  item?.image1,
                  item?.image2,
                  item?.name,
                  item?.align[0],
                  item?.align[1],
                  item?.scale,
                  item.role
                  // index
                )}
                {/* </motion.div> */}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <motion.div
          ref={aboutRef}
          className="px-5 lg:px-0"
          initial={{ opacity: 0, y: 50 }}
          animate={isAboutInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="backdrop-blur-3xl bg-gray-200/5 text-[#FCF9D6] font-font-montserrat text-sm sm:text-base lg:text-lg flex items-center justify-center rounded-lg w-full h-full shadow-2xl py-3 sm:py-4 lg:py-5 mt-4 sm:mt-5 lg:mt-7">
            <span className="px-3 sm:px-4 lg:px-5 text-justify leading-relaxed">
              Tịch Văn là show nghệ thuật kể chuyện qua hình ảnh và sân khấu,
              lấy cảm hứng từ những tác phẩm văn học Việt Nam. Mỗi vở diễn mang
              đến trải nghiệm đa giác quan — nơi âm thanh, ánh sáng và cảm xúc
              giao hòa, đúng với tinh thần &ldquo;Tái hiện hồn văn, đánh thức
              cảm quan&rdquo;. Chúng tôi mong muốn góp phần lan tỏa giá trị văn
              hóa và tôn vinh vẻ đẹp của văn học Việt Nam qua ngôn ngữ của sân
              khấu đương đại.
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
