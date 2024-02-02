import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import fetechRequest from "../lib/api";
import useAuthStore from "../store/useAuthStore";

export default function LogoutButton() {
  const navigate = useNavigate();

  const setLogout = useAuthStore((state) => state.setLogout);

  const handleLogout = async () => {
    await fetechRequest("POST", `user/logout`);
    navigate("/login");
    setLogout();
  };

  return (
    <Button
      color="accent.1"
      bgColor="white"
      border="1px solid"
      borderColor="accent.1"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
