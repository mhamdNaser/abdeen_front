import { createContext, useContext, useState, useEffect } from "react";
// import Pusher from "pusher-js";
import { toast } from "react-toastify";
// import { useQueryHook } from "../hooks/useQueryHook";
import axiosClient from "../axios-client";

const StateContext = createContext({
  currentUser: null,
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
  translation: null,
  setTranslation: () => {},
});
// const getData = async (data) => {
//   if (data.user_type === "buyer") {
//     const res = await axiosClient.get("/buyer/notifications");
//     return res;
//   } else if (data.user_type === "seller") {
//     const res = await axiosClient.get("/seller/notifications");
//     return res;
//   } else {
//     const res = await axiosClient.get("/admin/notifications");
//     return res;
//   }
// };
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("USER")));

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("USER")));
  }, []);
  const [notificationsPage, setNotificationsPage] = useState(1);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
//   const {
//     data: notifications,
//     isLoading,
//     isRefetching,
//     refetch,
//   } = useQueryHook(["notifications", notificationsPage], () => getData(user));

  const [translation, _setTranslation] = useState(
    JSON.parse(localStorage.getItem("TRANSLATION")) || {}
  );

//   const [pusherChanel, setPusherChannel] = useState();

//   useEffect(() => {
//     const pusher = new Pusher("a19565747705d7f226db", {
//       cluster: "eu",
//       encrypted: true,
//     });

//     const channel = pusher.subscribe("hantask");
//     channel.bind(
//       "Illuminate\\Notifications\\Events\\BroadcastNotificationCreated",
//       function (data) {
//         if (data?.user_id == user?.id) {
//           refetch(); // Assuming this function is defined elsewhere to refresh data
//           toast.info(data.message, {
//             autoClose: false,
//           });
//         }
//       }
//     );

//     return () => {
//       channel.unbind();
//       pusher.unsubscribe("notifications");
//       pusher.disconnect();
//     };
//   }, []);

  const setToken = (newToken) => {
    _setToken(newToken);
    if (newToken) {
      localStorage.setItem("ACCESS_TOKEN", newToken);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  const setTranslation = (newTranslation) => {
    _setTranslation(newTranslation);
    if (newTranslation) {
      localStorage.setItem("TRANSLATION", JSON.stringify(newTranslation));
    } else {
      localStorage.removeItem("TRANSLATION");
    }
  };

  // Ensure that the user data is updated from localStorage on page load
  useEffect(() => {
    const storedToken = localStorage.getItem("ACCESS_TOKEN");
    if (storedToken) {
      _setToken(storedToken);
    }

    const storedTranslation =
      JSON.parse(localStorage.getItem("TRANSLATION")) || {};
    _setTranslation(storedTranslation);
  }, []);

  return (
    <StateContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        translation,
        setTranslation,
        // pusherChanel,
        // setNotificationsPage,
        // notifications,
        // isLoading,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
