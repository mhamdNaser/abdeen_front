import { useEffect, useState } from "react";
import ContactCard from "./components/ContactCard";
import ContactForm from "./components/ContactForm";
import CONTACT_DATA from "./data/contactData";
import axiosClient from "../../../axios-client";
import TitleLine from "./components/TitleLine";

function Contact(props) {
  const user = JSON.parse(localStorage.getItem("USER"));
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const [location, setLocation] = useState([]);
  useEffect(() => {
    getContact();
  }, []);
  const getContact = () => {
    axiosClient.get("site/contact/all").then((data) => {
      const contactus = data.data;
      console.log(contactus);
      const phoneArray = contactus.filter(
        (element) => element.type === "phone"
      );
      const emailArray = contactus.filter(
        (element) => element.type === "email"
      );
      const locatArray = contactus.filter(
        (element) => element.type === "location"
      );
      setPhone(phoneArray);
      setEmail(emailArray);
      setLocation(locatArray);
    });
  };

  return (
    <div className=" sm:px-24 px-6 py-24 flex flex-col gap-12 text-center  justify-center items-center">
      <div className="flex flex-col gap-6 w-full">
        <h2 className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold">
          Contact
        </h2>
        <div className="contact-cards grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
          {CONTACT_DATA.map((item, index) => {
            return (
              <ContactCard
                phone={phone}
                email={email}
                location={location}
                key={index}
                item={item}
              />
            );
          })}
        </div>
        <div className="contact-form-container">
          <TitleLine />
          <ContactForm user={user} />
        </div>
      </div>
    </div>
  );
}

export default Contact;
