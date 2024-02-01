import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import View from "./View";

type PaginationProps = {
  setPagination: React.Dispatch<
    React.SetStateAction<{
      page: number;
      pages: number;
    }>
  >;
  pagination: { page: number; pages: number };
  isMobile: boolean;
};

export default function Pagination({
  setPagination,
  pagination,
  isMobile = false,
}: PaginationProps) {
  const { page, pages: totalPages } = pagination;

  const onNext = () => {
    if (page >= totalPages) return;
    setPagination({ ...pagination, page: page + 1 });
  };

  const onPrev = () => {
    if (page == 1) return;
    setPagination({ ...pagination, page: page - 1 });
  };

  const onLoadMore = () => (page === totalPages ? onPrev() : onNext());

  console.log("page: ", page);

  return (
    <Flex
      flexDir="row"
      justifyContent={"space-between"}
      alignItems="center"
      w="10.5em"
      m="1.5rem auto"
    >
      <View cond={isMobile}>
        <Flex>
          <Button
            onClick={onLoadMore}
            colorScheme="gray"
            m="1.5rem auto"
            _focus={{ outline: "none" }}
          >
            {page === totalPages ? "Load Less" : "Load More"}
          </Button>
        </Flex>
      </View>

      <View cond={!isMobile}>
        <IconButton
          aria-label="arrow-left"
          icon={<RiArrowLeftSLine size="22" color="black" />}
          onClick={onPrev}
          disabled={page === 1}
          variant="ghost"
          color={page == 1 ? "" : "accent.1"}
          isDisabled={page == 1 ? true : false}
        />

        <Box as="span" m="0 1em" color="accent.1" fontWeight="semibold">
          {page} / {totalPages}{" "}
        </Box>

        <IconButton
          aria-label="arrow-right"
          icon={<RiArrowRightSLine size="22" color="black" />}
          onClick={onNext}
          disabled={page === totalPages}
          variant="ghost"
          color={page >= totalPages ? "" : "accent.1"}
          isDisabled={page >= totalPages ? true : false}
        />
      </View>
    </Flex>
  );
}
