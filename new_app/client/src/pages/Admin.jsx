import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "../components/popups/admin_popups/AddUser";
import AddBranch from "../components/popups/admin_popups/AddBranch";
import { getUsers, updateUser } from "../apis/userAPI";
import { useAuthToken } from "../apis/useAuthToken";
import Loading from "../components/spinners/Loading";
import { toast } from "sonner";
import { getBranches, updateBranch } from "../apis/branchAPIs";

function Admin(props) {
  const [addUserPopup, setAddUserPopup] = useState(false);
  const [addBranchPopup, setAddBranchPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);

  const [] = useState({
    branchName: "",
    branchCoordinator: "",
    address: "",
    contactNumber: "",
    contactNumber2: "",
    email: "",
  });

  const token = useAuthToken();

  const onEnableClick = async (id) => {
    try {
      await updateUser(id, token, { role: "user" });
      toast.success("User Enabled");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured");
    }
  };

  const onDisableClick = async (id) => {
    try {
      await updateUser(id, token, { role: "disabled" });
      toast.success("User Disabled");
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured");
    }
  };

  const onBranchEnableClick = async (id) => {
    try {
      await updateBranch(id, token, { status: "active" });
      toast.success("User Enabled");
      fetchBranches();
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured");
    }
  };

  const onBranchDisableClick = async (id) => {
    try {
      await updateBranch(id, token, { status: "disabled" });
      toast.success("User Disabled");
      fetchBranches();
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured");
    }
  };

  const onBranchMainClick = async (id) => {
    try {
      await updateBranch(id, token, { status: "main" });
      toast.success("User Disabled");
      fetchBranches();
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured");
    }
  };

  const onBranchUnsetMainClick = async (id) => {
    try {
      await updateBranch(id, token, { status: "active" });
      toast.success("User Disabled");
      fetchBranches();
    } catch (error) {
      console.log(error);
      toast.error("Some error Occured");
    }
  };

  const fetchUsers = async () => {
    if (token) {
      const response = await getUsers(token);
      setUsers(response.data);
    }
  };

  const fetchBranches = async () => {
    if (token) {
      const response = await getBranches(token);
      setBranches(response.data);
      console.log(branches);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchBranches();
  }, [token, addUserPopup, addBranchPopup]);

  // addUserPopup, onEnableClick, onDisableClick

  if (!users && !branches) {
    return <Loading />;
  }

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
                {users &&
                  users.map((user) => (
                    <tr
                      className={`h-12 ${
                        user.role === "admin" ? "bg-green-100" : ""
                      } ${
                        user.role === "disabled" ? "bg-red-100" : "bg-blue-100"
                      } border-b-2 border-b-gray-300`}
                    >
                      <td className="pl-3">
                        <h1 className="text-sm">
                          {user.firstName} {user.lastName}
                        </h1>

                        {user.role === "admin" ? (
                          <h2 className="text-green-600 capitalize">admin</h2>
                        ) : (
                          <>
                            {user.role === "disabled" ? (
                              <h2 className="text-red-600 capitalize">
                                disabled user
                              </h2>
                            ) : (
                              <>
                                <h2 className="text-blue-600 capitalize">
                                  active user
                                </h2>
                              </>
                            )}
                          </>
                        )}
                      </td>
                      <td className="pl-3">{user.email}</td>
                      <td className="pl-3">{user.address}</td>
                      <td className="pl-3">{user.contactNumber}</td>
                      <td className="flex items-center justify-start pt-2 pl-3">
                        {user.role === "disabled" ? (
                          <>
                            <button
                              onClick={() => onEnableClick(user._id)}
                              className="capitalize btn_enable"
                            >
                              Enable
                            </button>
                          </>
                        ) : (
                          <>
                            {user.role === "admin" ? (
                              <></>
                            ) : (
                              <>
                                <button
                                  onClick={() => onDisableClick(user._id)}
                                  className="capitalize btn_delete"
                                >
                                  disable
                                </button>
                                <button className="ml-3 capitalize btn">
                                  save
                                </button>
                              </>
                            )}
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
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
                {branches &&
                  branches.map((branch) => (
                    <tr
                      className={`h-12 ${
                        branch.status === "main" ? "bg-green-100" : ""
                      } ${
                        branch.status === "disabled"
                          ? "bg-red-100"
                          : "bg-blue-100"
                      } border-b-2 border-b-gray-300`}
                    >
                      <td className="pl-3">
                        {/* <h1 className="text-sm">{branch.branchName}</h1> */}
                        <input
                          type="text"
                          value={branch.branchName}
                          className="text-sm bg-transparent hover:bg-white"
                        />

                        {branch.status === "main" ? (
                          <h2 className="text-green-600 capitalize">
                            Main Branch
                          </h2>
                        ) : (
                          <>
                            {branch.status === "disabled" ? (
                              <h2 className="text-red-600 capitalize">
                                diactivated branch
                              </h2>
                            ) : (
                              <>
                                <h2 className="text-blue-600 capitalize">
                                  active branch
                                </h2>
                              </>
                            )}
                          </>
                        )}
                      </td>

                      <td className="pl-3 capitalize">
                        {branch.branchCoordinator}
                      </td>
                      <td className="pl-3">{branch.address}</td>
                      <td className="py-1 pl-3">
                        <p className="py-[1px]">{branch.contactNumber}</p>
                        <p className="py-[1px]">{branch.contactNumber2}</p>
                        <p className="py-[1px]">{branch.email}</p>
                      </td>
                      <td className="flex items-center justify-start pt-2 pl-3">
                        {branch.status === "disabled" ? (
                          <>
                            <button
                              onClick={() => onBranchEnableClick(branch._id)}
                              className="capitalize btn_enable"
                            >
                              activate
                            </button>
                          </>
                        ) : (
                          <>
                            <>
                              <button
                                onClick={() => onBranchDisableClick(branch._id)}
                                className="capitalize btn_delete"
                              >
                                diactivate
                              </button>
                              {branch.status === "main" ? (
                                <button
                                  onClick={() =>
                                    onBranchUnsetMainClick(branch._id)
                                  }
                                  className="ml-3 capitalize btn_main"
                                >
                                  unset main
                                </button>
                              ) : (
                                <button
                                  onClick={() => onBranchMainClick(branch._id)}
                                  className="ml-3 capitalize btn_green"
                                >
                                  set main
                                </button>
                              )}
                              <button className="ml-3 capitalize btn">
                                save
                              </button>
                              <button className="ml-3 capitalize btn_photo">
                                change photo
                              </button>
                            </>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
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
