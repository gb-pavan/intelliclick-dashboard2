
import React, { useRef, useState } from "react";
import domtoimage from "dom-to-image";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import EmployePage from "@components/ProfileComponents/EmployePage";
import BackPage from "@components/ProfileComponents/BackPage";
import UploadForm from "@components/ProfileComponents/UploadForm";
// import { HandleError } from "./utils/helpers/handle-error";
import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";


export interface UserData {
  idNumber: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  qrCode: string;
  bloodGroup: string;
  designation: string;
  dateOfBirth: string; // ISO string format for date
  dateOfJoining: string; // ISO string format for date
  reportingManager: string;
  location: string;
  HRBP: string;
}

function Profile() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const frontRef = useRef<HTMLDivElement | null>(null);
  const backRef = useRef<HTMLDivElement | null>(null);

  const handleShowForm = () => setShowForm(true);
  const handleCloseForm = () => setShowForm(false);

  const downloadHandler = async (format: "png" | "svg" | "pdf") => {
    const exportPage = async (ref: React.RefObject<HTMLDivElement>) => {
      if (!ref.current) {
        notifications.show({
          title: "File Generation Error",
          message: "Reference not found",
          color: "red",
          icon: <IconX />,
        
        })
       
        return null; // Return null if reference is not found
      }

      const scale = 3; // High resolution
      const boundingRect = ref.current.getBoundingClientRect();

      try {
        const dataURL = await domtoimage.toPng(ref.current, {
          quality: 1,
          cacheBust: true,
          width: boundingRect.width * scale,
          height: boundingRect.height * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${boundingRect.width * scale}px`,
            height: `${boundingRect.height * scale}px`,
          },
        });

        return {
          dataURL,
          width: boundingRect.width * scale,
          height: boundingRect.height * scale,
        };
      } catch (error) {
        notifications.show({
          title: "File Generation Error",
          message: "An error occurred while generating the image.",
          color: "red",
          icon: <IconX />,
        
        })
        return null; // Return null if image generation fails
      }
    };

    try {
      const frontData = await exportPage(frontRef);
      const backData = await exportPage(backRef);

      if (!frontData || !backData) {
        // If any of the data is null, abort the process
        notifications.show({
          title: "File Generation Error",
          message: "Failed to generate images for front or back page.",
          color: "red",
          icon: <IconX />,
        
        })
        return;
      }

      // Continue the rest of the logic if both front and back data are available
      if (format === "png") {
        const zip = new JSZip();
        const imagesFolder = zip.folder("images");
        imagesFolder?.file("front-page.png", frontData.dataURL.split(",")[1], {
          base64: true,
        });
        imagesFolder?.file("back-page.png", backData.dataURL.split(",")[1], {
          base64: true,
        });
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "cards.zip");
      } else if (format === "svg") {
        const toSvg = (imageData: string, width: number, height: number) => `
          <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
            <image href="${imageData}" x="0" y="0" height="100%" width="100%" />
          </svg>
        `;

        const zip = new JSZip();
        const imagesFolder = zip.folder("images");

        imagesFolder?.file(
          "front-page.svg",
          toSvg(frontData.dataURL, frontData.width, frontData.height)
        );
        imagesFolder?.file(
          "back-page.svg",
          toSvg(backData.dataURL, backData.width, backData.height)
        );

        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "cards.zip");
      } else if (format === "pdf") {
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm

        const scaleImageToFit = (imgWidth: number, imgHeight: number) => {
          const aspectRatio = imgWidth / imgHeight;
          let newWidth = pageWidth;
          let newHeight = pageWidth / aspectRatio;

          if (newHeight > pageHeight) {
            newHeight = pageHeight;
            newWidth = pageHeight * aspectRatio;
          }

          const xOffset = (pageWidth - newWidth) / 2;
          const yOffset = (pageHeight - newHeight) / 2;

          return { newWidth, newHeight, xOffset, yOffset };
        };

        const frontDims = scaleImageToFit(
          frontData.width / 4,
          frontData.height / 4
        );
        pdf.addImage(
          frontData.dataURL,
          "PNG",
          frontDims.xOffset,
          frontDims.yOffset,
          frontDims.newWidth,
          frontDims.newHeight
        );

        pdf.addPage();

        const backDims = scaleImageToFit(
          backData.width / 4,
          backData.height / 4
        );
        pdf.addImage(
          backData.dataURL,
          "PNG",
          backDims.xOffset,
          backDims.yOffset,
          backDims.newWidth,
          backDims.newHeight
        );

        pdf.save("document.pdf");
      } else {

        notifications.show({
          title: "File Generation Error",
          message:"Unsupported format selected. Please try again.",
          color: "red",
          icon: <IconX />,
        
        })
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred.";
        notifications.show({
          title: "File Generation Error",
          message: errorMessage,
          color: "red",
          icon: <IconX />,
        
        })
     
    }
  };

  return (
    <div className="w-auto h-auto bg-slate-700">
      {/* <UploadForm setUserData={setUserData} onClose={handleCloseForm} /> */}
      <EmployePage
        userData={userData}
        frontRef={frontRef}
        backRef={backRef}
        downloadHandler={downloadHandler}
      /> 
      <div style={{ position: "absolute", top: "-9999px", left: "-9999px" }}>
        <BackPage pageRef={backRef} />
      </div>
    </div>
  );
}

export default Profile;