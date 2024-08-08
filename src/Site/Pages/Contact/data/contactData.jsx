import { TbPhoneCall } from "react-icons/tb";
import { IoMailOpenOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa";

const CONTACT_DATA = [
  {
    icon: <TbPhoneCall />,
    id: "phone",
    title: "Call Us",
    contactList: [
      { href: "tel:412-723-5750", text: "412-723-5750" },
      { href: "tel:978-488-6321", text: "978-488-6321" },
    ],
  },
  {
    icon: <IoMailOpenOutline />,
    id: "email",
    title: "Mail Address",
    contactList: [
      { href: "mailto:Contact@mail.com", text: "Contact@mail.com" },
      { href: "mailto:Support@mail.com", text: "Support@mail.com" },
    ],
  },
  {
    icon: <FaRegClock />,
    id: "location",
    title: "Support Time",
    contactList: [{ href: "asd", text: "08.00am to 11.00pm" }],
  },
];

export default CONTACT_DATA;
