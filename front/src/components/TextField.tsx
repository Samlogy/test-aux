import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

interface ITextField {
  name: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  [restProps: string]: any;
}

export default function TextField({
  name,
  label,
  placeholder,
  autoComplete,
  ...restProps
}: ITextField) {
  const height = restProps.h ? restProps.h : "7rem";

  return (
    <FormControl id={name} mb=".5rem">
      {label && (
        <FormLabel mb="0" fontWeight="semibold" color="accent.1">
          {label}
        </FormLabel>
      )}
      <Textarea
        placeholder={placeholder}
        name={name}
        autoComplete={autoComplete}
        _placeholder={{ color: "gray.400" }}
        focusBorderColor="accent.1"
        borderRadius="5px"
        h={height}
        bgColor="gray.100"
        {...restProps}
      />
    </FormControl>
  );
}
