"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Form, Input, Select, SelectItem, Button } from "@heroui/react";
import Image from "next/image";
import {
  Upload,
  User,
  Mail,
  Phone,
  Calendar,
  Image as ImageIcon,
  Plus,
  Minus,
} from "lucide-react";
import { QRDialog } from "./components/qr";
import { TicketsService } from "@/services/tickets";
import { UploadService } from "@/services/upload";

interface FormData {
  name: string;
  email: string;
  phone: string;
  quantity: number;
  schedule: string;
  image: File | null;
  total: number;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  quantity?: string;
  schedule?: string;
  image?: string;
  total?: number;
}

export default function B4() {
  const MORNING_AMOUNT_OF_TICKET = 30;
  const AFTERNOON_AMOUNT_OF_TICKET = 30;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    quantity: 1,
    schedule: "",
    image: null,
    total: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [scheduleMorning, setScheduleMorning] = useState<any>(null);
  const [scheduleAfternoon, setScheduleAfternoon] = useState<any>(null);

  // Cleanup effect to revoke object URLs
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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

        console.log("Response morning:", responseMorning);
        console.log("Response afternoon:", responseAfternoon);

        setScheduleMorning(responseMorning);
        setScheduleAfternoon(responseAfternoon);
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    // Initial fetch
    fetchSchedule();

    // Set up interval to fetch every 5 seconds
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
    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên là bắt buộc";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Họ và tên phải có ít nhất 2 ký tự";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Số điện thoại là bắt buộc";
    } else if (!/^[0-9]+$/.test(formData.phone)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
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

    // Schedule validation
    if (!formData.schedule) {
      newErrors.schedule = "Vui lòng chọn suất chiếu";
    }

    // Image validation
    if (!formData.image) {
      newErrors.image = "Ảnh màn hình chuyển khoản là bắt buộc";
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
  };

  const handleQuantityChange = (delta: number) => {
    const maxAvailable = getMaxAvailableQuantity();
    const newQuantity = Math.max(
      1,
      Math.min(maxAvailable, formData.quantity + delta)
    );
    setFormData((prev) => ({ ...prev, quantity: newQuantity }));
    // Clear error when user changes quantity
    if (errors.quantity) {
      setErrors((prev) => ({ ...prev, quantity: undefined }));
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({ ...prev, image: "Vui lòng chọn file ảnh" }));
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File ảnh không được vượt quá 5MB",
        }));
        return;
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setFormData((prev) => ({ ...prev, image: file }));
      setErrors((prev) => ({ ...prev, image: undefined }));
    }
  };

  const handleRemoveImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
    setErrors((prev) => ({ ...prev, image: undefined }));
    // Reset file input
    const fileInput = document.getElementById(
      "image-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    setIsSubmitting(true);

    try {
      // Check if image exists before uploading
      if (!formData.image) {
        setErrors((prev) => ({
          ...prev,
          image: "Ảnh màn hình chuyển khoản là bắt buộc",
        }));
        setIsSubmitting(false);
        return;
      }

      // Upload image to Cloudinary
      const bankImage = await UploadService.uploadToCloudinary([
        formData.image,
      ]);
      if (!bankImage || !Array.isArray(bankImage) || bankImage.length === 0) {
        setErrors((prev) => ({
          ...prev,
          image: "Không thể tải lên ảnh. Vui lòng thử lại.",
        }));
        setIsSubmitting(false);
        return;
      }

      console.log("Uploaded image:", bankImage[0]);

      // Prepare form data for submission
      const body = {
        show_name: "Tên Show Diễn",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        price: 69000,
        quantity: formData.quantity,
        schedule: formData.schedule,
        bank_image: bankImage[0].secure_url,
        total: formData.quantity * 69000,
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
          image: null,
          total: 0,
        });
        setImagePreview(null);
        setErrors({});
      } else {
        alert("Có lỗi xảy ra, vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setErrors((prev) => ({
        ...prev,
        image: "Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="ticket" className="relative pt-20">
      <div className="relative py-20 min-h-screen">
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

        <div className="relative z-30 container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Đăng Ký Tham Gia
                </h2>
                <p className="text-white/80">
                  Vui lòng điền thông tin để đăng ký tham gia chương trình
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <Input
                    // label="Họ và Tên"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.name}
                    onValueChange={(value) => handleInputChange("name", value)}
                    isRequired
                    isInvalid={!!errors.name}
                    errorMessage={errors.name}
                    // startContent={<User className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      input: "text-white placeholder:text-white/60",
                      inputWrapper:
                        "bg-white/10 border-white/20 hover:bg-white/15",
                      label: "text-white font-medium",
                    }}
                  />
                </div>

                {/* Email Field */}
                <div>
                  <Input
                    type="email"
                    // label="Email"
                    placeholder="Nhập địa chỉ email"
                    value={formData.email}
                    onValueChange={(value) => handleInputChange("email", value)}
                    isRequired
                    isInvalid={!!errors.email}
                    errorMessage={errors.email}
                    // startContent={<Mail className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      input: "text-white placeholder:text-white/60",
                      inputWrapper:
                        "bg-white/10 border-white/20 hover:bg-white/15",
                      label: "text-white font-medium",
                    }}
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <Input
                    type="tel"
                    // label="Số điện thoại"
                    placeholder="Nhập số điện thoại"
                    value={formData.phone}
                    onValueChange={(value) => handleInputChange("phone", value)}
                    isRequired
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone}
                    // startContent={<Phone className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      input: "text-white placeholder:text-white/60",
                      inputWrapper:
                        "bg-white/10 border-white/20 hover:bg-white/15",
                      label: "text-white font-medium",
                    }}
                  />
                </div>

                {/* Schedule Field */}
                <div>
                  <Select
                    // label="Chọn suất chiếu"
                    placeholder="Chọn suất chiếu phù hợp"
                    selectedKeys={formData.schedule ? [formData.schedule] : []}
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0] as string;
                      handleInputChange("schedule", selectedKey);
                    }}
                    isRequired
                    isInvalid={!!errors.schedule}
                    errorMessage={errors.schedule}
                    // startContent={<Calendar className="w-4 h-4 text-gray-400" />}
                    classNames={{
                      trigger: "bg-white/10 border-white/20 hover:bg-white/15",
                      value: "text-white",
                      label: "text-white font-medium",
                    }}
                    renderValue={(items) => {
                      return items.map((item) => (
                        <div key={item.key} className="flex items-center gap-2">
                          <span className="text-white">
                            {item.key === "show-morning"
                              ? "Sáng 9h00 - 10h30"
                              : "Chiều 18h00 - 19h30"}
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
                      Sáng 9h00 - 10h30{" "}
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
                      Chiều 18h00 - 19h30{" "}
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

                {/* Quantity Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Số lượng vé <span className="text-red-400">*</span>
                    {formData.schedule && (
                      <span className="text-white/60 text-sm font-normal ml-2">
                        (Tối đa {getMaxAvailableQuantity()} vé)
                      </span>
                    )}
                  </label>
                  <div className="flex flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formData.quantity <= 1}
                    >
                      <Minus className="w-4 h-4 text-white" />
                    </button>
                    <Input
                      type="number"
                      placeholder="Số lượng"
                      value={formData.quantity.toString()}
                      min={1}
                      max={
                        formData.schedule
                          ? getMaxAvailableQuantity()
                          : undefined
                      }
                      onValueChange={(value) => {
                        const numValue = parseInt(value) || 1;
                        const maxAvailable = getMaxAvailableQuantity();
                        const clampedValue = Math.max(
                          1,
                          Math.min(maxAvailable, numValue)
                        );
                        handleInputChange("quantity", clampedValue);
                      }}
                      isRequired
                      isInvalid={!!errors.quantity}
                      errorMessage={errors.quantity}
                      classNames={{
                        input:
                          "text-white placeholder:text-white/60 text-center",
                        inputWrapper:
                          "bg-white/10 border-white/20 hover:bg-white/15",
                        label: "text-white font-medium",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      className="flex items-center justify-center w-10 h-10 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={formData.quantity >= getMaxAvailableQuantity()}
                    >
                      <Plus className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>

                {/* Image Upload Field */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    Ảnh màn hình chuyển khoản{" "}
                    <span className="text-red-400">*</span>
                  </label>

                  {imagePreview ? (
                    // Image Preview Section
                    <div className="space-y-3">
                      <div className="relative">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          width={1000}
                          height={1000}
                          className="w-full h-96 object-contain rounded-lg border border-white/20"
                          unoptimized
                        />
                        <div className="absolute top-2 right-2 flex gap-2">
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-red-500/80 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm transition-colors"
                          >
                            Xóa
                          </button>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-white/80 text-sm">
                          {formData.image?.name}
                        </p>
                        <p className="text-white/60 text-xs">
                          {formData.image?.size
                            ? (formData.image.size / 1024 / 1024).toFixed(2)
                            : "0"}{" "}
                          MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Upload Section
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/30 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <div className="text-center">
                          <ImageIcon className="w-8 h-8 text-white/60 mx-auto mb-2" />
                          <p className="text-white/80 text-sm">Chọn file ảnh</p>
                          <p className="text-white/60 text-xs mt-1">
                            PNG, JPG, JPEG (tối đa 5MB)
                          </p>
                        </div>
                      </label>
                    </div>
                  )}

                  {errors.image && (
                    <p className="text-red-400 text-sm mt-1">{errors.image}</p>
                  )}
                </div>
                <div className="pt-4 relative">
                  <QRDialog />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    color="primary"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
                    isLoading={isSubmitting}
                  >
                    {!isSubmitting && <Upload className="w-4 h-4 mr-2" />}
                    {isSubmitting ? "Đang xử lý..." : "Đăng Ký Tham Gia"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
