import { Box, Flex } from "@chakra-ui/react";
import { IFilters } from "../store/useFilterStore";
import { useMemo } from "react";
import storage from "../lib/storage";
import { getValueLabel } from "../lib/functions";

interface IDisplayFilters {
  filters: IFilters["filters"];
  isMobile: boolean;
}
export default function DisplayFilters({ filters, isMobile }: IDisplayFilters) {
  const CONSTANTS = useMemo(() => storage.getStorage("consts--chadopt"), []);

  const displayValue = (key: string)  => {
    if (key === "town") return CONSTANTS["towns"]
    else if (key === "status") return CONSTANTS["status"]
    else if (key === "race") return CONSTANTS["races"]
    else if (key === "gender") return CONSTANTS["genders"]
    else return null
  }

  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      justify="flex-start"
      mb="1em"
      ml={isMobile ? "1em" : "0"}
    >
      {Object.entries(filters).reduce((acc: any, [key, value]) => {
        const arr = displayValue(key)
        if (value !== "") {
          acc.push(
            <Box
              key={key}
              as="span"
              bg="accent.1"
              color="white"
              borderRadius="10px"
              p=".2em"
              fontSize=".9rem"
              mb=".5em"
              mr=".25em"
              textTransform="capitalize"
            >
              {key === "name" ? value : 
               key === "age" ? `${value}ans` : getValueLabel(arr, value)}
            </Box>
          );
        }
        return acc;
      }, [])}
    </Flex>
  );
}
