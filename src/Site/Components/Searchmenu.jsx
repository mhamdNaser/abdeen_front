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
    <div className="flex gap-3">
      {showsearch && <input type="text" className="fileInput bg-slate-500 w-full" />}
      <button onClick={getShowsearch}>
        <BiSearch size={24} />
      </button>
    </div>
  );
}
