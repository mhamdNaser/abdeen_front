import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CONTACT_SCHEMA from "../data/contactSchema";
import Input from "../form/Input";
import SubmitButton from "../form/SubmitButton";
import TextArea from "../form/TextArea";
import { useState } from "react";
import axiosClient from "../../../../axios-client";

function ContactForm({ user }) {
  const schema = z.object(CONTACT_SCHEMA);
  const [disabled, setDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
    },
  });

  const submitData = async (data) => {
    setDisabled(true);
    const res = await axiosClient.post("/site/mail", {
      ...data,
    });
    setDisabled(false);
    console.log(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 my-12">
          <Input
            type={"text"}
            placeholder={"Your Name"}
            register={register}
            name={"name"}
            label={"Your Name"}
            errors={errors}
          />
          <Input
            type={"email"}
            placeholder={"Your Email"}
            register={register}
            name={"email"}
            label={"Your Email"}
            errors={errors}
          />
          <Input
            type={"tel"}
            placeholder={"Your Phone"}
            register={register}
            name={"phone"}
            label={"Your Phone"}
            errors={errors}
          />
          <Input
            type={"text"}
            placeholder={"Your Address"}
            register={register}
            name={"address"}
            label={"Your Address"}
            errors={errors}
          />
          <TextArea
            placeholder={"Your Message"}
            register={register}
            name={"message"}
            label={"Your Message"}
            errors={errors}
          />
        </div>
        <SubmitButton text={"send"} disabled={disabled} />
      </form>
    </>
  );
}

export default ContactForm;
