import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Find from "./pages/Find";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Contacts from "./pages/Contacts";
import Admin from "./pages/Admin";
import AddPatient from "./pages/AddPatient";
import PatientProfile from "./pages/PatientProfile";
import SingleOrder from "./pages/SingleOrder";

function App() {
  return (
    <div className="h-full bg-shop_color/5">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/find" element={<Find />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/find" element={<Find />} />
          <Route path="addpatient" element={<AddPatient />} />
          <Route path="/patient" element={<PatientProfile />} />
          <Route path="/order" element={<SingleOrder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
