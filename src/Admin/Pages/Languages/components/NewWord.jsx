import React, { useState } from "react";
import { BiX } from "react-icons/bi";
import axiosClient from "../../../../axios-client";

export default function NewWord(props) {
  const { closeForm, slug, getWords } = props;
  const [translations, setTranslations] = useState({
    key: "",
    value: "",
  });

  const addNewString = () => {
    axiosClient
      .post(`/admin/translation/update/${slug}`, translations)
      .then(() => {
        getWords();
        closeForm();
      });
  };

  return (
    <>
      <h3 className="flex flex-row justify-between py-2 text-2xl border-b border-b-[lightgray] text-secondary-text px-4">
        Add New Word
        <button
          onClick={() => {
            closeForm();
          }}
        >
          <BiX />
        </button>
      </h3>
      <div className="flex flex-col p-4">
        <div className="py-1 flex flex-col">
          <label className="mb-2 text-secondary-text" htmlFor="">
            String
          </label>
          <input
            className="p-2 outline-1 outline-[lightgray] border border-[lightgray]"
            type="text"
            placeholder="String"
            onChange={(ev) => {
              setTranslations({ ...translations, key: ev.target.value });
            }}
          />
        </div>
        <div className="py-1 flex flex-col">
          <label className="mb-2 text-secondary-text" htmlFor="">
            Translated String
          </label>
          <input
            className="p-2 outline-1 outline-[lightgray] border border-[lightgray]"
            type="text"
            placeholder="Translated String"
            onChange={(ev) => {
              setTranslations({ ...translations, value: ev.target.value });
            }}
          />
        </div>
        <div className="flex flex-row justify-end gap-3 mt-3">
          <button
            className="border border-[lightgray] p-2"
            onClick={() => {
              closeForm();
            }}
          >
            Close
          </button>
          <button
            className="border border-[lightgray] p-2"
            onClick={() => addNewString()}
          >
            Add New String
          </button>
        </div>
      </div>
    </>
  );
}
