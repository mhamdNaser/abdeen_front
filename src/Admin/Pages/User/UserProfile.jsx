import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Button from "../../../components/Button";
import {
  BiSolidEditAlt,
  BiSolidTrashAlt,
  BiSolidShow,
  BiSolidFileExport,
  BiSolidUserPlus,
  BiSolidCheckCircle,
  BiSolidXCircle,
} from "react-icons/bi";

export default function UserProfile() {
  const { id, name } = useParams();
  useEffect(() => {
    console.log(id);
  }, []);

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: `Admins table`,
      url: "/admin/allusers",
      active: false,
    },
    {
      title: `${name} Profile`,
      url: "/admin/allstates",
      active: true,
    },
  ];

  return (
    <>
      <Page>
        <PageTitle
          links={links}
          right={
            // hasAddPermission && (
            <>
              <div>
                <Button
                  isLink={false}
                  color={"bg-greenColor text-xl text-white px-2"}
                  Icon={<BiSolidUserPlus />}
                  //   onClickFun={() => setIsAddModalOpen((prev) => !prev)}
                />
              </div>
              <div>
                <Button
                  isLink={false}
                  color={"bg-redColor text-xl text-white px-2"}
                  Icon={<BiSolidFileExport />}
                  //   onClickFun={archiveSelectedItems}
                />
              </div>
            </>
            // )
          }
        />
      </Page>
    </>
  );
}
