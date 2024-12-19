import React, { ForwardedRef } from "react";
import CombinedIcon from "../assets/CombinedIcon";
import CombinePattern from "../assets/backcard/CombinedPattern";


interface BackPageProps {
  pageRef: ForwardedRef<HTMLDivElement>;
}
const BackPage = ({ pageRef }: BackPageProps) => {
  return (
    <div
      ref={pageRef}
      className="w-[310px] mx-auto sm:w-[385px]  h-[624px] sm:h-[624px]  mr-10 relative bg-[url('/src/assets/background.svg')] bg-no-repeat bg-cover rounded-none overflow-hidden -translate-x-px -translate-y-px backdrop-blur-3xl"
    >
      {/* Overlay Background */}
      <div className="absolute w-full inset-0  opacity-65 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full">
        <CombinedIcon />
        {/* <div className="  flex justify-center items-center mt-[11.46px] ">
        <img className="w-[145px] h-[40px]" src={logo} alt="intelliclickLogo" />
        </div> */}
        <div className="flex items-center justify-center mt-9">
          <div className="flex justify-center  font-poppins  text-nowrap text   items-center  text-[#000000] text-lg font-semibold  ">
            <pre className="tracking-tight">TERMS & CONDITIONS</pre>
          </div>
        </div>
        <div
          className="ml-[30.82px] mt-9 text-[#000000] mr-[24.67px] flex flex-col gap-3"
          style={{ fontSize: "15px" }}
        >
          <div className="flex space-x-[8.28px] font-roboto">
            <span className="text-[#000000] font-bold">•</span>
            <p className="leading-tight">
              Identification: Carry the ID card at all times during working
              hours for identification purposes.
            </p>
          </div>
          <div className="flex space-x-[8.28px]">
            <span className="text-[#000000] font-bold">•</span>
            <p className="leading-tight">
              Authorized Use: The ID card is strictly for official use and
              should not be shared or used for unauthorized purposes.
            </p>
          </div>
          <div className="flex space-x-[8.28px]">
            <span className="text-[#000000] font-bold">•</span>
            <p className="leading-tight">
              To be returned upon cessation of employment. If lost, inform
              HR/Security immediately.
            </p>
          </div>
        </div>
        <div
          style={{ fontSize: "14px" }}
          className="text-center text-nowrap mt-[50px] text-[#000000] font-bold font-roboto"
        >
          INTELLICLICK SERVICES PRIVATE LIMITED
        </div>
        <div
          style={{ fontSize: "13px" }}
          className="text-center mt-8 text-[#000000] font-roboto"
        >
          <span>377/44 Civil Lines Near IIT, Roorkee</span>
        </div>
        <div
          style={{ fontSize: "13px" }}
          className="text-center text-[#000000] font-roboto"
        >
          <span>Pin 247667</span>
        </div>
      </div>

      {/* CombinePattern at the bottom */}
      <div className="relative  mt-[39px] w-[385px]   sm:w-[385px]">
        <CombinePattern />
        <div className="absolute  z-10 top-20 left-[150px] flex items-center justify-center font-roboto">
          <span
            style={{ fontSize: "12px" }}
            className="text-[#FFFFFF] font-semibold"
          >
            www.intelliclick.in
          </span>
        </div>
      </div>
    </div>
  );
};

export default BackPage;
