import { Link } from "react-router-dom";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { useTranslation } from "../../provider/TranslationProvider";

const Footer = ({ socialMedia }) => {
  const { translations } = useTranslation();
  const language = localStorage.getItem("LANGUAGE");
  return (
    <>
      <footer className="py-12  bg-[#1c1c1c] text-white relative">
        <div className=" flex flex-col flex-wrap justify-between w-full gap-8 lg:flex-row lg:px-32 md:px-16 px-8">
          <div className="flex-[40%]">
            <div className="font-semibold text-xl mb-8">
              <img src="/image/logo-dark.png" className="w-48" />
            </div>
            <div className="text-sm w-3/4 text-gray-300">
              {(translations && translations["footer"]) ||
                "Discover a diverse collection of the finest watch brands and sunglasses with Abdeen, where luxury and quality meet to offer you an unparalleled selection of timepieces and eyewear that blend elegance, craftsmanship, and style."}
            </div>
          </div>
          <div className="flex flex-[40%]">
            <div className="flex-[25%]">
              <div className="font-semibold text-xl mb-8">
                {(translations && translations["company"]) || "company"}
              </div>
              <div className="flex flex-col gap-5 items-start text-gray-300">
                <Link to="/about" className="flex gap-2 items-center">
                  <span>
                    {(translations && translations["about us"]) || "about us"}
                  </span>
                </Link>

                <Link to="/policy" className="flex gap-2 items-center">
                  <span>
                    {(translations && translations["privacy policy"]) ||
                      "privacy policy"}
                  </span>
                </Link>
                <Link to="/condition" className="flex gap-2 items-center">
                  <span>
                    {(translations && translations["terms and conditions"]) ||
                      "terms and conditions"}
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex-[25%]">
              <div className="font-semibold text-xl mb-8">
                {(translations && translations["support"]) || "support"}
              </div>
              <div className="flex flex-col gap-5 items-start text-gray-300">
                {/* <Link className="flex gap-2 items-center">
                  <span>
                    {(translations && translations["help center"]) ||
                      "help center"}
                  </span>
                </Link> */}
                <Link to="/contact" className="flex gap-2 items-center">
                  <span>
                    {(translations && translations["contact"]) || "contact"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-8 lg:flex-row lg:px-32 md:px-16 px-8 py-6 bg-[#3e3e3e] text-white">
        <div>
          {(translations &&
            translations[
              "Copyright © 2024 ABDEEN for watches. All rights reserved."
            ]) ||
            "Copyright © 2024 ABDEEN for watches. All rights reserved."}
          <span className="block text-xs">
            {(translations && translations["Designed and Developed by"]) ||
              "Designed and Developed by"}{" "}
            <a
              className="text-gray-400"
              href="https://www.linkedin.com/in/muhammed-naser-edden/"
            >
              {language === "ar" ? "محمد ناصر الدين" : "Muhammed Nasser Edden"}
            </a>
          </span>
        </div>
        <div className="flex gap-4 items-center">
          {socialMedia &&
            socialMedia.map((media) => {
              if (media.title === "facebook") {
                return (
                  <Link
                    to={`${media.link}`}
                    target="_blank"
                    className="hover:text-black text-white"
                    key={media.title}
                  >
                    <FaSquareFacebook size={32} />
                  </Link>
                );
              } else if (media.title === "instagram") {
                return (
                  <Link
                    to={`${media.link}`}
                    target="_blank"
                    className="hover:text-black text-white"
                    key={media.title}
                  >
                    <FaSquareInstagram size={32} />
                  </Link>
                );
              } else if (media.title === "whatsapp") {
                return (
                  <Link
                    to={`${media.link}`}
                    target="_blank"
                    className="hover:text-black text-white"
                    key={media.title}
                  >
                    <FaSquareWhatsapp size={32} />
                  </Link>
                );
              } else {
                return null; // لتجنب ظهور أي شيء إذا لم يكن العنوان متوافق
              }
            })}
          {/* <Link className="hover:text-redColor text-white">
            <FaSquareXTwitter size={32} />
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Footer;
