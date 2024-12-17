import React, { useState,useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./PhoneInputComponent.css";
import { leadServiceInstance } from "@/services";
import { AxiosError } from "axios";
import { handleError } from "@/utils/helpers";

interface PhoneInputComponentProps {
  onPhoneChange: (value: string) => void;
  setOtpSent: (value: boolean) => void;
  setCountry: (value: string) => void;
  refCode: string;
}

const PhoneInputComponent = ({ onPhoneChange,setOtpSent,setCountry,refCode }:PhoneInputComponentProps) => {
  const [phone, setPhone] = useState("");
  const [resendOtp,setResendOtp] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setResendOtp(false);
      setOtpSent(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handlePhoneChange = (value: string, countryData: { name: string }) => {
    setCountry(countryData.name);
    setPhone(value);
    onPhoneChange(value);
  };

  const handleSendOtp = async () => {
    
    try {
        const payload = JSON.stringify({ phone: "+" + phone });
        const otpResponse = await leadServiceInstance.sendOtp(payload);

        if (otpResponse.message === "OTP saved successfully!") {
            setResendOtp(true);
        }
        setOtpSent(true);
        setTimer(60);
    } catch (error) {
        handleError(error as AxiosError,true);
    }

  };

  return (
    <div style={{ display: "flex",alignItems: "center", position: "relative", width:"100%"}}>
        <PhoneInput
          country={"in"}
          value={phone}
          onChange={handlePhoneChange}
          containerClass="custom-phone-input" 
          buttonClass="custom-phone-dropdown" 
          searchClass="custom-phone-search"
          inputProps={{
            required: true,
          }}
          dropdownStyle={{
            textAlign: "left",
            color: "black",
          }}
          containerStyle={{
            width: "100%"
          }}
          inputStyle={{
            width: "calc(100% - 60px)",         
            height: "40px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            borderTopLeftRadius:"0px",
            borderBottomLeftRadius:"0px",
            border:"none",
            color:"black"
          }}
        />
        {resendOtp ?<button className="send-otp-button" type="button" style={{
          position: "absolute",
          right: "10px",
          zIndex: 1000,
        }}>Resend in {timer}s</button>:
        <button
          type="button"
          onClick={handleSendOtp}
          className="send-otp-button"
          style={{
          position: "absolute",
          right: "10px",
          zIndex: 1000,
        }}
        >
          Send OTP
        </button>}
    </div>
    
  );
};

export default PhoneInputComponent;
