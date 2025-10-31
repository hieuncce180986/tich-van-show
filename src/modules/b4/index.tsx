"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Select, SelectItem, Button } from "@heroui/react";
import Image from "next/image";
import { Loader } from "lucide-react";
import { TicketsService } from "@/services/tickets";
import { motion, useInView } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import cloud from "../../../public/images/May.png";

interface FormData {
  name: string;
  email: string;
  phone: string;
  quantity: number;
  schedule: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  schedule?: string;
}

export default function B4() {
  const { toast } = useToast();
  const MORNING_AMOUNT_OF_TICKET = 30;
  const AFTERNOON_AMOUNT_OF_TICKET = 30;

  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    schedule: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [scheduleMorning, setScheduleMorning] = useState<any>(null);
  const [scheduleAfternoon, setScheduleAfternoon] = useState<any>(null);
  const [submissionStatus, setSubmissionStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Function to get maximum available quantity for selected schedule
  const getMaxAvailableQuantity = useCallback((): number => {
    if (!formData.schedule) return 1;

    if (formData.schedule === "show-morning") {
      return Math.max(
        1,
        MORNING_AMOUNT_OF_TICKET - (scheduleMorning?.totalQuantity || 0)
      );
    } else if (formData.schedule === "show-afternoon") {
      return Math.max(
        1,
        AFTERNOON_AMOUNT_OF_TICKET - (scheduleAfternoon?.totalQuantity || 0)
      );
    }

    return 1;
  }, [formData.schedule, scheduleMorning, scheduleAfternoon]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const responseMorning = await TicketsService.getTicketFilter(
          "show-morning"
        );
        const responseAfternoon = await TicketsService.getTicketFilter(
          "show-afternoon"
        );

        setScheduleMorning(responseMorning);
        setScheduleAfternoon(responseAfternoon);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    // Initial fetch
    fetchSchedule();

    // // Set up interval to fetch every 5 seconds
    const interval = setInterval(fetchSchedule, 10000);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Effect to adjust quantity when schedule changes
  useEffect(() => {
    if (formData.schedule) {
      const maxAvailable = getMaxAvailableQuantity();
      if (formData.quantity > maxAvailable) {
        setFormData((prev) => ({ ...prev, quantity: maxAvailable }));
      }
    }
  }, [formData.schedule, formData.quantity, getMaxAvailableQuantity]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = "Họ và tên là bắt buộc";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Phone validation
    const trimmedPhone = formData.phone.trim();
    if (!trimmedPhone) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^\d{9,11}$/.test(trimmedPhone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    // Schedule validation
    if (!formData.schedule) {
      newErrors.schedule = "Vui lòng chọn suất chiếu";
    }

    // Quantity validation
    if (formData.quantity < 1) {
      newErrors.quantity = "Số lượng phải lớn hơn 0";
    } else if (formData.schedule) {
      const maxAvailable = getMaxAvailableQuantity();
      if (formData.quantity > maxAvailable) {
        newErrors.quantity = `Số lượng không được vượt quá ${maxAvailable} vé còn lại`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Clear submission status when user starts typing
    if (submissionStatus !== "idle") {
      setSubmissionStatus("idle");
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const body = {
        show_name: "Hoa Độc Điền Trang",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        quantity: 1,
        schedule: formData.schedule,
      };

      // Submit form data
      const response = await TicketsService.register(body);
      console.log("Registration response:", response);

      if (response && response.ok) {
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          quantity: 1,
          schedule: "",
        });
        setErrors({});
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors((prev) => ({
        ...prev,
      }));
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cloudsRef = useRef(null);
  const isCloudsInView = useInView(cloudsRef, { once: true, margin: "-200px" });

  return (
    <div id="ticket" className="relative pt-20">
      <div className="relative py-20 min-h-screen">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black z-20"></div>
        <div className="hidden lg:block absolute inset-0 w-full h-full z-10">
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

        <div className="relative z-30 container mx-auto px-4">
          <div className="max-w-6xl mx-auto relative">
            <motion.div
              ref={formRef}
              className="relative bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl flex lg:flex-row flex-col items-center justify-evenly gap-10"
              initial={{ opacity: 0, y: 100 }}
              animate={
                isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }
              }
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  className="absolute top-[95%] lg:left-[-30%] left-[-20%] z-50 cloud-animation-1 h-14 lg:h-28"
                  // initial={{ x: -150, opacity: 0 }}
                  // animate={
                  //   isCloudsInView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }
                  // }
                  // transition={{
                  //   duration: 1.8,
                  //   delay: 1.0,
                  //   ease: "easeOut",
                  // }}
                >
                  <Image
                    src={cloud}
                    alt="cloud"
                    width={1000}
                    height={1000}
                    className="w-full h-full object-contain scale-x-[1]"
                  />
                </motion.div>

                <motion.div
                  className="absolute top-[-4%] right-[-15%] h-full z-50 cloud-animation-3"
                  // initial={{ x: -150, opacity: 0 }}
                  // animate={
                  //   isCloudsInView ? { x: 0, opacity: 1 } : { x: 150, opacity: 0 }
                  // }
                  // transition={{
                  //   duration: 1.8,
                  //   delay: 1.0,
                  //   ease: "easeOut",
                  // }}
                >
                  <Image
                    src={cloud}
                    alt="cloud"
                    width={1000}
                    height={1000}
                    className="w-full h-10 lg:h-[70px] object-contain scale-x-[-1]"
                  />
                </motion.div>
                <Image
                  src="https://res.cloudinary.com/dx1ejni0o/image/upload/v1761899192/tich-van/l32r5uwdiy6aze1oh6lm.png"
                  alt="logo"
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="max-w-xl flex flex-col items-center justify-center">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Đăng Ký Đặt Vé
                  </h2>
                  <p className="text-white/80">
                    Vui lòng điền thông tin để đăng ký đặt vé Hoa Độc Điền Trang
                  </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  {/* Name Field */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Họ và tên <span className="text-red-400">*</span>
                    </label>
                    <input
                      placeholder="Nhập họ và tên"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="text-white w-full p-2 bg-white/10 border-white/20 hover:bg-white/15 focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0 rounded-md"
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Nhập địa chỉ email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="text-white w-full p-2 bg-white/10 border-white/20 hover:bg-white/15 focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0 rounded-md"
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Số điện thoại <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="text-white w-full p-2 bg-white/10 border-white/20 hover:bg-white/15 focus:outline-none focus:ring-0 focus:border-none focus:ring-offset-0 rounded-md"
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Schedule Field */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Suất chiếu <span className="text-red-400">*</span>
                    </label>
                    <Select
                      placeholder="Chọn suất chiếu"
                      selectedKeys={
                        formData.schedule ? [formData.schedule] : []
                      }
                      onSelectionChange={(keys) => {
                        const selectedKey = Array.from(keys)[0] as string;
                        handleInputChange("schedule", selectedKey);
                      }}
                      isInvalid={!!errors.schedule}
                      errorMessage={errors.schedule}
                      // startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                      classNames={{
                        trigger:
                          "bg-white/10 border-white/20 hover:bg-white/15 rounded-md",
                        value: "text-white",
                        label: "text-white font-medium",
                        errorMessage: "text-red-400 text-sm mt-1",
                      }}
                      renderValue={(items) => {
                        return items.map((item) => (
                          <div
                            key={item.key}
                            className="flex items-center gap-2"
                          >
                            <span className="text-white">
                              {item.key === "show-morning"
                                ? "Sáng 9h30 – 11h00"
                                : "Chiều 18h30 – 20h00"}
                            </span>
                          </div>
                        ));
                      }}
                    >
                      <SelectItem
                        key="show-morning"
                        className={`bg-white text-black ${
                          scheduleMorning?.totalQuantity >=
                          MORNING_AMOUNT_OF_TICKET
                            ? "bg-red-700 text-white cursor-not-allowed"
                            : ""
                        }`}
                        isDisabled={
                          scheduleMorning?.totalQuantity >=
                          MORNING_AMOUNT_OF_TICKET
                        }
                      >
                        Sáng 9h30 – 11h00{" "}
                        {MORNING_AMOUNT_OF_TICKET -
                          scheduleMorning?.totalQuantity >
                        0
                          ? `(còn ${
                              MORNING_AMOUNT_OF_TICKET -
                              scheduleMorning?.totalQuantity
                            } vé)`
                          : "(hết vé)"}
                      </SelectItem>
                      <SelectItem
                        key="show-afternoon"
                        className={`bg-white text-black ${
                          scheduleAfternoon?.totalQuantity >=
                          AFTERNOON_AMOUNT_OF_TICKET
                            ? "bg-red-700 text-white cursor-not-allowed"
                            : ""
                        }`}
                        isDisabled={
                          scheduleAfternoon?.totalQuantity >=
                          AFTERNOON_AMOUNT_OF_TICKET
                        }
                      >
                        Chiều 18h30 - 20h00{" "}
                        {AFTERNOON_AMOUNT_OF_TICKET -
                          scheduleAfternoon?.totalQuantity >
                        0
                          ? `(còn ${
                              AFTERNOON_AMOUNT_OF_TICKET -
                              scheduleAfternoon?.totalQuantity
                            } vé)`
                          : "(hết vé)"}
                      </SelectItem>
                    </Select>
                  </div>

                  <div className="pt-4 text-white text-sm">
                    * Lưu ý:
                    <br />- Sau khi đăng kí thành công hãy kiểm tra email để
                    theo dõi trạng thái vé. Nếu không thấy email trong hộp thư
                    chính vui lòng kiểm tra thư rác.
                    <br />- Nếu có thắc mắc vui lòng liên hệ:
                    <br /> &nbsp; Admin:{" "}
                    <a
                      href="https://zalo.me/0975342991"
                      target="_blank"
                      className="text-[#B8931B] font-bold"
                    >
                      Nguyễn Công Hiếu
                    </a>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      color="primary"
                      size="lg"
                      className="w-full bg-gradient-to-r from-[#B8931B] via-[#c1a341] to-[#caa323] hover:from-[#ddbc4e] hover:to-[#B8931B] text-white font-semibold py-3 rounded-md"
                      isLoading={isSubmitting}
                    >
                      {!isSubmitting ? null : (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {isSubmitting ? "Đang đặt vé..." : "Đặt vé"}
                    </Button>
                  </div>
                  {/* Success Message */}
                  {submissionStatus === "success" && (
                    <div className="pt-4 text-base w-full text-center text-green-500">
                      Đăng ký thành công. Hãy kiểm tra email để theo dõi trạng
                      thái vé.
                    </div>
                  )}

                  {/* Error Message */}
                  {submissionStatus === "error" && (
                    <div className="pt-4 text-base w-full text-center text-red-500">
                      Đăng ký thất bại. Vui lòng thử lại.
                    </div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
