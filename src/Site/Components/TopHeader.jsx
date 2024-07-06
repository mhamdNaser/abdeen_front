import React, { useState, useEffect } from "react";
import useTimeDate from "../../hooks/useTimeDate";

export default function TopHeader() {
  const date = useTimeDate();

  return (
    <div className="w-full flex justify-between px-6 py-3 bg-redColor text-gray-100 text-[12px] shadow-md shadow-[#CD2A35]">
      <div className="flex space-x-4 items-center">
        <span className="font-semibold border-r px-3">{date.toLocaleDateString()}</span>
        <span className="font-semibold">{date.toLocaleTimeString()}</span>
      </div>
      <div className="flex space-x-4 items-center">
        <span className="italic">Text Get From Admin To Put Here</span>
      </div>
    </div>
  );
}
