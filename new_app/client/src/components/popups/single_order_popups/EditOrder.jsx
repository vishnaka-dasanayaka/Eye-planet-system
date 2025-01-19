import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import pica from "pica";
import Waiting from "../../spinners/Waiting";
import { toast } from "sonner";
import { useAuthToken } from "../../../apis/useAuthToken";
import { updateOrder } from "../../../apis/orderAPIs";

function EditOrder(props) {
  const [img, setImg] = useState("");
  const token = useAuthToken();

  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [formData, setFormData] = useState({
    lenses: props.order.lenses,
    price: props.order.price,
    advance: props.order.advance,
    status: props.order.status,
    specialNote: props.order.specialNote,
    frameDesc: props.order.frameDesc,
    sentDate: props.order.sentDate ? props.order.sentDate.split("T")[0] : "", // Format to YYYY-MM-DD
    receivedDate: props.order.receivedDate
      ? props.order.receivedDate.split("T")[0]
      : "",
    deliveredDate: props.order.deliveredDate
      ? props.order.deliveredDate.split("T")[0]
      : "",
  });

  const {
    lenses,
    price,
    advance,
    status,
    specialNote,
    frameDesc,
    sentDate,
    receivedDate,
    deliveredDate,
  } = formData;

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setFormData((prev) => {
      const lenses = checked
        ? [...prev.lenses, value]
        : prev.lenses.filter((lense) => lense !== value);

      return { ...prev, lenses };
    });
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    resizeImage(file, 500, setImg);
  };

  const handleSubmit = async (e) => {
    try {
      const form = new FormData();
      form.append("frame_img", img);
      form.append("orderData", JSON.stringify(formData));

      await updateOrder(token, props.oId, form);

      props.setAddTrigger(false);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
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
      <div className="relative w-11/12 bg-white md:w-[500px] flex flex-col items-center justify-start">
        {!formData && <Waiting />}
        {/* Header with Close Button */}
        <div className="w-full flex justify-between items-center px-5 py-3 border-b">
          <h1 className="text-2xl font-extrabold text-[#B522B5]">Edit Order</h1>
          <CloseIcon
            onClick={onCloseclick}
            className="cursor-pointer text-black"
          />
        </div>

        {/* Scrollable Content */}
        <div className="scrollable-area overflow-y-auto w-full px-5 py-5 max-h-[400px]">
          <div className="flex flex-col w-full mb-5">
            <label htmlFor="">Lenses</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                {
                  id: "single_vision",
                  label: "Single Vision",
                  value: "single vision",
                },
                { id: "bi_focals", label: "Bi Focals", value: "bi focals" },
                {
                  id: "progressive",
                  label: "Progressive",
                  value: "progressive",
                },
                { id: "white", label: "White", value: "white" },
                { id: "utmc", label: "UTMC", value: "UTMC" },
                { id: "blue_cut", label: "Blue Cut", value: "blue cut" },
                { id: "photocrome", label: "Photocrome", value: "photocrome" },
                { id: "tinted", label: "Tinted", value: "tinted" },
                { id: "high_index", label: "High Index", value: "high index" },
                {
                  id: "contact_lense",
                  label: "Contact Lenses",
                  value: "contact lense",
                },
                { id: "hi_1_60", label: "Hi 1.60", value: "hi 1.60" },
                { id: "hi_1_67", label: "Hi 1.67", value: "hi 1.67" },
                { id: "hi_1_74", label: "Hi 1.74", value: "hi 1.74" },
              ].map((lense) => (
                <label
                  key={lense.id}
                  htmlFor={lense.id}
                  className="w-full p-1 px-4 mt-2"
                >
                  <input
                    id={lense.id}
                    type="checkbox"
                    name="lense"
                    value={lense.value}
                    checked={formData.lenses.includes(lense.value)}
                    onChange={handleCheckboxChange}
                  />
                  <span className="ml-2 capitalize">{lense.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="">Price</label>
            <input
              type="text"
              value={price}
              className="border-black border-[1px] p-2"
              onChange={handleChange}
              name="price"
            />
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="">Advance</label>
            <input
              value={advance}
              type="text"
              className="border-black border-[1px] p-2"
              onChange={handleChange}
              name="advance"
            />
          </div>

          <div className="flex w-full mb-5">
            <label htmlFor="" className="mr-2">
              Balance :
            </label>
            <label className="text-green-700" type="text">
              {price - advance}
            </label>
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="status">Order Status</label>
            <select
              className="border-black border-[1px] p-2"
              name="status"
              id="status"
              value={status}
              onChange={handleChange}
            >
              <option value="">Select the status</option>
              <option value="order_accepted">Took the Order</option>
              <option value="sent">Sent to the Workshop</option>
              <option value="received">Received from the Workshop</option>
              <option value="delivered">Delivered to the Customer</option>
            </select>
          </div>

          <div
            className={`border-purple-500 rounded-md ${
              status === "order_accepted" || status === ""
                ? "border-none"
                : "border-2"
            } border-opacity-50 p-1`}
          >
            {status === "sent" ? (
              <>
                <div className="flex flex-col items-start justify-start p-2 m-1 ">
                  <label
                    className="font-semibold capitalize text-md"
                    htmlFor=""
                  >
                    sent date
                  </label>
                  <input
                    className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                    type="date"
                    id="sentDate"
                    name="sentDate"
                    value={sentDate}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <></>
            )}

            {status === "received" ? (
              <>
                <div className="flex flex-col items-start justify-start p-2 m-1 ">
                  <label
                    className="font-semibold capitalize text-md"
                    htmlFor=""
                  >
                    sent date
                  </label>
                  <input
                    className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                    type="date"
                    id="sentDate"
                    name="sentDate"
                    value={sentDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col items-start justify-start p-2 m-1 ">
                  <label
                    className="font-semibold capitalize text-md"
                    htmlFor=""
                  >
                    received date
                  </label>
                  <input
                    className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                    type="date"
                    id="receivedDate"
                    name="receivedDate"
                    value={receivedDate}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
            {status === "delivered" ? (
              <>
                <div className="flex flex-col items-start justify-start p-2 m-1 ">
                  <label
                    className="font-semibold capitalize text-md"
                    htmlFor=""
                  >
                    sent date
                  </label>
                  <input
                    className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                    type="date"
                    id="sentDate"
                    name="sentDate"
                    value={sentDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col items-start justify-start p-2 m-1 ">
                  <label
                    className="font-semibold capitalize text-md"
                    htmlFor=""
                  >
                    received date
                  </label>
                  <input
                    className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                    type="date"
                    id="receivedDate"
                    name="receivedDate"
                    value={receivedDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col items-start justify-start p-2 m-1">
                  <label
                    className="font-semibold capitalize text-md"
                    htmlFor=""
                  >
                    Delivered date
                  </label>
                  <input
                    className="w-full p-1 px-4 mt-2 border-2 border-purple-400 rounded-md outline-none"
                    type="date"
                    id="deliveredDate"
                    name="deliveredDate"
                    value={deliveredDate}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="">Special Notes</label>
            <textarea
              type="text"
              value={specialNote}
              className="border-black border-[1px] p-2"
              onChange={handleChange}
              name="specialNote"
            />
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="">Frame Description</label>
            <textarea
              type="text"
              name="frameDesc"
              value={frameDesc}
              onChange={handleChange}
              className="border-black border-[1px] p-2"
            />
          </div>

          <div className="flex flex-col w-full mb-5">
            <label htmlFor="">Frame Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="border-black border-[1px] p-2"
            />
          </div>

          {img && (
            <div className="flex justify-center w-full mb-5">
              <img
                src={URL.createObjectURL(img)}
                className="w-2/3 h-auto"
                alt="Frame Preview"
              />
            </div>
          )}

          {!img && props.order.frameImg !== "" && (
            <div className="flex justify-center w-full mb-5">
              <img
                src={props.order.frameImg}
                className="w-2/3 h-auto"
                alt="Frame Preview"
              />
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="w-full flex flex-col items-center px-5 py-5 border-t">
          <button
            onClick={handleSubmit}
            className="w-full mb-3 text-lg capitalize btn"
          >
            Submit
          </button>
          <button
            onClick={onCloseclick}
            className="w-full text-lg capitalize btn_delete"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default EditOrder;
