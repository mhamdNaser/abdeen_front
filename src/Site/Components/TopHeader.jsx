import React, { useState, useEffect } from "react";
import useTimeDate from "../../hooks/useTimeDate";

export default function TopHeader() {
  const date = useTimeDate();

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between px-4 sm:px-6 py-3 bg-[#3e3e3e] text-gray-100 text-[12px]">
      <div className="flex justify-between sm:justify-start space-x-4 items-center mb-2 sm:mb-0">
        <span className="font-semibold border-r px-3">
          {date.toLocaleDateString()}
        </span>
        <span className="font-semibold">{date.toLocaleTimeString()}</span>
      </div>
      <div className="flex justify-between sm:justify-end space-x-4 items-center">
        <span className="italic">Text Get From Admin To Put Here</span>
      </div>
    </div>
  );
}
