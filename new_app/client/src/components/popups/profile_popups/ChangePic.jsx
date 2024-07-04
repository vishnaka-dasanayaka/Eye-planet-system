import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import pica from "pica";
import { changeProfilePic } from "../../../apis/userAPI";
import { useAuthToken } from "../../../apis/useAuthToken";
import { url } from "../../../config/config";

function ChangePic(props) {
  console.log(props.pic);
  const token = useAuthToken();

  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [pic, setPic] = useState();

  const handleFileChage = (e) => {
    const file = e.target.files[0];
    resizeImage(file, 500, setPic);
  };

  const handleClick = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("pro_pic", pic);
    changeProfilePic(token, formdata);
    props.setAddTrigger(false);
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
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-green-700 capitalize ">
          change profile picture
        </h1>

        <div className="w-80 h-80">
          <img
            src={pic ? URL.createObjectURL(pic) : `${props.user.pic}`}
            className="object-cover w-full h-full rounded-full"
            alt=""
          />
        </div>

        <input type="file" onChange={handleFileChage} className="my-5" />
        <button onClick={handleClick} className="mb-5 capitalize btn_green">
          change photo
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ChangePic;
