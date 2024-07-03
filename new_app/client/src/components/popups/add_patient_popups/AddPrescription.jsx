import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import pica from "pica";

function AddPrescription(props) {
  const [img, setImg] = useState("");
  const onCloseclick = () => {
    props.setAddTrigger(false);
  };

  const [presData, setPresData] = useState({
    VAR1: "",
    VAR2: "",
    VAL1: "",
    VAL2: "",
    VARPH1: "",
    VARPH2: "",
    VALPH1: "",
    VALPH2: "",
    retiR1: "",
    retiR2: "",
    retiR3: "",
    retiL1: "",
    retiL2: "",
    retiL3: "",
    hbrxDate: "",
    hbrxRSPH: "",
    hbrxRCYL: "",
    hbrxRAXIS: "",
    hbrxLSPH: "",
    hbrxLCYL: "",
    hbrxLAXIS: "",
    hbrxRSummary: "",
    hbrxLSummary: "",
    RSPH: "",
    RCYL: "",
    RAXIS: "",
    LSPH: "",
    LCYL: "",
    LAXIS: "",
    rSummary: "",
    lSummary: "",
    presNote: "",
    rvDate: "",
    signedBy: "",
  });

  const {
    VAR1,
    VAR2,
    VAL1,
    VAL2,
    VARPH1,
    VARPH2,
    VALPH1,
    VALPH2,
    retiR1,
    retiR2,
    retiR3,
    retiL1,
    retiL2,
    retiL3,
    hbrxDate,
    hbrxRSPH,
    hbrxRCYL,
    hbrxRAXIS,
    hbrxLSPH,
    hbrxLCYL,
    hbrxLAXIS,
    hbrxRSummary,
    hbrxLSummary,
    RSPH,
    RCYL,
    RAXIS,
    LSPH,
    LCYL,
    LAXIS,
    rSummary,
    lSummary,
    presNote,
    rvDate,
    signedBy,
  } = presData;

  const onChange = (e) => {
    setPresData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    resizeImage(file, 500, setImg);
  };

  const onSubmitClick = (e) => {
    e.preventDefault();
    const formData = {
      VAR: `${VAR1}-${VAR2}`,
      VAL: `${VAL1}-${VAL2}`,
      VARPH: `${VARPH1}-${VARPH2}`,
      VALPH: `${VALPH1}-${VALPH2}`,
      retiR: `${retiR1}-${retiR2}-${retiR3}`,
      retiL: `${retiL1}-${retiL2}-${retiL3}`,
      hbrxDate: hbrxDate,
      hbrxRSPH: hbrxRSPH,
      hbrxRCYL: hbrxRCYL,
      hbrxRAXIS: hbrxRAXIS,
      hbrxLSPH: hbrxLSPH,
      hbrxLCYL: hbrxLCYL,
      hbrxLAXIS: hbrxLAXIS,
      hbrxRSummary: hbrxRSummary,
      hbrxLSummary: hbrxLSummary,
      RSPH: RSPH,
      RCYL: RCYL,
      RAXIS: RAXIS,
      LSPH: LSPH,
      LCYL: LCYL,
      LAXIS: LAXIS,
      rSummary: rSummary,
      lSummary: lSummary,
      presNote: presNote,
      rvDate: rvDate,
      signedBy: signedBy,
    };

    props.onAddPrescription(formData, img);
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
      <div
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        className=" scrollable-form relative w-11/12 bg-white p-3 md:w-[700px] flex flex-col items-center justify-start"
      >
        <CloseIcon
          onClick={onCloseclick}
          className="absolute cursor-pointer right-5 top-5"
        />
        <h1 className="mt-10 mb-5 text-2xl font-extrabold text-[#B522B5] ">
          Add a Prescription
        </h1>
        <div className="flex flex-col w-full p-5 mt-5 bg-gray-100 rounded-lg md:mt-0">
          <div className="grid items-center justify-center grid-cols-1">
            <div></div>
          </div>

          <div className="flex flex-col items-center justify-between md:flex-row">
            <div>
              <h2 className="font-extrabold uppercase ">VA</h2>
            </div>
            <div className="flex flex-col items-center justify-center p-5">
              <div className="flex items-center justify-between">
                <label className="font-bold uppercase" htmlFor="">
                  R
                </label>
                <input
                  className="w-10 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VAR1"
                  value={VAR1}
                  autoComplete="off"
                  id="VAR1"
                  onChange={onChange}
                />
                <label htmlFor="" className="text-lg font-extrabold">
                  /
                </label>
                <input
                  className="w-16 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VAR2"
                  value={VAR2}
                  autoComplete="off"
                  id="VAR2"
                  onChange={onChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold uppercase" htmlFor="">
                  L
                </label>
                <input
                  className="w-10 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VAL1"
                  value={VAL1}
                  autoComplete="off"
                  id="VAL1"
                  onChange={onChange}
                />
                <label htmlFor="" className="text-lg font-extrabold">
                  /
                </label>
                <input
                  className="w-16 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VAL2"
                  value={VAL2}
                  autoComplete="off"
                  id="VAL2"
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="flex items-center justify-between">
                <label className="font-bold uppercase" htmlFor="">
                  PH
                </label>
                <input
                  className="w-10 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VARPH1"
                  value={VARPH1}
                  autoComplete="off"
                  id="VARPH1"
                  onChange={onChange}
                />

                <label htmlFor="" className="text-lg font-extrabold">
                  /
                </label>

                <input
                  className="w-16 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VARPH2"
                  value={VARPH2}
                  autoComplete="off"
                  id="VARPH2"
                  onChange={onChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="font-bold uppercase" htmlFor="">
                  PH
                </label>
                <input
                  className="w-10 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VALPH1"
                  value={VALPH1}
                  autoComplete="off"
                  id="VALPH1"
                  onChange={onChange}
                />

                <label htmlFor="" className="text-lg font-extrabold">
                  /
                </label>

                <input
                  className="w-16 p-1 m-2 rounded-lg border-1"
                  type="text"
                  name="VALPH2"
                  value={VALPH2}
                  autoComplete="off"
                  id="VALPH2"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-0">
            <h2 className="mb-5 font-extrabold text-center md:text-left">
              Reti test
            </h2>

            <div className="md:ml-10">
              <div className="flex flex-col items-center justify-start mb-5 md:flex-row">
                <label className="font-bold uppercase md:mr-20" htmlFor="">
                  R
                </label>
                <div className="bg-white rounded-lg">
                  <input
                    className="w-10 p-1 rounded-l-lg border-1"
                    type="text"
                    name="retiR1"
                    value={retiR1}
                    autoComplete="off"
                    id="retiR1"
                    onChange={onChange}
                  />
                  <label htmlFor="" className="text-lg font-extrabold ">
                    -
                  </label>
                  <input
                    className="w-10 p-1 rounded-lg border-1"
                    type="text"
                    name="retiR2"
                    value={retiR2}
                    autoComplete="off"
                    id="retiR2"
                    onChange={onChange}
                  />
                  <label htmlFor="" className="text-lg font-extrabold ">
                    -
                  </label>
                  <input
                    className="w-10 p-1 rounded-r-lg border-1"
                    type="text"
                    name="retiR3"
                    value={retiR3}
                    autoComplete="off"
                    id="retiR3"
                    onChange={onChange}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center justify-start mb-5 md:flex-row">
                <label className="font-bold uppercase md:mr-20" htmlFor="">
                  L
                </label>
                <div className="bg-white rounded-lg">
                  <input
                    className="w-10 p-1 rounded-lg border-1"
                    type="text"
                    name="retiL1"
                    value={retiL1}
                    autoComplete="off"
                    id="retiL1"
                    onChange={onChange}
                  />
                  <label htmlFor="" className="text-lg font-extrabold">
                    -
                  </label>
                  <input
                    className="w-10 p-1 rounded-lg border-1"
                    type="text"
                    name="retiL2"
                    value={retiL2}
                    autoComplete="off"
                    id="retiL2"
                    onChange={onChange}
                  />
                  <label htmlFor="" className="text-lg font-extrabold">
                    -
                  </label>
                  <input
                    className="w-10 p-1 rounded-lg border-1"
                    type="text"
                    name="retiL3"
                    value={retiL3}
                    autoComplete="off"
                    id="retiL3"
                    onChange={onChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col items-center justify-start my-5 md:flex-row ">
              <h2 className="mr-10 font-extrabold ">HbRx</h2>
              <input
                type="date"
                className="p-2 mt-2 rounded-lg md:mt-0"
                name="hbrxDate"
                value={hbrxDate}
                autoComplete="off"
                id="hbrxDate"
                onChange={onChange}
              />
            </div>

            <div className="grid grid-cols-2 text-center">
              <h2 className="py-1 border-2 border-shop_black">R</h2>
              <h2 className="py-1 border-2 border-l-transparent border-shop_black">
                L
              </h2>
            </div>

            <div className="grid grid-cols-6">
              <h3 className="py-1 text-center border-2 border-shop_black border-t-transparent">
                SPH
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                CYL
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                AXIS
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                SPH
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                CYL
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                AXIS
              </h3>
            </div>

            <div className="grid grid-cols-6">
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent"
                type="text"
                name="hbrxRSPH"
                value={hbrxRSPH}
                autoComplete="off"
                id="hbrxRSPH"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="hbrxRCYL"
                value={hbrxRCYL}
                autoComplete="off"
                id="hbrxRCYL"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="hbrxRAXIS"
                value={hbrxRAXIS}
                autoComplete="off"
                id="hbrxRAXIS"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="hbrxLSPH"
                value={hbrxLSPH}
                autoComplete="off"
                id="hbrxLSPH"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="hbrxLCYL"
                value={hbrxLCYL}
                autoComplete="off"
                id="hbrxLCYL"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="hbrxLAXIS"
                value={hbrxLAXIS}
                autoComplete="off"
                id="hbrxLAXIS"
                onChange={onChange}
              />
            </div>
            <div className="grid grid-cols-2">
              <input
                className="w-full p-1 text-center border-2 border-shop_black border-t-transparent"
                type="text"
                name="hbrxRSummary"
                value={hbrxRSummary}
                autoComplete="off"
                id="hbrxRSummary"
                onChange={onChange}
              />

              <input
                className="w-full p-1 text-center border-2 border-l-transparent border-shop_black border-t-transparent"
                type="text"
                name="hbrxLSummary"
                value={hbrxLSummary}
                autoComplete="off"
                id="hbrxLSummary"
                onChange={onChange}
              />
            </div>
          </div>

          <div>
            <h2 className="my-5 font-extrabold text-center md:text-left">
              Sub test/ suggest
            </h2>
            <div className="grid grid-cols-2 text-center">
              <h2 className="py-1 border-2 border-shop_black">R</h2>
              <h2 className="py-1 border-2 border-l-transparent border-shop_black">
                L
              </h2>
            </div>

            <div className="grid grid-cols-6">
              <h3 className="py-1 text-center border-2 border-shop_black border-t-transparent">
                SPH
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                CYL
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                AXIS
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                SPH
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                CYL
              </h3>
              <h3 className="py-1 text-center border-2 border-shop_black border-l-transparent border-t-transparent">
                AXIS
              </h3>
            </div>

            <div className="grid grid-cols-6">
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent"
                type="text"
                name="RSPH"
                value={RSPH}
                autoComplete="off"
                id="RSPH"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="RCYL"
                value={RCYL}
                autoComplete="off"
                id="RCYL"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="RAXIS"
                value={RAXIS}
                autoComplete="off"
                id="RAXIS"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="LSPH"
                value={LSPH}
                autoComplete="off"
                id="LSPH"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="LCYL"
                value={LCYL}
                autoComplete="off"
                id="LCYL"
                onChange={onChange}
              />
              <input
                className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
                type="text"
                name="LAXIS"
                value={LAXIS}
                autoComplete="off"
                id="LAXIS"
                onChange={onChange}
              />
            </div>
            <div className="grid grid-cols-2">
              <input
                className="w-full p-1 text-center border-2 border-shop_black border-t-transparent"
                type="text"
                name="rSummary"
                value={rSummary}
                autoComplete="off"
                id="rSummary"
                onChange={onChange}
              />

              <input
                className="w-full p-1 text-center border-2 border-l-transparent border-shop_black border-t-transparent"
                type="text"
                name="lSummary"
                value={lSummary}
                autoComplete="off"
                id="lSummary"
                onChange={onChange}
              />
            </div>
          </div>

          <div className="my-5">
            <h2 className="my-5 font-extrabold text-center md:text-left">
              special notes
            </h2>

            <textarea
              className="w-full h-24 p-1 border-2 rounded-md border-shop_black"
              type="text"
              name="presNote"
              value={presNote}
              autoComplete="off"
              id="presNote"
              onChange={onChange}
            />
          </div>

          <div className="flex flex-col items-center justify-between ">
            <div className="flex flex-col p-5 bg-gray-200 rounded-lg md:flex-row ">
              <h2 className="text-center ">R/V Date : </h2>
              <input
                type="date"
                className="px-5 py-1"
                name="rvDate"
                value={rvDate}
                autoComplete="off"
                id="rvDate"
                onChange={onChange}
              />
            </div>

            <div className="flex flex-col items-center mt-5 ">
              <input
                type="text"
                className="px-5 py-2 mb-5 rounded-lg"
                name="signedBy"
                value={signedBy}
                autoComplete="off"
                id="signedBy"
                onChange={onChange}
              />
              <label htmlFor="" className="font-bold uppercase">
                signed by
              </label>
            </div>
          </div>

          <div className="grid justify-between grid-cols-3 my-5 mt-10 ">
            <div>
              <h2 className="font-extrabold ">Add prescription photo</h2>
            </div>
            <div>
              <input
                type="file"
                name="presImg"
                label="Image"
                onChange={onFileChange}
                id="presImg"
              />
            </div>
          </div>

          {img && (
            <div className="flex justify-center w-full">
              <img
                src={URL.createObjectURL(img)}
                className="w-2/3 h-fit"
                alt=""
              />
            </div>
          )}
        </div>

        <button
          onClick={onSubmitClick}
          className="w-full mt-5 text-lg capitalize btn"
        >
          add
        </button>

        <button
          onClick={onCloseclick}
          className="w-full mt-5 text-lg capitalize btn_delete"
        >
          cancel
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default AddPrescription;
