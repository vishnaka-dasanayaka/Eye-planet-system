import React from "react";
import { Circles } from "react-loader-spinner";

function Waiting() {
  return (
    <div className="fixed z-50 flex items-center justify-center w-screen h-screen backdrop-blur-sm backdrop-brightness-50">
      <div className="absolute">
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}

export default Waiting;
