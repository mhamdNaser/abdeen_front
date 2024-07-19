import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../../../axios-client";
import WordTable from "./components/WordTable";
import { toast } from "react-toastify";
import Button from "../../../components/Button";
import ModalContainer from "../../../components/ModalContainer";
import ReusableForm from "../../../components/ReusableForm";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Table from "../../../components/Table";
import { BiSolidEditAlt } from "react-icons/bi";
import { useTranslation } from "../../../provider/TranslationProvider";

export default function EditWord() {
  const { translations } = useTranslation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [language, setLanguage] = useState([]);
  const [searchWord, setSearchWord] = useState(null);
  const [direction, setDirection] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [clickedRow, setClickedRow] = useState();

  useEffect(() => {
    getWords();
    setDirection(localStorage.getItem("LANGUAGE") === "ar" ? "rtl" : "ltr");
  }, [searchWord]);

  

  const handleEditLanguage = (row) => {
    setIsEditModalOpen(true);
    setClickedRow(row);
  };

  const getWords = () => {
    axiosClient
      .post(`/admin/show-translation/${slug}`, {
        key: searchWord,
      })
      .then((response) => {
        setLanguage(response.data);
        console.log(response.data);
      });
  };

  const handleNewWord = () => {
    setIsModalOpen(true);
  };

  const columns = [
    {
      name: "Source Text",
      selector: (row) => row.key,
      minWidth: "15%",
    },
    {
      name: "Translation",
      selector: (row) => row.value,
      minWidth: "15%",
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
          <Button
            isLink={false}
            color={"bg-orangeColor"}
            Icon={<BiSolidEditAlt />}
            onClickFun={() => handleEditLanguage(row)}
          />
        </div>
      ),
    },
  ];

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: "Language",
      url: "/admin/languages",
      active: false,
    },
    {
      title: `${slug}`,
      url: "/admin/languages",
      active: true,
    },
  ];

  return (
    <Page>
      <PageTitle
        links={links}
        right={
          <>
            <Button
              title={"Add New Word"}
              isLink={false}
              color={"bg-greenColor  text-black"}
              onClickFun={handleNewWord}
            />
            <Button
              isLink={true}
              goto={"/admin/languages"}
              title={"All Language"}
              color={"bg-blueColor"}
            />
          </>
        }
      />
      <div className="flex w-full">
        <div className="flex flex-col w-full py-10">
          <h2 className="text-2xl">
            {(translations && translations["Change All Words"]) ||
              "Change All Words"}
          </h2>
          <div className="flex flex-row py-3 gap-3 ">
            <span>
              Select any source text to translate it, then enter your translated
              text in the textarea and hit update.
            </span>
          </div>
          {/* <div className="input-field">
            <input
              className="input-box mb-4"
              type="text"
              placeholder="Search Source Text..."
              onChange={(ev) => {
                setSearchWord(ev.target.value);
              }}
            />
          </div> */}
          <div className="">
            {/* <WordTable direction={direction} slug={slug} language={language} /> */}
            <Table
              Title={"brands Table"}
              direction={direction}
              columns={columns}
              data={language}
              hasEditPermission={true} // Assuming you have a way to determine this
              editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
              handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
              setSelectedItemsProp={setSelectedItems}
            />
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
        {isEditModalOpen && (
          <ModalContainer
            isModalOpen={isEditModalOpen}
            setIsModalOpen={setIsEditModalOpen}
            component={
              <UpdateWord
                data={clickedRow}
                slug={slug}
                getWords={getWords}
                setIsModalOpen={setIsEditModalOpen}
              />
            }
          />
        )}
      </div>
    </Page>
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
    axiosClient.post(`/admin/add-word/${slug}`, values).then(() => {
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


const UpdateWord = ({ data, slug, getWords, setIsModalOpen }) => {
  let template = {
    title: "add new word",
    fields: [
      {
        title: "string",
        name: "key",
        type: "text",
        value: data?.key,
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
        disabled: true,
      },
      {
        title: "translated string",
        name: "value",
        type: "text",
        value: data?.value,
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
    ],
  };

  const onSubmit = (values) => {
    const id = toast.loading("submitting, please wait...");
    axiosClient.post(`/admin/add-word/${slug}`, values).then(() => {
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
