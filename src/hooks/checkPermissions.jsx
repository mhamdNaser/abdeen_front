import { useState, useEffect } from "react";

const useCheckPermission = () => {
  const [userPermissions, setUserPermissions] = useState(
    JSON.parse(localStorage.getItem("USER"))?.permission || []
  );
  const [approvedRoles, setApprovedRoles] = useState(new Set());

  useEffect(() => {
    const userPermissionSet = new Set(
      userPermissions.map((ele) => ele.permissionName)
    );
    setApprovedRoles(userPermissionSet);
  }, [userPermissions]);

  return {
    hasPermissionFun: (permissionName) => approvedRoles.has(permissionName),
  };
};

export default useCheckPermission;
