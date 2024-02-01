import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

interface IInputField {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  [restProps: string]: any;
}

export default function InputField({
  name,
  label,
  placeholder,
  type = "text",
  iconLeft,
  iconRight,
  autoComplete = "off",
  ...restProps
}: IInputField) {
  return (
    <FormControl id={name} mb=".5rem">
      {label && (
        <FormLabel fontWeight="semibold" mb="0" color="accent.1">
          {label}
        </FormLabel>
      )}
      <InputGroup>
        {iconLeft && <InputLeftElement children={iconLeft} />}
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          focusBorderColor="accent.1"
          borderRadius="5px"
          bgColor="gray.100"
          {...restProps}
        />
        {iconRight && <InputRightElement children={iconRight} />}
      </InputGroup>
    </FormControl>
  );
}
