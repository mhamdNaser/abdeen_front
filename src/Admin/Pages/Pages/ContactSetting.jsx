import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import axiosClient from "../../../axios-client";
import Button from "../../../components/Button";
import { useStateContext } from "../../../provider/ContextsProvider";
import ModalContainer from "../../../components/ModalContainer";

export default function ContactSetting() {
  const [phone, setPhone] = useState([]);
  const [email, setEmail] = useState([]);
  const { translation } = useStateContext();
  const [location, setLocation] = useState([]);
  const [inputs, setInputs] = useState({
    type: "",
    title: "",
    content: "",
  });
  const [FormInput, showFormInput] = useState(false);
  const [FormInputEdit, showFormInputEdit] = useState(false);

  useEffect(() => {
    getContact();
  }, []);

  const getContact = () => {
    axiosClient.get("admin/all-contacts").then((data) => {
      const contactus = data.data;
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

  const showFormPhone = () => {
    showFormInput(true);
  };

  const handleSubmit = () => {
    const id = toast.loading("submitting, please wait...");
    axiosClient.post("admin/store-contact", inputs).then((res) => {
      if (res.data.success == true) {
        showFormInput(false);
        getContact();
        toast.update(id, {
          type: "success",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      } else {
        toast.update(id, {
          type: "error",
          render: res.data.mes,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
      }
    });
  };

  const deletePhone = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.get(`/admin/delete-contact/${id}`).then((data) => {
      getContact();
    });
  };
  const [editData, setEditData] = useState();

  const handleEdit = async (id) => {
    const res = await axiosClient.post(`/admin/update-contact/${id}`, editData);
    showFormInputEdit(false);
    getContact();
  };

  return (
    <div className="container p-5">
      {FormInput && (
        <ModalContainer
          setIsModalOpen={showFormInput}
          component={
            <div className="w-full flex flex-col gap-4">
              <h6 className="flex text-xl font-bold justify-between gap-y-3  border-b-[1px] border-background-color">
                <span>Insert Your Contact , Location And Email</span>
              </h6>
              <div className="flex flex-col gap-y-3  bg-background-color rounded-md w-full">
                <select
                  defaultValue={"1"}
                  onChange={(ev) =>
                    setInputs({ ...inputs, type: ev.target.value })
                  }
                  className="input-box "
                  name=""
                  id=""
                >
                  <option value="1">Select your option</option>
                  <option value="phone">Phone</option>
                  <option value="email">Email</option>
                  <option value="location">Location</option>
                </select>
                <input
                  placeholder="Title Or Name"
                  onChange={(ev) =>
                    setInputs({ ...inputs, title: ev.target.value })
                  }
                  className="input-box "
                  type="text"
                />
                <input
                  placeholder="Content { number , email ,.... etc }"
                  onChange={(ev) =>
                    setInputs({ ...inputs, content: ev.target.value })
                  }
                  className="input-box "
                  type="text"
                />
                <Button
                  isLink={false}
                  color={"bg-greenColor w-fit"}
                  title={"save"}
                  onClickFun={() => handleSubmit()}
                />
              </div>
            </div>
          }
        />
      )}
      {FormInputEdit && (
        <ModalContainer
          setIsModalOpen={showFormInputEdit}
          component={
            <div className="w-full flex flex-col gap-4">
              <h6 className="flex text-xl font-bold justify-between gap-y-3  border-b-[1px] border-background-color">
                <span>edit your contact information</span>
              </h6>
              <div className="flex flex-col gap-y-3  bg-background-color rounded-md w-full">
                <input
                  placeholder="Title Or Name"
                  onChange={(ev) =>
                    setEditData((prev) => ({
                      ...prev,
                      title: ev.target.value,
                    }))
                  }
                  value={editData?.title}
                  className="input-box "
                  type="text"
                />
                <input
                  placeholder="Content { number , email ,.... etc }"
                  onChange={(ev) =>
                    setEditData((prev) => ({
                      ...prev,
                      content: ev.target.value,
                    }))
                  }
                  value={editData?.content}
                  className="input-box "
                  type="text"
                />
                <Button
                  isLink={false}
                  color={"bg-greenColor w-fit"}
                  title={"save"}
                  onClickFun={() => handleEdit(editData.id)}
                />
              </div>
            </div>
          }
        />
      )}
      <div className="flex flex-col">
        <Button
          isLink={false}
          color={"bg-greenColor w-fit"}
          title={"add new"}
          onClickFun={() => showFormPhone()}
        />

        <div className="body">
          <div className="flex flex-col gap-3 bg-blocks-color rounded-md my-3 p-4">
            <h2 className="text-lg ms-2">Phone</h2>
            {phone.map((element, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-background-color rounded-md"
              >
                <span className="w-1/3">{element.title}</span>
                <span className="w-1/3">{element.content}</span>
                <div className="flex gap-2">
                  <Button
                    color="bg-orangeColor"
                    isLink={false}
                    title={"edit"}
                    onClickFun={() => {
                      setEditData(element);
                      showFormInputEdit(true);
                    }}
                  />
                  <Button
                    color="bg-redColor"
                    isLink={false}
                    title={"delete"}
                    onClickFun={() => {
                      deletePhone(element.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 bg-blocks-color rounded-md my-3 p-4">
            <h2 className="text-lg ms-2">Email</h2>
            {email.map((element, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-background-color rounded-md"
              >
                <span className="w-1/3">{element.title}</span>
                <span className="w-1/3">{element.content}</span>
                <div className="flex gap-2">
                  <Button
                    color="bg-orangeColor"
                    isLink={false}
                    title={"edit"}
                    onClickFun={() => {
                      setEditData(element);
                      showFormInputEdit(true);
                    }}
                  />
                  <Button
                    color="bg-redColor"
                    isLink={false}
                    title={"delete"}
                    onClickFun={() => {
                      deletePhone(element.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-3 bg-blocks-color rounded-md my-3 p-4">
            <h2 className="text-lg ms-2">Location</h2>
            {location.map((element, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-5 bg-background-color rounded-md"
              >
                <span className="w-1/3">{element.title}</span>
                <span className="w-1/3">{element.content}</span>
                <div className="flex gap-2">
                  <Button
                    color="bg-orangeColor"
                    isLink={false}
                    title={"edit"}
                    onClickFun={() => {
                      setEditData(element);
                      showFormInputEdit(true);
                    }}
                  />
                  <Button
                    color="bg-redColor"
                    isLink={false}
                    title={"delete"}
                    onClickFun={() => {
                      deletePhone(element.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
