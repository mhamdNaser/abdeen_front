import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

export default function Searchmenu() {
  const [showsearch, setShowsearch] = useState(false);
  const getShowsearch = () => {
    setShowsearch(!showsearch);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showsearch &&
        !document.querySelector(".search-dropdown").contains(event.target)
      ) {
        setShowsearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showsearch]);

  return (
    <>
      <button onClick={getShowsearch}>
        <BiSearch size={32} />
      </button>
      <div
        className={`absolute flex flex-col search-dropdown mt-[40px] overflow-y-auto component-shadow text-primary-text bg-blocks-color z-10 rounded-md ${
          showsearch ? "h-[auto]" : "h-0"
        }`}
      >
        <div className="flex items-center justify-between w-full py-4 px-2 gap-4">
          <label htmlFor="search">Search</label>
          <input type="text" className="fileInput p-2" />
        </div>
      </div>
    </>
  );
}
