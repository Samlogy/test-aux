import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

import usePagination from "../lib/hooks/usePagination";
import { View } from "./";

const DOTS = "...";

interface IPagination {
  totalCount: number;
  siblingCount?: number;
  onPageChange: any;
  currentPage: number;
  pageSize: number;
  isMobile?: boolean;
}

export default function Pagination({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  isMobile,
}: IPagination) {
  const paginate = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginate.range.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(1);
  };
  return (
    <>
      <View cond={isMobile}>
        <Flex>
          <Button
            onClick={
              currentPage === paginate.lastPage
                ? () => onPrevious()
                : () => onNext()
            }
            colorScheme="gray"
            m="1.5rem auto"
            _focus={{ outline: "none" }}
          >
            {currentPage === paginate.lastPage ? "Load Less" : "Load More"}
          </Button>
        </Flex>
      </View>
      <View cond={!isMobile}>
        <Flex
          flexDir="row"
          justifyContent={"space-between"}
          w="18em"
          m="1.5rem auto"
        >
          <IconButton
            aria-label="arrow-left"
            icon={<RiArrowLeftSLine size={22} color="black" />}
            onClick={onPrevious}
            disabled={currentPage === paginate.firstPage}
            colorScheme="gray"
            variant="ghost"
          />
          {paginate.range.map((pageNumber: number | string, idx: number) => {
            if (pageNumber === DOTS) {
              return <Box as="span">&#8230;</Box>;
            }

            return (
              <Button
                key={idx}
                colorScheme="gray"
                variant="ghost"
                bg={currentPage === pageNumber ? "blue.500" : ""}
                color={currentPage === pageNumber ? "white" : ""}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </Button>
            );
          })}
          <IconButton
            aria-label="arrow-right"
            icon={<RiArrowRightSLine size={22} color="black" />}
            onClick={onNext}
            disabled={paginate.lastPage === currentPage}
            colorScheme="gray"
            variant="ghost"
          />
        </Flex>
      </View>
    </>
  );
}
