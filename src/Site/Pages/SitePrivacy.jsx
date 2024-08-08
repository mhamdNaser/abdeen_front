import React, { useEffect, useState } from "react";
import axiosClient from "../../axios-client";

export default function SitePrivacy() {
  const [value, setValue] = useState("<p>hello world</p>");
  const [loading, setLoading] = useState(true);
  const [pageUpdate, setPageUpdate] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await axiosClient.post("/site/pageContent/showbytitle", {
        title: "privacy",
      });
      setValue(res.data?.content);
      setLoading(false);
    };
    getData();
  }, [pageUpdate]);

  return (
    <div className="container mx-auto">
      <div className="lg:py-20 md:px-12 px-4 py-24 prose prose-lg prose-indigo max-w-screen-lg mx-auto">
        <div dangerouslySetInnerHTML={{ __html: value }}></div>
      </div>
    </div>
  );
}
