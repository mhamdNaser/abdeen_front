import { useEffect, useState } from "react";
import axiosClient from "../../../axios-client";
import Addlanguage from "./components/Addlanguage";
import { toast } from "react-toastify";
import { Page } from "../../../components/StyledComponents";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import PageTitle from "../../../components/PageTitle";
import {
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";


export default function Languages() {
  const [langs, setLangs] = useState();
  const [language, setLanguage] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState();

  const getData = async () => {
    await axiosClient.get("/admin/all-languages").then((res) => {
      setLanguage(res.data.data);
    });
  };

  const changestatus = async (values) => {
    const id = toast.loading("Error , Check your input again...");
    axiosClient
      .get(`/admin/changestatus-language/${values}`)
      .then((data) => {
        if (data.success === false) {
          toast.update(id, {
            type: "error",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        } else {
          getData();
          toast.update(id, {
            type: "success",
            render: data.data.message,
            closeOnClick: true,
            isLoading: false,
            autoClose: true,
            closeButton: true,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.update(id, {
          type: "error",
          render: err.response.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      });
  };



  const deleteLang = async (langId) => { 
    
    const id = toast.loading("submitting, please wait...");
    try {
      const res = await axiosClient.get(`/admin/delete-language/${langId}`);;
      toast.update(id, {
        type: "success",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      getData();
    } catch (error) {
      toast.update(id, {
        type: "error",
        render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "direction",
      selector: (row) => row.direction,
    },
    {
      name: "slug",
      selector: (row) => row.slug,
    },
    {
      name: "status",
      selector: (row) => (
        <button onClick={() => changestatus(row.id)}>
          {row.status !== 0 ? (
            <BiSolidCheckCircle size={20} className="text-greenColor" />
          ) : (
            <BiSolidXCircle size={20} />
          )}
        </button>
      ),
    },
    {
      name: "actions",
      minWidth: "30%",
      cell: (row) => {
        return (
          <div className="flex gap-1 items-center flex-wrap">
            <Button
              isLink={true}
              title={"edit words"}
              goto={`/admin/EditWord?slug=${row.slug}`}
              color={"bg-blueColor"}
            />
            <Button
              isLink={false}
              title={"delete"}
              color={"bg-redColor"}
              onClickFun={() => deleteLang(row.id)}
            />
          </div>
        );
      },
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
      active: true,
    },
  ];

  return (
    <Page className="flex items-start flex-col justify-between gap-6">
      <PageTitle
        links={links}
      />
      <div className="bg-blocks-color component-shadow px-4 py-3 rounded-md w-full">
        <Addlanguage getData={getData} />
      </div>
      <div className="flex flex-col w-full">
        <Table
          Title={"Admins Table"}
          columns={columns}
          data={language}
          hasEditPermission={true} // Assuming you have a way to determine this
          editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
          handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
          setSelectedItemsProp={setSelectedItems}
        />
      </div>
    </Page>
  );
}
