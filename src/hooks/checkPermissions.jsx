import { useState, useEffect } from "react";

const useCheckPermission = () => {
  const [userPermissions, setUserPermissions] = useState(
    JSON.parse(localStorage.getItem("USER"))?.permission
  );
  const [permissions, setPermissions] = useState(
    JSON.parse(localStorage?.getItem("permissions"))
  );
  const [approvedRoles, setApprovedRoles] = useState();

  useEffect(() => {
    const userPermissionSet = new Set(
      userPermissions.map((ele) => ele.permissionName)
    );
    setApprovedRoles(
      permissions?.filter((per) => userPermissionSet.has(per.name))
    );
  }, [permissions, userPermissions]);

  return {
    hasPermissionFun: (permissionName) =>
      approvedRoles?.some((ele) => ele.name === permissionName),
  };
};

export default useCheckPermission;
