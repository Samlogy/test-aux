import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface IView {
  children: ReactNode;
  cond: any;
  [restProps: string]: any;
}

const View = ({ children, cond, ...restProps }: IView) => {
  if (cond) return <Box {...restProps}>{children}</Box>;
  else return null;
};

export default View;
