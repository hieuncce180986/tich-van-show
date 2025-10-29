import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button-2";
import qr1 from "../../../../public/images/momo_QV.jpg";
import qr2 from "../../../../public/images/mb-QV.jpg";
import Image from "next/image";
import { useState } from "react";
import "@/styles/styles.css";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "usehooks-ts";
import toast from "react-hot-toast";

export function QRDialog({ total }: { total: string }) {
  const [selectedOption, setSelectedOption] = useState<string>("option1");
  const [, copy] = useCopyToClipboard();

  return (
    <Dialog>
      <DialogTrigger>
        <Button
          type="submit"
          color="primary"
          size="lg"
          className="w-full bg-gradient-to-r from-[#B8931B] via-[#c1a341] to-[#caa323] hover:from-[#ddbc4e] hover:to-[#B8931B] text-white font-semibold py-3"
        >
          Mã chuyển khoản
        </Button>
      </DialogTrigger>
      <DialogContent className="backdrop-blur-md bg-black/60 !w-[90%] lg:!max-w-[45rem] max-h-[90vh] overflow-y-auto scroll-bar-style">
        <DialogHeader>
          <DialogTitle className="text-white">
            Thông tin chuyển khoản
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center items-center mb-4 lg:mb-0">
          <div
            id="firstFilter"
            className="filter-switch w-[250px] lg:w-[400px]"
          >
            <input
              checked={selectedOption === "option1"}
              id="option1"
              name="options"
              type="radio"
              onChange={() => setSelectedOption("option1")}
            />
            <label htmlFor="option1" className="option">
              MoMo
            </label>
            <input
              checked={selectedOption === "option2"}
              id="option2"
              name="options"
              type="radio"
              onChange={() => setSelectedOption("option2")}
            />
            <label htmlFor="option2" className="option">
              MB Bank
            </label>
            <span className="background" />
          </div>
        </div>
        <div className="flex flex-col lg:grid lg:grid-cols-2 justify-between items-center gap-4 pt-5">
          {selectedOption === "option1" ? (
            <div className="flex flex-col gap-3 text-white">
              <div>Chủ tài khoản: Lê Lương Quốc Huy</div>
              <div className="flex flex-row gap-4 items-center justify-between">
                <div>Số tài khoản: 99MM25290MC0000804</div>
                <div>
                  <Copy
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      copy("99MM25290MC0000804");
                      toast.success("Copied!");
                    }}
                  />
                </div>
              </div>
              <div>Ngân hàng: Bản Việt (BVBANK)</div>
              <div>Nội dung: [Tên]_[Show]</div>
              <div>
                <div>Chú thích:</div>
                <ul>
                  <li>Show sáng: [Tên]_slot1</li>
                  <li>Show chiều: [Tên]_slot2</li>
                </ul>
              </div>
              <div className="">
                Tổng tiền: &nbsp;
                <span className="text-white bg-[#B8931B] px-2 py-1 rounded-md">
                  {total}
                </span>{" "}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 text-white">
              <div>Chủ tài khoản: Lê Lương Quốc Huy</div>
              <div className="flex flex-row gap-4 items-center justify-between">
                <div>Số tài khoản: 0909090909</div>
                <div>
                  <Copy
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => {
                      copy("0909090909");
                      toast.success("Copied!");
                    }}
                  />
                </div>
              </div>
              <div>Ngân hàng: BIDV</div>
              <div>Nội dung: [Tên]_[Show]</div>
              <div>
                <div>Chú thích:</div>
                <ul>
                  <li>Show sáng: [Tên]_slot1</li>
                  <li>Show chiều: [Tên]_slot2</li>
                </ul>
              </div>
              <div className="">
                Tổng tiền: &nbsp;
                <span className="text-white bg-[#B8931B] px-2 py-1 rounded-md">
                  {total}
                </span>{" "}
              </div>
            </div>
          )}
          <div className="flex justify-end items-center">
            <Image
              src={selectedOption === "option1" ? qr1 : qr2}
              alt="qr1"
              width={1000}
              height={1000}
              className="rounded-lg w-60 h-60 object-contain"
            />
          </div>
        </div>
        <DialogClose>
          <Button
            color="white"
            size="lg"
            className="bg-[#B8931B] text-white hover:bg-[#B8931B] hover:opacity-80 hover:text-white"
          >
            Đóng
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
