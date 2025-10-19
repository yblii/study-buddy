import analyticsDuck from "../../assets/ducks/duck_end.png";
import React from "react";

export function AnalyticsDucky() {
    return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <div className="relative w-5/6 max-w-sm aspect-square flex justify-center items-center">
        <img
        src={analyticsDuck}
        alt="Analytics Duck"
        className="w-4/5 max-w-md object-contain"
      />
      </div>
    </div>
    );
}