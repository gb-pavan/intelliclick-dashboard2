import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { LocationDropdown } from "./LocationDropdown";


interface UploadFormProps {
  setUserData: (userData: any) => void;
  onClose: () => void;
}

export type Location = {
  state: string;
} | {
  city: string;
};

export interface FormData {
  idNumber: string;
  name: string;
  email: string;
  phone: string;
  bloodGroup: string;
  designation: string;
  dateOfBirth: string;
  dateOfJoining: string;
  reportingManager: string;
  location: Location; // The location can be either state or city
  HRBP: string;
}

const UploadForm: React.FC<UploadFormProps> = ({ setUserData, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    idNumber: "",
    name: "",
    email: "",
    phone: "",
    bloodGroup: "",
    designation: "",
    dateOfBirth: "",
    dateOfJoining: "",
    reportingManager: "",
    location: {} as Location,
    HRBP: "",
  });

  const [photo, setPhoto] = useState<File | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "location") {
        formDataToSubmit.append(key, JSON.stringify(formData.location)); // Convert location to string
      } else {
        formDataToSubmit.append(key, formData[key as keyof FormData] as string);
      }
    });
    if (photo) {
      formDataToSubmit.append("photo", photo);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/upload",
        formDataToSubmit
      );
      setUserData(response.data.user);
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-slate-400 p-6 rounded shadow-md w-80">
        <button
          onClick={onClose}
          className="text-red-500 font-bold mb-4 self-end"
        >
          Close
        </button>
        <h2 className="text-xl font-bold mb-4">Upload User Info</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="idNumber"
            placeholder="Employee ID"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <select
            className="mb-2 p-2 w-full border rounded"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <LocationDropdown
            formData={formData}
            setFormData={setFormData}
            onClose={onClose}
          />
          <input
            type="text"
            name="designation"
            placeholder="Designation"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="dateOfBirth"
            placeholder="Date of Birth"
            className="mb-2 p-2 w-full border rounded"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dateOfJoining"
            placeholder="Date of Joining"
            className="mb-2 p-2 w-full border rounded"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onChange={handleChange}
          />
          <input
            type="text"
            name="reportingManager"
            placeholder="Reporting Manager"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="HRBP"
            placeholder="HRBP"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="photo"
            className="mb-2 p-2 w-full border rounded"
            onChange={handleFileChange}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
