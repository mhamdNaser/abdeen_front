import React from "react";

export default function SliderSection() {
  return (
    <div className="grid grid-cols-2 gap-4 px-6 w-1/2">
      <div className="col-span-1 pb-2">
        <img
          src="/image/background.png"
          alt="Image 1"
          className="w-full h-[70%]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <img
          src="/image/background.png"
          alt="Image 2"
          className="w-full h-[34%]"
        />
        <img
          src="/image/background.png"
          alt="Image 3"
          className="w-full h-[34%]"
        />
      </div>
    </div>
  );
}
