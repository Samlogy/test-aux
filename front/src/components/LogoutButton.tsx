import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import fetechRequest from "../lib/api";
import storage from "../lib/storage";

export default function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetechRequest("POST", `user/logout`);
    navigate("/login");
    storage.setStorage("auth--chadopt", {});
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
