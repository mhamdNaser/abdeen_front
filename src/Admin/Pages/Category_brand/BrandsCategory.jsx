import React from "react";
import { useCategoryBrand } from "../../../provider/CategoryBrandProvider";
import { Page } from "../../../components/StyledComponents";
import PageTitle from "../../../components/PageTitle";

export default function BrandsCategory() {
    const { items } = useCategoryBrand();
    

    const links = [
      {
        title: "home",
        url: "/admin/",
        active: false,
      },
      {
        title: "Brands Table",
        url: "/admin/allbrands",
        active: true,
      },
    ];

  return (
      <Page>
          <PageTitle
          links={links}/>
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brands
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brands
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {category.image && (
                      <img
                        src={import.meta.env.VITE_WEBSITE_URL + category.image}
                        alt={category.en_name}
                        className="h-16 w-16 object-cover mr-4"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {category.en_name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {category.en_description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {category.brands.length > 0 ? (
                    <ul>
                      {category.brands.map((brand) => (
                        <li key={brand.id} className="text-sm text-gray-900">
                          {brand.en_name}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No brands available
                    </span>
                  )}
                </td>
                <td>action</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
