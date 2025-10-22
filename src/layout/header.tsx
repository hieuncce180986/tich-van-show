"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import flowing from "../../public/videos/Flowing.gif";
import logo from "../../public/images/TịchVanTrang.png";
import { useInView, AnimatePresence, motion } from "framer-motion";
import hamburger from "../../public/hamburger.svg";
// import { useCopyToClipboard } from "usehooks-ts";
// import toast from "react-hot-toast";

export default function Header() {
  const [open, setOpen] = useState(false);
  // const [, copy] = useCopyToClipboard();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  const headerRef = useRef(null);
  const mainContentRef = useRef(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
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

  // Intersection Observer for scroll-based tab selection
  useEffect(() => {
    const sections = [
      { id: "home", tab: "trang-chu" },
      { id: "about", tab: "ve-chung-toi" },
      { id: "actor", tab: "dien-vien" },
      { id: "ticket", tab: "dat-ve" },
      { id: "don-vi", tab: "don-vi" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // Trigger when section is 20% from top
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sections.find((s) => s.id === entry.target.id);
          if (section) {
            setSelectedTab(section.tab);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Helper function to get tab index
  const getTabIndex = (tab: string) => {
    const tabs = ["trang-chu", "ve-chung-toi", "dien-vien", "dat-ve", "don-vi"];
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

  // Handle click outside mobile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <motion.div
      ref={headerRef}
      className="py-5 px-5 lg:px-20 flex justify-between items-center backdrop-blur-md sticky top-0 left-0 w-full z-50"
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
        className="text-[#FCF9F6] font-font-montserrat text-base hidden md:flex flex-row gap-10 z-50 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={
          { opacity: 1, x: 0 }
          // : { opacity: 0, x: 50 }
        }
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Animated background */}
        <AnimatePresence>
          {tabPositions.length > 0 && (
            <motion.div
              className="absolute bg-[#B8931B] rounded-lg z-10"
              initial={false}
              animate={{
                x: tabPositions[getTabIndex(selectedTab)]?.x || 0,
                width: tabPositions[getTabIndex(selectedTab)]?.width || 0,
                height: 33,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.4,
              }}
              style={{
                top: 0,
              }}
            />
          )}
        </AnimatePresence>

        <motion.div
          ref={(el) => {
            tabRefs.current[0] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className={`cursor-pointer px-3 pt-1 rounded-lg z-20 relative ${
            selectedTab === "trang-chu" ? "bg-[#B8931B]" : ""
          }`}
          onClick={() => {
            setSelectedTab("trang-chu");
            scrollToSection("home");
          }}
        >
          Trang chủ
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[1] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => {
            setSelectedTab("ve-chung-toi");
            scrollToSection("about");
          }}
        >
          Về chúng tôi
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[2] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => {
            setSelectedTab("dien-vien");
            scrollToSection("actor");
          }}
        >
          Diễn viên
        </motion.div>

        <motion.div
          ref={(el) => {
            tabRefs.current[3] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => {
            setSelectedTab("dat-ve");
            scrollToSection("ticket");
          }}
        >
          Đặt vé
        </motion.div>
        <motion.div
          ref={(el) => {
            tabRefs.current[4] = el;
          }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
          className="cursor-pointer px-3 py-1 rounded-lg z-20 relative"
          onClick={() => {
            setSelectedTab("don-vi");
            scrollToSection("don-vi");
          }}
        >
          Đơn vị
        </motion.div>
      </motion.div>
      {!open && (
        <div
          onClick={() => setOpen(!open)}
          className="md:hidden flex justify-end"
        >
          <Image src={hamburger} height={25} width={25} alt="Hamburger Menu" />
        </div>
      )}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobileMenuRef}
            className="fixed top-0 bottom-0 right-0 h-screen w-[75%] backdrop-blur-md bg-black/85 shadow-md z-20 border-l border-[#B8931B]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.3,
            }}
          >
            <div
              onClick={() => setOpen(!open)}
              className="text-white text-2xl flex justify-end pr-7 pt-5"
            >
              <p>X</p>
            </div>
            <motion.div
              className="flex flex-col space-y-10 py-10 px-5 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <motion.div
                className="font-normal text-xl flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <div
                  onClick={() => {
                    setSelectedTab("trang-chu");
                    scrollToSection("home");
                    setOpen(!open);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-lg z-20 relative font-font-montserrat ${
                    selectedTab === "trang-chu" ? "bg-[#B8931B]" : ""
                  }`}
                >
                  Trang chủ
                </div>
              </motion.div>
              <motion.div
                className="font-normal text-xl flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div
                  onClick={() => {
                    setSelectedTab("ve-chung-toi");
                    scrollToSection("about");
                    setOpen(!open);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-lg z-20 relative font-font-montserrat ${
                    selectedTab === "ve-chung-toi" ? "bg-[#B8931B]" : ""
                  }`}
                >
                  Về chúng tôi
                </div>
              </motion.div>
              <motion.div
                className="font-normal text-xl flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <div
                  onClick={() => {
                    setSelectedTab("dien-vien");
                    scrollToSection("actor");
                    setOpen(!open);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-lg z-20 relative font-font-montserrat ${
                    selectedTab === "dien-vien" ? "bg-[#B8931B]" : ""
                  }`}
                >
                  Diễn viên
                </div>
              </motion.div>

              <motion.div
                className="font-normal text-xl flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                <div
                  onClick={() => {
                    setSelectedTab("dat-ve");
                    scrollToSection("ticket");
                    setOpen(!open);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-lg z-20 relative font-font-montserrat ${
                    selectedTab === "dat-ve" ? "bg-[#B8931B]" : ""
                  }`}
                >
                  Đặt vé
                </div>
              </motion.div>

              <motion.div
                className="font-normal text-xl flex justify-start"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <div
                  onClick={() => {
                    setSelectedTab("don-vi");
                    scrollToSection("don-vi");
                    setOpen(!open);
                  }}
                  className={`cursor-pointer px-3 py-1 rounded-lg z-20 relative font-font-montserrat ${
                    selectedTab === "don-vi" ? "bg-[#B8931B]" : ""
                  }`}
                >
                  Đơn vị
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
