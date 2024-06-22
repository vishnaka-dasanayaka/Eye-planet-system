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
import { Toaster } from 'sonner'
import PrivateRoute from './PrivateRoute'; // import the PrivateRoute component

function App() {


  return (
    <div className="h-full bg-shop_color/5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={Home} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<PrivateRoute element={Add} />} />
          <Route path="/find" element={<PrivateRoute element={Find} />} />
          <Route path="/me" element={<PrivateRoute element={Profile} />} />
          <Route path="/contacts" element={<PrivateRoute element={Contacts} />} />
          <Route path="/addpatient" element={<PrivateRoute element={AddPatient} />} />
          <Route path="/patient/:id" element={<PrivateRoute element={PatientProfile} />} />
          <Route path="/order/:id/:id" element={<PrivateRoute element={SingleOrder} />} />
          <Route path="/admin" element={<PrivateRoute element={Admin} />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </div>
  );
}

export default App;
