import React, { useRef, RefObject } from "react";


import { UserData } from "../App";
import CombinedLayerSvg from "../assets/PinkLayer";
import CombinedIcon from "../assets/CombinedIcon";


interface ProfilePageProps {
  userData: UserData | null;
  pageRef: React.RefObject<HTMLDivElement >;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userData, pageRef }) => {
  return (
    <div
      ref={pageRef}
      className="relative w-[310px] mx-auto sm:w-[385px] rounded-none h-[624px] sm:h-[624px]"
      style={{
        boxShadow:
          "0px 4px 5px rgba(0, 0, 0, 0.2), 4px 0px 6px rgba(0, 0, 0, 0), -4px 0px 6px rgba(0, 0, 0, 0)",
      }}
    >
      {/* Background Image */}
      <div
        style={{
          backgroundImage: "url('/images/newbackground.svg')",
        }}
        className="absolute w-full h-full inset-0  bg-cover bg-no-repeat -translate-x-px -translate-y-px"
      ></div>

      {/* Top Half Overlay */}
      <div className="absolute w inset-x-0 top-0 h-1/2 bg-[#FCFCFC]"></div>

      {/* Bottom Half Overlay with Opacity */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[#FCFCFC] opacity-55"></div>

      {/* Content Container */}
      <div className="relative z-10 w-full">
        <div>
          <CombinedIcon />
        </div>

        <div className="relative mt-[43.97px] flex items-center justify-center">
          <CombinedLayerSvg/>
          <div className="rounded-full">
            <img
              src="/images/Group.png"
              alt="User Profile Photo"
              className="mt-3 absolute left-1/2 top-[50%] rounded-full transform -translate-x-1/2 -translate-y-1/2 w-[191.36px] h-[181.93px] object-cover z-10"
            />
          </div>
        </div>

        {/* User Name */}
        <p className="text-center text-3xl mt-[25.28px] font-roboto font-bold uppercase text-[#D029D8]">
          {userData?.name || "sumit kumar"}
        </p>

        {/* Alpha Icon */}
        <div
          className="font-bold"
          style={{
            width: "205.93px",
            height: "38.45px",
            textAlign: "center",
            backgroundColor: "#2985D6",
            borderRadius: "20px",
            margin: "auto",
            fontSize: "19px",
            color: "#FFFFFF",
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          <div className="mt-4 pt-1">{userData?.designation || "manager"}</div>
        </div>

        {/* User Details */}
        <div className="flex mt-[31.47px] flex-col space-y-1 ml-[65.63px] mr-[106.76px] font-roboto">
          <div
            className="flex font-normal space-x-4"
            style={{ fontSize: "15px" }}
          >
            <div className="text-[#000000] text-nowrap">ID No:</div>
            <div className="text-[#000000] mt-[0.01rem]">
              {userData?.idNumber || "IPLT123456789"}
            </div>
          </div>
          <div className="flex space-x-[11px]" style={{ fontSize: "15px" }}>
            <div className="text-nowrap text-[#000000]">E-mail:</div>
            <div className="text-wrap text-[#000000] mt-[0.01rem]">
              {userData?.email || "O2e7w@example.com"}
            </div>
          </div>
          <div
            className="flex space-x-[10px] mt-1"
            style={{ fontSize: "15px" }}
          >
            <div className="text-[#000000]">Phone:</div>
            <div className="text-[#000000] mt-[0.02rem]">
              {userData?.phone || "8234567890"}
            </div>
          </div>
          <div className="flex space-x-3.5 mt-2" style={{ fontSize: "15px" }}>
            <div className="text-[#000000]">Blood:</div>
            <div className="text-[#000000] mt-[0.02rem]">
              {userData?.bloodGroup || "O+"}
            </div>
          </div>
        </div>

        {/* QR Code */}
        <div className="flex justify-center rounded-none border-0">
          <img
            src={userData?.qrCode || "/images/qrcode.svg"}
            alt="User QR Code"
            className="w-[74.05px] h-[71.92px] rounded-none border-0"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-center font-roboto">
          <div
            style={{ fontSize: "20px" }}
            className="text-center font-bold text-[#000000]"
          >
            <p>www.intelliclick.in</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
