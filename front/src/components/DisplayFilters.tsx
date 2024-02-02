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
  const constants = useMemo(() => storage.getStorage("consts--chadopt"), []);

  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      justify="flex-start"
      mb="1em"
      ml={isMobile ? "1em" : "0"}
    >
      {Object.entries(filters).reduce((acc: any, [key, value]) => {
        const arr =
          key === "town"
            ? constants["towns"]
            : key === "status"
            ? constants["status"]
            : null;
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
              {key !== "name" ? getValueLabel(arr, value) : value}
            </Box>
          );
        }
        return acc;
      }, [])}
    </Flex>
  );
}
