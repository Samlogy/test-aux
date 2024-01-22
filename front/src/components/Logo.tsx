import { Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Logo({ size = "sm" }) {
  const imageSize: any = {
    sm: "3.5em",
    md: "4.5em",
    lg: "5.5em",
  };
  return (
    <Link to="/">
      <Image src="/logo.jpg" alt="logo" boxSize={imageSize[size]} />
    </Link>
  );
}
