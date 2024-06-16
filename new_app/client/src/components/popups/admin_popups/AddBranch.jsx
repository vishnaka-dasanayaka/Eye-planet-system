import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { toast } from "sonner";
import { useAuthToken } from "../../../apis/useAuthToken";
import { addBranch } from "../../../apis/branchAPIs";

function AddBranch(props) {
  const token = useAuthToken();

  const [img, setImg] = useState("");

  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [formData, setFormData] = useState({
    branchName: "",
    branchCoordinator: "",
    address: "",
    email: "",
    contactNumber: "",
    contactNumber2: "",
  });

  const {
    branchName,
    branchCoordinator,
    address,
    email,
    contactNumber,
    contactNumber2,
  } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.branchName ||
      !formData.branchCoordinator ||
      !formData.address ||
      !formData.contactNumber ||
      !img
    ) {
      toast.error("Some required fields are empty !");
    } else {
      try {
        formData.branchImg = img;
        await addBranch(token, formData);
        props.setAddTrigger(false);
      } catch (error) {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImg({ ...img, base64 });
  };
  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        className="relative w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start"
      >
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-green-700 ">
          Add a Branch
        </h1>

        <input
          type="text"
          name="branchName"
          value={branchName}
          onChange={handleChange}
          placeholder="Branch Name"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="branchCoordinator"
          value={branchCoordinator}
          onChange={handleChange}
          placeholder="Branch Coordinator"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="address"
          value={address}
          onChange={handleChange}
          placeholder="Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="contactNumber"
          value={contactNumber}
          onChange={handleChange}
          placeholder="Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          type="text"
          name="contactNumber2"
          value={contactNumber2}
          onChange={handleChange}
          placeholder="Another Contact Number"
          className="w-5/6 py-2 pl-2 mb-5 text-lg border-b-2 border-green-300 outline-none"
        />

        <input
          onChange={handleFileChange}
          type="file"
          className="w-5/6 py-2 pl-2 mb-5 "
          accept=".jpg, .jpeg, .png"
        />

        {img && (
          <img
            className="object-cover w-11/12 h-96"
            src={img ? img.base64 : ""}
            alt=""
          />
        )}

        <button
          className="mt-5 text-lg capitalize btn_green"
          onClick={handleSubmit}
        >
          submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddBranch;

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    if (file.size <= 50 * 1024) {
      // 50KB in bytes
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    } else {
      compressImage(file)
        .then((base64) => {
          resolve(base64);
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const MAX_WIDTH = 1024;
      const MAX_HEIGHT = 1024;
      let width = img.width;
      let height = img.height;

      // Maintain aspect ratio
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Compress image
      let quality = 1;

      const compress = () => {
        canvas.toBlob(
          (blob) => {
            const compressedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onloadend = () => {
              const base64String = reader.result;
              const size = Math.round(blob.size / 1024); // in KB
              if (size > 50 && quality > 0.1) {
                quality -= 0.1;
                canvas.toBlob(
                  (blob) => {
                    compress();
                  },
                  file.type,
                  quality
                );
              } else {
                resolve(base64String);
              }
            };
          },
          file.type,
          quality
        );
      };

      compress();
    };

    img.onerror = (error) => {
      reject(error);
    };

    img.src = url;
  });
}
