import { Box, BoxProps } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IView extends BoxProps {
  children: ReactNode;
  cond: boolean;
}

const View = ({ children, cond, ...restProps }: IView) => {
  if (cond) return <Box {...restProps}>{children}</Box>;
  else return null;
};

export default View;
