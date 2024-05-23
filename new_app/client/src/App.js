import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Find from "./pages/Find";

function App() {
  return (
    <div className="bg-shop_color/5 w-screen h-full">
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
          <Route path="/find" element={<Find />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
