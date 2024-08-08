import "../style/ContactCard.css";
import { Link } from "react-router-dom";

function ContactCard({ item, phone, email, location }) {
  let contactInfo = null;

  // Render contact information based on the id
  switch (item.id) {
    case "phone":
      contactInfo = (
        <div className="item-contents">
          {phone.map((phoneNumber, index) => (
            <a key={index} href={`tel:${phoneNumber?.content}`}>
              {phoneNumber?.content}
            </a>
          ))}
        </div>
      );
      break;
    case "email":
      contactInfo = (
        <div className="item-contents">
          {email.map((emailAddress, index) => (
            <a key={index} href={`mailto:${emailAddress?.content}`}>
              {emailAddress?.content}
            </a>
          ))}
        </div>
      );
      break;
    case "location":
      contactInfo = (
        <div className="item-contents">
          {location.map((loc, index) => (
            <span key={index}>{loc?.content}</span>
          ))}
        </div>
      );
      break;
    default:
      contactInfo = (
        <div className="item-contents">
          {item.contactList.map((contact, index) => (
            <Link key={index} to={contact.href}>
              {contact.text}
            </Link>
          ))}
        </div>
      );
  }

  return (
    <div className="contact-card">
      <div
        className="contact-icon"
        style={item.background ? { backgroundColor: item.background } : {}}
      >
        {item.icon}
      </div>
      <div className="contacts-contents">
        <h4 className="title"> {item.title}</h4>
        {contactInfo}
      </div>
    </div>
  );
}

export default ContactCard;
