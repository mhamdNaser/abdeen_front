import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import SunEditor from "suneditor-react";
import { useEffect, useState } from "react";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";

const TermsConditions = () => {
  const [value, setValue] = useState("<p>hello world</p>");
  const [loading, setLoading] = useState(true);
  const [pageUpdate, setPageUpdate] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosClient.post("/admin/pageContent/showbytitle", {
        title: "privacy",
      });
      setValue(res.data?.content);
      setLoading(false);
    };
    getData();
  }, [pageUpdate]);
  function handleChange(content) {
    setValue(content);
  }

  const links = [
    {
      title: "home",
      url: "/admin/",
      active: false,
    },
    {
      title: "brands table",
      url: "/admin/allbrands",
      active: true,
    },
  ];

  const handleSubmit = async () => {
    const data = {
      title: "privacy",
      content: value,
    };

    const res = await axiosClient.post("/admin/pageContent/update", data);
    setPageUpdate(!pageUpdate);
  };
  return loading ? (
    <Loading />
  ) : (
    <Page>
      <PageTitle links={links} />
      <div className="my-4">
        <SunEditor
          id="sample"
          defaultValue={value}
          onChange={handleChange}
          setAllPlugins={true}
          setOptions={{
            buttonList: [
              ["font", "fontSize", "formatBlock"],
              [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript",
              ],
              ["align", "horizontalRule", "list", "table"],
              ["fontColor", "hiliteColor"],
              ["outdent", "indent"],
              ["undo", "redo"],
              ["removeFormat"],
              ["outdent", "indent"],
              ["link", "image"],
              ["preview", "print"],
              ["fullScreen", "showBlocks", "codeView"],
            ],
          }}
        />
        <div className="flex">
          <Button
            onClickFun={handleSubmit}
            color={"bg-greenColor my-4 "}
            title={"save"}
          />
        </div>
      </div>
    </Page>
  );
};

export default TermsConditions;
