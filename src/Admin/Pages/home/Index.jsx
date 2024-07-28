import React, { useState, useEffect } from "react";
import axiosClient from "../../../axios-client";
import { Page } from "../../../components/StyledComponents";
import StaticsCards from "./components/StaticsCards";
import PendingOrder from "./components/PendingOrder";

export default function Index() {
  const [statistics, setStatistics] = useState({});
  const [order, setOrder] = useState([]);
  const getData = () => {
    axiosClient.get("/admin/statistics").then((res) => {
      setStatistics(res.data.data);
    });
  };

  const getOrder = () => {
    axiosClient.get(`admin/pending-orders`).then((res) => {
      setOrder(res.data.data);
      console.log(res);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Page>
      <StaticsCards statistics={statistics} />
      <PendingOrder order={order} getOrder={getOrder} getData={getData} />
    </Page>
  );
}
