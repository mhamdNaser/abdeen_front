import React from "react";
import { Link } from "react-router-dom";

export default function SideBarHome() {
  return (
    <div className="flex flex-col w-full h-1/3 bg-blocks-color p-4">
      <h1 className="border-b-4 px-3 py-2 font-bold text-2xl">Setting</h1>
      <div className="px-1 py-2">
        <Link
          to=""
          title="Home Slider"
          className="block border-b text-primary-text hover:bg-background-color p-2 rounded"
        >
          Home Slider
        </Link>
        <Link
          to=""
          title="Home Slider"
          className="block border-b text-primary-text hover:bg-background-color p-2 rounded"
        >
          Home Slider
        </Link>
        <Link
          to=""
          title="Home Slider"
          className="block border-b text-primary-text hover:bg-background-color p-2 rounded"
        >
          Home Slider
        </Link>
      </div>
    </div>
  );
}
