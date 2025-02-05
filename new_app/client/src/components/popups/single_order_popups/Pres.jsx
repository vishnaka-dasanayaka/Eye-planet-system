import React from "react";
import { url } from "../../../config/config";
import { useAuthToken } from "../../../apis/useAuthToken";
import { deletePrescription } from "../../../apis/prescriptionAPIs";
import { useNavigate } from "react-router-dom";

function Pres({ pres }) {
  const token = useAuthToken();
  const splitValues = (value) => {
    if (!value) return ["", "", ""];
    const values = value.split("-");
    return [values[0] || "", values[1] || "", values[2] || ""];
  };

  const [retiR1, retiR2, retiR3] = splitValues(pres.retiR);
  const [retiL1, retiL2, retiL3] = splitValues(pres.retiL);
  const [VAR1, VAR2] = splitValues(pres.VAR);
  const [VAL1, VAL2] = splitValues(pres.VAL);
  const [VALPH1, VALPH2] = splitValues(pres.VALPH);
  const [VARPH1, VARPH2] = splitValues(pres.VARPH);

  const navigate = useNavigate();

  const onDelete = async () => {
    if (token) {
      await deletePrescription(token, pres._id);
      navigate(`../order/${pres.order}/${pres.patient}`);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="">
      <div className="flex flex-col w-full p-5 mt-5 bg-gray-300 rounded-lg md:mt-0">
        <div className="grid items-center justify-center grid-cols-1">
          <div></div>
        </div>

        <h1 className="font-bold">
          Created On : <span>{formatDate(pres.createdAt)}</span>
        </h1>

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
              value={pres.hbrxDate}
              autoComplete="off"
              id="hbrxDate"
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
              value={pres.hbrxRSPH}
              autoComplete="off"
              id="hbrxRSPH"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="hbrxRCYL"
              value={pres.hbrxRCYL}
              autoComplete="off"
              id="hbrxRCYL"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="hbrxRAXIS"
              value={pres.hbrxRAXIS}
              autoComplete="off"
              id="hbrxRAXIS"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="hbrxLSPH"
              value={pres.hbrxLSPH}
              autoComplete="off"
              id="hbrxLSPH"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="hbrxLCYL"
              value={pres.hbrxLCYL}
              autoComplete="off"
              id="hbrxLCYL"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="hbrxLAXIS"
              value={pres.hbrxLAXIS}
              autoComplete="off"
              id="hbrxLAXIS"
            />
          </div>
          <div className="grid grid-cols-2">
            <input
              className="w-full p-1 text-center border-2 border-shop_black border-t-transparent"
              type="text"
              name="hbrxRSummary"
              value={pres.hbrxRSummary}
              autoComplete="off"
              id="hbrxRSummary"
            />

            <input
              className="w-full p-1 text-center border-2 border-l-transparent border-shop_black border-t-transparent"
              type="text"
              name="hbrxLSummary"
              value={pres.hbrxLSummary}
              autoComplete="off"
              id="hbrxLSummary"
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
              value={pres.RSPH}
              autoComplete="off"
              id="RSPH"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="RCYL"
              value={pres.RCYL}
              autoComplete="off"
              id="RCYL"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="RAXIS"
              value={pres.RAXIS}
              autoComplete="off"
              id="RAXIS"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="LSPH"
              value={pres.LSPH}
              autoComplete="off"
              id="LSPH"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="LCYL"
              value={pres.LCYL}
              autoComplete="off"
              id="LCYL"
            />
            <input
              className="p-1 text-center border-2 border-shop_black border-t-transparent border-l-transparent"
              type="text"
              name="LAXIS"
              value={pres.LAXIS}
              autoComplete="off"
              id="LAXIS"
            />
          </div>
          <div className="grid grid-cols-2">
            <input
              className="w-full p-1 text-center border-2 border-shop_black border-t-transparent"
              type="text"
              name="rSummary"
              value={pres.rSummary}
              autoComplete="off"
              id="rSummary"
            />

            <input
              className="w-full p-1 text-center border-2 border-l-transparent border-shop_black border-t-transparent"
              type="text"
              name="lSummary"
              value={pres.lSummary}
              autoComplete="off"
              id="lSummary"
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
            value={pres.presNote}
            autoComplete="off"
            id="presNote"
          />
        </div>

        <div className="flex flex-col items-center justify-between ">
          <div className="flex flex-col p-5 bg-gray-200 rounded-lg md:flex-row ">
            <h2 className="text-center ">R/V Date : </h2>
            <input
              type="date"
              className="px-5 py-1"
              name="rvDate"
              value={pres.rvDate}
              autoComplete="off"
              id="rvDate"
            />
          </div>

          <div className="flex flex-col items-center mt-5 ">
            <input
              type="text"
              className="px-5 py-2 mb-5 rounded-lg"
              name="signedBy"
              value={pres.signedBy}
              autoComplete="off"
              id="signedBy"
            />
            <label htmlFor="" className="font-bold uppercase">
              signed by
            </label>
          </div>
        </div>

        {/* <div className="grid justify-between grid-cols-3 my-5 mt-10 ">
          <div>
            <h2 className="font-extrabold ">Add prescription photo</h2>
          </div>
          <div>
            <input type="file" name="presImg" label="Image" id="presImg" />
          </div>
        </div> */}

        {pres.presImg && (
          <div className="flex justify-center w-full">
            <img src={pres.presImg} className="w-2/3 h-fit" alt="" />
          </div>
        )}

        <div className="flex justify-end mt-10 mr-5">
          <button className="capitalize btn_delete" onClick={onDelete}>
            delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pres;
