import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'
import Button from '../../../components/Button';
import {
  BiSolidEditAlt,
  BiSolidTrashAlt,
} from "react-icons/bi";
import { Page } from '../../../components/StyledComponents';
import { useTranslation } from '../../../provider/TranslationProvider';
import Table from '../../../components/Table';
import PageTitle from '../../../components/PageTitle';
import ModalContainer from '../../../components/ModalContainer';
import EditSocialMedia from './components/EditSocialMedia';

export default function SocialMedia() {
    const [socialMedia, setSocialMedia] = useState([])
    const { translations, language } = useTranslation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedRow, setClickedRow] = useState();


    const getSocialMedia = () => { 
        axiosClient.get("admin/all-socialmedia").then((res) => { 
            setSocialMedia(res.data.socialMedia);
        });
    }

    const editBtnFun = (row) => {
      setIsModalOpen(true);
      setClickedRow(row);
    };

    useEffect(() => { 
        getSocialMedia();
    },[])

    const columns = [
      {
        name: "Name",
        selector: (row) => row.title,
        maxWidth: "15%",
      },
      {
        name: "Link",
        selector: (row) => row.link,
        maxWidth: "15%",
      },
      {
        name: "Actions",
        cell: (row) => (
          <div className="flex gap-x-2 gap-y-1 items-center w-full flex-wrap">
            {/* {hasEditPermission && ( */}
            <Button
              isLink={false}
              color={"bg-orangeColor"}
              Icon={<BiSolidEditAlt />}
              onClickFun={() => editBtnFun(row)}
            />
            {/* )} */}
            {/* <Button
              isLink={false}
              color={"bg-redColor"}
              Icon={<BiSolidTrashAlt />}
              onClickFun={() => handleDelete(row.id)}
            /> */}
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
        title: "Social Media",
        url: "/admin/alladmins",
        active: true,
      },
    ];
  return (
    <Page>
      <PageTitle links={links} />
      <div className="p-4">
        <Table
          Title={"Social Media"}
          translations={translations}
          columns={columns}
          data={socialMedia}
          hasEditPermission={true} // Assuming you have a way to determine this
          editBtnFun={(row) => console.log("Edit", row)} // Replace with your edit function
          handleDelete={(id) => console.log("Delete", id)} // Replace with your delete function
          setSelectedItemsProp={setSelectedItems}
        />
      </div>
      {isModalOpen && (
        <ModalContainer
          direction={language === "ar" ? "rtl" : "ltr"}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          component={
            <EditSocialMedia
              getSocialMedia={getSocialMedia}
              data={clickedRow}
              setIsModalOpen={setIsModalOpen}
            />
          }
        />
      )}
    </Page>
  );
}
