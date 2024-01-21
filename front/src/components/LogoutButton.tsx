import { Button } from "@chakra-ui/react";
import { redirect } from "react-router-dom";
import storage from "../lib/storage";
import api from "../lib/api";

export default function LogoutButton() {
  const handleLogout = async () => {
    const token = await api.postData("/user/logout", {
      token: storage.getStorage("user--chadopt").token,
    });
    if (!token) return redirect("/login");
  };

  return (
    <Button colorScheme="blue" variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}