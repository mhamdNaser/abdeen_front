import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import ModalContainer from "../../../components/ModalContainer";
// import { EditAdmin } from "./EditAdmin";
// import { AddAdmin } from "./AddAdmin";
import Swal from "sweetalert2";
import {
  BiSolidEditAlt,
  BiSolidTrashAlt,
  BiSolidShow,
  BiSolidFileExport,
  BiSolidUserPlus,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";
import { useParams } from "react-router-dom";

export default function AllCities() {
  const { id, country, state_id, state } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [clickedRow, setClickedRow] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedItems, setSelectedItems] = useState([]); // Add this state

  const [cities, setCities] = useState([]);

  const getCities = async () => {
    const res = await axiosClient.get(`/admin/all-cities-id/${state_id}`);
    setCities(res?.data.data);
  };

  const deleteFunc = async (id) => {
    const res = await axiosClient.get(`/admin/delete-city/${id}`);
    getCities();
  };

  useEffect(() => {
    try {
      getCities();
    } catch (error) {
      console.error("Failed to fetch admins", error);
    } finally {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);
    }

    getCities();
  }, []);

  const editBtnFun = (row) => {
    setIsModalOpen(true);
    setClickedRow(row);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      theme: "dark",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFunc(id);
        getCities();
      }
    });
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      maxWidth: "15%",
    },
    {
      name: "Name",
      selector: (row) => row.state,
      maxWidth: "15%",
    },
    {
      name: "Status",
      selector: (row) =>
        row.status !== 0 ? (
          <BiSolidCheckCircle className="text-greenColor" />
        ) : (
          <BiSolidXCircle />
        ),
      maxWidth: "15%",
    },

    // {
    //   name: "Actions",
    //   cell: (row) => (
    //     <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
    //       {/* {hasEditPermission && ( */}
    //       <Button
    //         isLink={false}
    //         color={"bg-orangeColor"}
    //         Icon={<BiSolidEditAlt />}
    //         onClickFun={() => editBtnFun(row)}
    //       />
    //       {/* )} */}
    //       <Button
    //         isLink={false}
    //         color={"bg-redColor"}
    //         Icon={<BiSolidTrashAlt />}
    //         onClickFun={() => handleDelete(row.id)}
    //       />
    //       <Button
    //         isLink={false}
    //         color={"bg-blueColor"}
    //         Icon={<BiSolidShow />}
    //         onClickFun={() => handleView(row.id)}
    //       />
    //     </div>
    //   ),
    // },
  ];

  const archiveSelectedItems = () => {
    axiosClient
      .post("/admin/archive-admin-array", { array: selectedItems })
      .then((data) => {
        console.log(data);
      });
  };

  if (loading) {
    return <Loading />;
  }

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `countries`,
      url: "/admin/allcountries",
      active: false,
    },
    {
      title: `${country}`,
      url: `/admin/allstates/${id}/${country}`,
      active: false,
    },
    {
      title: `${state}`,
      active: true,
    },
  ];

  return (
    <>
      <Page>
        <PageTitle
          links={links}
          // right={
          //   // hasAddPermission && (
          //   <>
          //     <div>
          //       <Button
          //         isLink={false}
          //         color={"bg-greenColor text-xl text-white px-2"}
          //         Icon={<BiSolidUserPlus />}
          //         onClickFun={() => setIsAddModalOpen((prev) => !prev)}
          //       />
          //     </div>
          //     <div>
          //       <Button
          //         isLink={false}
          //         color={"bg-redColor text-xl text-white px-2"}
          //         Icon={<BiSolidFileExport />}
          //         onClickFun={archiveSelectedItems}
          //       />
          //     </div>
          //   </>
          //   // )
          // }
        />
        {/* {isModalOpen && (
          <ModalContainer
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            component={
              <EditAdmin
                data={clickedRow}
                getCities={getCities}
                setIsModalOpen={setIsModalOpen}
              />
            }
          />
        )}
        {isAddModalOpen && (
          <ModalContainer
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
            component={
              <AddAdmin
                getCities={getCities}
                setIsAddModalOpen={setIsAddModalOpen}
              />
            }
          />
        )} */}
        <div className="my-4">
          <Table
            columns={columns}
            data={cities}
            hasEditPermission={true} // Assuming you have a way to determine this
            editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
            handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
            setSelectedItemsProp={setSelectedItems}
          />
        </div>
      </Page>
    </>
  );
}
