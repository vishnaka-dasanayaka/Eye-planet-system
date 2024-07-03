import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import pica from "pica";

function AddFramePopup(props) {
  const [img, setImg] = useState("");
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [frameData, setFrameData] = useState({
    frameDescription: "",
  });

  const { frameDescription } = frameData;

  const handleChange = (e) => {
    setFrameData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    resizeImage(file, 500, setImg);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.onAddFrame(frameData, img);
  };

  const resizeImage = (file, maxSizeKB, callback) => {
    const img = document.createElement("img");
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { width, height } = img;
        const scale = Math.sqrt((maxSizeKB * 1024) / (width * height));
        canvas.width = width * scale;
        canvas.height = height * scale;

        pica()
          .resize(img, canvas, {
            quality: 3,
          })
          .then((result) => {
            return pica().toBlob(result, "image/jpeg", 0.7); // Adjust the quality to meet size requirement
          })
          .then((blob) => {
            const resizedFile = new File([blob], file.name, {
              type: blob.type,
            });
            callback(resizedFile);
          });
      };
    };

    reader.readAsDataURL(file);
  };

  return props.addTrigger ? (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-75">
      <div className="relative w-11/12 bg-white p-3 md:w-[500px] flex flex-col items-center justify-start">
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-[#B522B5] ">
          Add a Frame
        </h1>

        <textarea
          type="text"
          name="frameDescription"
          value={frameDescription}
          onChange={handleChange}
          placeholder="Add  optional mini description about the frame"
          className="w-5/6 h-32 py-2 pl-2 mb-5 text-lg border-purple-300 outline-none border-y-2"
        />

        <input
          type="file"
          onChange={handleFileChange}
          className="w-5/6 py-2 pl-2 mb-5 "
        />

        <button onClick={handleSubmit} className="text-lg capitalize btn">
          submit
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddFramePopup;

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
