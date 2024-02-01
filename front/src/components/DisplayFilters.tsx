import { Box, Flex } from "@chakra-ui/react";
import { IFilters } from "../store/useFilterStore";

interface IDisplayFilters {
  filters: IFilters["filters"];
  isMobile: boolean;
}
export default function DisplayFilters({ filters, isMobile }: IDisplayFilters) {
  return (
    <Flex
      flexDir="row"
      flexWrap="wrap"
      justify="flex-start"
      mb="1em"
      ml={isMobile ? "1em" : "0"}
    >
      {Object.entries(filters).reduce((acc: any, [key, value]) => {
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
              {value}
            </Box>
          );
        }
        return acc;
      }, [])}
    </Flex>
  );
}
