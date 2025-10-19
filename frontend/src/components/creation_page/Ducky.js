import React from "react";
import duck from '../../assets/duck_placeholder.jpg'

export function Ducky ({name}) {
  return (

    <div className="flex flex-col items-center my-4 gap-4">
      <img
        src={duck} // or import duckyImage from "../../assets/ducky.png"
        alt="Duck"
        className="w-80 h-80 object-cover"
      />
      {name !== "" && (
        <p className="mt-2 text-lg font-semibold text-gray-800 bg-gray-50 p-4 rounded-lg" >
          {name}
        </p>
      )}
    </div>
  );

};
