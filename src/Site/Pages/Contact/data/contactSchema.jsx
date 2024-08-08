import { z } from "zod";

const CONTACT_SCHEMA = {
  name: z.string().min(3).max(50),
  email: z.string().regex(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g),
  phone: z.string().regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g),
  address: z.string().min(3).max(50),
  message: z.string().min(3).max(50),
};

export default CONTACT_SCHEMA;
