import React from "react";
import { Link } from "react-router-dom";
import { BiSolidChevronRight } from "react-icons/bi";
import { useTranslation } from "../provider/TranslationProvider"; // تأكد من مسار الاستيراد الصحيح

const PageTitle = ({ links, right }) => {
  const { translations } = useTranslation();

  return (
    <div className="flex justify-between items-center w-full p-6 bg-blocks-color text-primary rounded-md shadow-lg">
      <div className="flex items-center text-md">
        {links.map((link, index) => (
          <span key={index} className="flex items-center">
            {link.active ? (
              <span className="text-gray-400">
                {translations[link.title] || link.title}
              </span>
            ) : (
              <>
                <Link to={link.url} className="text-blueColor">
                  {translations[link.title] || link.title}
                </Link>
                <BiSolidChevronRight className="text-gray-400" />
              </>
            )}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-3">{right}</div>
    </div>
  );
};

export default PageTitle;
