import { Box, Flex } from "@chakra-ui/react";

type IFilters = {
  name: string;
  status: string;
  town: string;
  isFavourite: boolean;
};
interface IDisplayFilters {
  filters: IFilters;
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
      {Object.entries(filters)
        .filter(([, value]) => value !== "")
        .map(([key, value]) => (
          <Box
            key={key}
            as="span"
            bg="blue.500"
            color="white"
            borderRadius="10px"
            p=".2em"
            fontSize=".9rem"
            mb=".5em"
            mr=".25em"
            textTransform="capitalize"
          >
            {typeof value === "boolean" ? "favourite" : value}
          </Box>
        ))}
    </Flex>
  );
}
