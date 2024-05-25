import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "../components/popups/admin_popups/AddUser";
import AddBranch from "../components/popups/admin_popups/AddBranch";

function Admin(props) {
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [addBranchPopup, setAddBranchPopup] = useState(false);
  return (
    <div className="flex items-start justify-start h-full bg-white">
      <Sidebar className="" />
      <div className="lg:ml-[288px] w-full">
        <Header />
        <div className="w-full h-full mt-28 md:mt-5">
          <div className="flex items-center justify-between mr-5">
            <h1 className="text-3xl font-semibold tracking-wider capitalize">
              user control
            </h1>
            <button
              onClick={() => setAddUserPopup(true)}
              className="flex items-center justify-center capitalize btn_green"
            >
              <AddIcon className="mr-1" />
              add user
            </button>
          </div>

          <div className="mt-10 mr-5">
            <table className="w-full bg-white">
              <thead className="h-10 font-semibold tracking-wide capitalize bg-gray-100 border-b-2 text-start">
                <td className="pl-3">Name</td>
                <td className="pl-3">Email address</td>
                <td className="pl-3">Permenent address</td>
                <td className="pl-3">Contact number</td>
                <td className="pl-3">actions</td>
              </thead>
              <tbody className="text-xs text-start">
                <tr className="h-12 bg-green-100 border-b-2">
                  <td className="pl-3">
                    <h1 className="text-sm">Hashan Thennakoon</h1>
                    <h2 className="text-green-600 capitalize">admin</h2>
                  </td>
                  <td className="pl-3">hashan@gmail.com</td>
                  <td className="pl-3">Kandy Rd, Matale</td>
                  <td className="pl-3">+94 71 370 4691</td>
                  <td className="flex items-center justify-start pt-2 pl-3">
                    <button className="capitalize btn_delete">disable</button>
                    <button className="ml-3 capitalize btn">save</button>
                  </td>
                </tr>

                <tr className="h-12 bg-blue-100 border-b-2">
                  <td className="pl-3">
                    <h1 className="text-sm">Hashan Thennakoon</h1>
                    <h2 className="text-blue-600 capitalize">active user</h2>
                  </td>
                  <td className="pl-3">hashan@gmail.com</td>
                  <td className="pl-3">Kandy Rd, Matale</td>
                  <td className="pl-3">+94 71 370 4691</td>
                  <td className="flex items-center justify-start pt-2 pl-3">
                    <button className="capitalize btn_delete">disable</button>
                    <button className="ml-3 capitalize btn">save</button>
                  </td>
                </tr>

                <tr className="h-12 bg-red-100 border-b-2">
                  <td className="pl-3">
                    <h1 className="text-sm">Hashan Thennakoon</h1>
                    <h2 className="text-red-600 capitalize">desabled user</h2>
                  </td>
                  <td className="pl-3">hashan@gmail.com</td>
                  <td className="pl-3">Kandy Rd, Matale</td>
                  <td className="pl-3">+94 71 370 4691</td>
                  <td className="flex items-center justify-start pt-2 pl-3">
                    <button className="capitalize btn_enable">Enable</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-20 mr-5">
            <h1 className="text-3xl font-semibold tracking-wider capitalize">
              branch control
            </h1>
            <button
              onClick={() => setAddBranchPopup(true)}
              className="flex items-center justify-center capitalize btn_green"
            >
              <AddIcon className="mr-1" />
              add branch
            </button>
          </div>

          <div className="my-10 mr-5">
            <table className="w-full bg-white">
              <thead className="h-10 font-semibold tracking-wide capitalize bg-gray-100 border-b-2 text-start">
                <td className="pl-3">Branch Name</td>
                <td className="pl-3">Branch Lead</td>
                <td className="pl-3">address</td>
                <td className="pl-3">Contact details</td>
                <td className="pl-3">actions</td>
              </thead>
              <tbody className="text-xs text-start">
                <tr className="h-12 bg-green-100 border-b-2">
                  <td className="pl-3">
                    <h1 className="text-sm capitalize">Matale - main branch</h1>
                    <h2 className="text-green-600 capitalize">main branch</h2>
                  </td>
                  <td className="pl-3 capitalize">hashan thennakoon</td>
                  <td className="pl-3">Kandy Rd, Matale</td>
                  <td className="py-1 pl-3">
                    <p className="py-[1px]">main@gmail.com</p>
                    <p className="py-[1px]">+94 71 370 4691</p>
                    <p className="py-[1px]">+94 71 370 4691</p>
                  </td>
                  <td className="flex items-center justify-start pt-4 pl-3">
                    <button className="capitalize btn_delete">deactive</button>
                    <button className="ml-3 capitalize btn">save</button>
                    <button className="ml-3 capitalize btn_photo">
                      change photo
                    </button>
                  </td>
                </tr>

                <tr className="h-12 bg-blue-100 border-b-2">
                  <td className="pl-3">
                    <h1 className="text-sm capitalize">
                      Kumudu Hospital Branch
                    </h1>
                    <h2 className="text-blue-600 capitalize">active branch</h2>
                  </td>
                  <td className="pl-3 capitalize">Sachini dasanayaka</td>
                  <td className="pl-3">Kandy Rd, Matale</td>
                  <td className="py-1 pl-3">
                    <p className="py-[1px]">main@gmail.com</p>
                    <p className="py-[1px]">+94 71 370 4691</p>
                    <p className="py-[1px]">+94 71 370 4691</p>
                  </td>{" "}
                  <td className="flex items-center justify-start pt-4 pl-3">
                    <button className="capitalize btn_delete">deactive</button>
                    <button className="ml-3 capitalize btn">save</button>
                    <button className="ml-3 capitalize btn_photo">
                      change photo
                    </button>
                  </td>
                </tr>

                <tr className="h-12 bg-red-100 border-b-2">
                  <td className="pl-3">
                    <h1 className="text-sm capitalize">
                      Co-op Hospital branch
                    </h1>
                    <h2 className="text-red-600 capitalize">
                      Deactivated branch
                    </h2>
                  </td>
                  <td className="pl-3 capitalize">Buddika Bandara</td>
                  <td className="pl-3">Kandy Rd, Matale</td>
                  <td className="py-1 pl-3">
                    <p className="py-[1px]">main@gmail.com</p>
                    <p className="py-[1px]">+94 71 370 4691</p>
                    <p className="py-[1px]">+94 71 370 4691</p>
                  </td>{" "}
                  <td className="flex items-center justify-start pt-4 pl-3">
                    <button className="capitalize btn_enable">Enable</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddUser
        addTrigger={addUserPopup}
        setAddTrigger={setAddUserPopup}
      ></AddUser>

      <AddBranch
        addTrigger={addBranchPopup}
        setAddTrigger={setAddBranchPopup}
      ></AddBranch>
    </div>
  );
}

export default Admin;
