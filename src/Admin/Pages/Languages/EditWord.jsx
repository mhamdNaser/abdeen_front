import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../../../axios-client";
import WordTable from "./components/WordTable";
import Button from "../../../Components/Button";
import ReusableForm from "../../../Components/ReusableForm";
import { toast } from "react-toastify";
import ModalContainer from "../../../Components/ModalContainer";

export default function EditWord() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [language, setLanguage] = useState([]);
  const [searchWord, setSearchWord] = useState(null);

  useEffect(() => {
    getWords();
  }, [searchWord]);

  const getWords = () => {
    axiosClient
      .post(`/admin/translation/show/${slug}`, {
        key: searchWord,
      })
      .then((response) => {
        setLanguage(response.data.data);
      });
  };

  const handleNewWord = () => {
    setIsModalOpen(true);
    // setNewWordForm(true);
  };

  const resetJsonFile = () => {
    axiosClient.post("/admin/translation/store", { slug: slug }).then(() => {
      toast.success("reset operation successfully completed");
      setLanguage([]);
      getWords();
    });
  };

  return (
    <div className="flex w-full">
      <div className="flex flex-col w-full p-10">
        <h2 className="text-2xl">Change All Words</h2>
        <div className="flex flex-row py-3 gap-3 justify-between">
          <div className="flex flex-row gap-3">
            <Button
              title={"Add New Word"}
              isLink={false}
              color={"bg-greenColor  text-black"}
              onClickFun={handleNewWord}
            />
            <Button
              isLink={false}
              title={"Regenerate Source Texts"}
              color={"bg-orangeColor"}
              onClickFun={resetJsonFile}
            />
          </div>
          <div>
            <Button
              isLink={true}
              goto={"/admin/dashboard/languages"}
              title={"All Language"}
              color={"bg-blueColor"}
            />
          </div>
        </div>
        <div className="flex flex-row py-3 gap-3 ">
          <span>
            Select any source text to translate it, then enter your translated
            text in the textarea and hit update.
          </span>
        </div>
        <div className="input-field">
          <input
            className="input-box mb-4"
            type="text"
            placeholder="Search Source Text..."
            onChange={(ev) => {
              setSearchWord(ev.target.value);
            }}
          />
        </div>
        <div className="">
          <WordTable slug={slug} language={language} />
        </div>
      </div>

      {isModalOpen && (
        <ModalContainer
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <AddNewWord
              slug={slug}
              getWords={getWords}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
      )}
    </div>
  );
}

const AddNewWord = ({ slug, getWords, setIsModalOpen }) => {
  let template = {
    title: "add new word",
    fields: [
      {
        title: "string",
        name: "key",
        type: "text",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
      {
        title: "translated string",
        name: "value",
        type: "text",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
    ],
  };

  const onSubmit = (values) => {
    const id = toast.loading("submitting, please wait...");
    axiosClient.post(`/admin/translation/update/${slug}`, values).then(() => {
      getWords();
      toast.update(id, {
        render: "operation completed",
        type: "success",
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      setIsModalOpen((prev) => !prev);
    });
  };

  return (
    <ReusableForm template={template} btnText={"submit"} onSubmit={onSubmit} />
  );
};
