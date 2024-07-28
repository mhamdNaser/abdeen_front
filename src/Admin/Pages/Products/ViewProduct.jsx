import React, { useEffect, useState } from "react";
import { Page } from "../../../components/StyledComponents";
import axiosClient from "../../../axios-client";
import { useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import Loading from "../../../components/Loading";
import InformationSection from "./Sections/InformationSection";
import PriceSection from "./Sections/PriceSection";
import BrandCategorySection from "./Sections/BrandCategorySection";
import TagsSection from "./Sections/TagsSection";
import DescriptionSection from "./Sections/DescriptionSection";
import ImagesSection from "./Sections/ImagesSection";

export default function ViewProduct() {
  const { id, name } = useParams();
  const [product, setProduct] = useState();

  const saveProduct = () => {
    axiosClient.get(`admin/show-product/${id}`).then((data) => {
      setProduct(data.data.product);
    });
  };

  useEffect(() => {
    saveProduct();
  }, []);

  const links = [
    {
      title: "home",
      url: "/product/",
      active: false,
    },
    {
      title: "Products Table",
      url: "/admin/allproducts",
      active: false,
    },
    {
      title: `${name}`,
      url: "/admin/userProfile",
      active: true,
    },
  ];


  return (
    <>
      <Page>
        <PageTitle links={links} />
        <div className="md:flex py-10 gap-10">
          {!product ? (
            <Loading />
          ) : (
            <>
              <div className="xl:w-1/4 lg:w-full text-dark">
                <InformationSection
                  product={product}
                  saveProduct={saveProduct}
                />

                <PriceSection product={product} saveProduct={saveProduct} />
              </div>

              <div className="xl:w-3/4 lg:w-full text-dark">
                <ImagesSection Productid={product.id} />
                <DescriptionSection
                  Product={product}
                  saveProduct={saveProduct}
                />

                <BrandCategorySection Product={product} />

                <TagsSection Productid={product.id} saveProduct={saveProduct} />
              </div>
            </>
          )}
        </div>
      </Page>
    </>
  );
}
