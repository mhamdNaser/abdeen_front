import React, { useState } from "react";
import axiosClient from "../../../../axios-client";
import { BiSolidSave } from "react-icons/bi";
import { toast } from "react-toastify";

export default function WordTable({ language, slug, newMessage, direction }) {
  const [translations, setTranslations] = useState({});

  const handleTranslation = (key, value) => {
    setTranslations({
      ...translations,
      key: key,
      value: value,
    });
  };

  const handleSaveLanguage = () => {
    axiosClient
      .post(`/admin/translation/update/${slug}`, translations)
      .then(() => {
        toast.success("changed successfully");
      })
      .catch((err) => {
        toast.error("changed failed");
      });
  };

  return (
    <div className="w-full">
      <table
        dir={direction}
        className={`text-left my-1 w-full bg-blocks-color ${
          direction === "rtl" ? "text-right" : "text-left"
        }`}
      >
        <thead
          className={`${direction === "rtl" ? "text-right" : "text-left"}`}
        >
          <tr className="flex flex-row">
            <th className="py-2 ps-8 w-1/2 font-bold">Source Text</th>
            <th className="py-2 w-1/2 font-bold">Translation</th>
          </tr>
        </thead>
      </table>
      <div className="max-h-96 overflow-y-scroll px-8">
        <table className="text-left my-1 w-full">
          <tbody
            className={`text-secondary-text ${
              direction === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {Object.entries(language).map(([key, value]) => (
              <tr className="flex flex-row" key={key}>
                <td className="w-1/2 border-b border-[lightgray] py-2">
                  {key}
                </td>
                <td className="w-1/2 border-b border-[lightgray] py-2 px-3 flex items-center gap-2 flex-wrap">
                  <input
                    type="text"
                    defaultValue={value}
                    className="input-box w-2/3 me-3 px-1 py-[3px]"
                    onChange={(ev) => handleTranslation(key, ev.target.value)}
                  />
                  <button onClick={handleSaveLanguage}>
                    <BiSolidSave size={25} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
