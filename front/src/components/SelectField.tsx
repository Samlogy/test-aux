import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { ReactNode } from "react";

interface ISelectField {
  name: string;
  label?: string;
  autoComplete?: string;
  placeholder?: string;
  children: ReactNode;
  icon?: ReactNode;
  [restProps: string]: any;
}

export default function SelectField({
  name,
  label,
  placeholder,
  icon,
  children,
  autoComplete = "off",
  ...restProps
}: ISelectField) {
  return (
    <FormControl id={name} mb=".5rem">
      {label && (
        <FormLabel mb="0" fontWeight="semibold" color="accent.1">
          {label}
        </FormLabel>
      )}
      <Select
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        icon={icon && icon}
        _placeholder={{ color: "gray.400" }}
        focusBorderColor="accent.1"
        borderRadius="5px"
        bgColor="gray.100"
        {...restProps}
      >
        {children}
      </Select>
    </FormControl>
  );
}
