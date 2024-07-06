import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../../../contexts/ContextsProvider";

export default function AdminLogout() {
  const navigate = useNavigate();
  const { setToken } = useStateContext();

  useEffect(() => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    setToken(false);
    navigate("/admin/login");
  });
  return <div></div>;
}
