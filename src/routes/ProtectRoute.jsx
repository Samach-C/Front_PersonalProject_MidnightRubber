import { useEffect, useState } from "react";
import useUserStore from "../stores/userStore";
import axios from "axios";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ element, allow }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    checkRole()
  }, []);

  const checkRole = async () => {
    try {
      const resp = await axios.post(
        "http://localhost:5588/current-user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const role = resp.data.member.role;
      console.log("role from backend", role);

      if (allow.includes(role)) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    } catch (err) {
      console.log(err);
      setIsAllowed(false);
    }
  };
  if (isAllowed === null) {
    return <div>Loading...</div>;
  }
  if (!isAllowed) {
    return <Navigate to={"/unauthorization"} />;
  }

  return element;
};

export default ProtectRoute;
