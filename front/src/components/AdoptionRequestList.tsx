import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Table, createColumn } from "react-chakra-pagination";
import { CgOptions } from "react-icons/cg";
import { FiUser } from "react-icons/fi";
import fetechRequest from "../lib/api";
import useAction from "../store/useActionStore";
import CustomModal from "./CustomModal";

interface IAdoptionRequestList {
  isOpen: boolean;
  onClose: () => void;
}

type requestType = {
  id: number;
  picture: string;
  name: string
  userId: number
  createdAt: string
}


const AdoptionRequestList = ({ isOpen, onClose }: IAdoptionRequestList) => {
  const [adoptionsReq, setAdoptionReq] = useState({
    data: [],
    isLoading: false,
  });

  const cat = useAction((state) => state.cat);

  const onAcceptAdoption = async (userId: number) => {
    // actions.setAdoptionAccept(true);
    // call api
    console.log(cat.id, userId);
    await fetechRequest(
      "GET",
      `cat/adopt/${cat.id}/user/${userId}`
    );
  };
  const onDenyAdoption = async (userId: number) => {
    // actions.setAdoptionDeny(true);
    // call api
    console.log(cat.id, userId);
    await fetechRequest(
      "DELETE",
      `cat/adopt/${cat.id}/user/${userId}`
    );
  };
  const onLoadAdoptionRequets = async (page = 1) => {
    setAdoptionReq({ ...adoptionsReq, isLoading: true });
    const { data } = await fetechRequest(
      "GET",
      `cat/adopt/${cat.id}?page=${page}&size=2`
    );
    const newData = data.map((d:requestType) => {
      const dateTime = new Date(d.createdAt);
      const date = dateTime.toLocaleDateString()
      const time = dateTime.toLocaleTimeString()
      return {
        ...d, 
        picture:
        "https://robohash.org/undevelitdolor.png?size=50x50&amp;set=set1",
        createdAt: date + " " + time
      }
    })
    console.log('newData => ', newData)
    setAdoptionReq({ data: newData, isLoading: false });
  };

  const tableData = adoptionsReq.data.map((req: requestType) => ({
    name: (
      <Flex align="center">
        <Avatar name={req.name} src={req.picture} size="md" mr="4" />
        <Text fontSize=".9rem">{req.name}</Text>
      </Flex>
    ),
    date: <Text fontSize=".9rem">{req.createdAt}</Text>,
    action: (
      <Menu>
        <MenuButton as={IconButton} icon={<CgOptions />}></MenuButton>
        <MenuList>
          <MenuItem onClick={() => onDenyAdoption(req.userId)}>Deny</MenuItem>
          <MenuItem onClick={() => onAcceptAdoption(req.userId)}>Accept</MenuItem>
        </MenuList>
      </Menu>
    ),
  }));

  const columnHelper = createColumn<(typeof tableData)[0]>();
  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("date", {
      cell: (info) => info.getValue(),
      header: "Date",
    }),
    columnHelper.accessor("action", {
      cell: (info) => info.getValue(),
      header: "Actions",
    }),
  ];

  useEffect(() => {
    onLoadAdoptionRequets();
  }, []);

  const Body = (
    <>
      {adoptionsReq.isLoading ? (
        <Spinner color="brown" thickness="4px" speed="0.65s" size="xl" />
      ) : (
        <Table
          colorScheme="brown"
          emptyData={{
            icon: FiUser,
            text: "Aucune requête d'adoption pour ce chat !",
          }}
          totalRegisters={12}
          onPageChange={(p) => console.log(p)}
          columns={columns}
          data={tableData}
        />
      )}
    </>
  );

  return (
    <CustomModal
      header="Adoption List"
      isOpen={isOpen}
      onClose={onClose}
      body={Body}
      size={"md"}
    />
  );
};

export default AdoptionRequestList;
