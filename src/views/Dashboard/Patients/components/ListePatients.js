// Chakra imports
import {
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
  } from "@chakra-ui/react";
  import {VariableSizeList} from "react-window";
  import AutoSizer from "react-virtualized-auto-sizer";
  import {MdCheckCircle} from 'react-icons/md';
  // Custom components
  import Card from "components/Card/Card.js";
  import CardBody from "components/Card/CardBody.js";
  import CardHeader from "components/Card/CardHeader.js";

  import React from "react";
  import DataTables from "components/DataTables/components/DataTables";
  // import { DataTable } from "./DataTable";
  
  const ListePatients = ({ title, captions, data }) => {
    const textColor = useColorModeValue("gray.700", "white");
    const columnsData1 = [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "PATIENT",
        accessor: "name",
      },
      {
        Header: "DEPENDANT(E)S",
        accessor: "familly",
      },
      {
        Header: "POSITION",
        accessor: "position",
      },
      {
        Header: "GENRE",
        accessor: "genre",
      },
      {
        Header: "COMPANY",
        accessor: "company",
      },
    ]
    console.log("========================== les tables data ================")
    console.log(columnsData1)
    console.log(data)

    return (
      
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p='6px 0px 22px 0px'>
          <Text fontSize='xl' color={textColor} fontWeight='bold'>
            {title}
          </Text>
        </CardHeader>  
        <CardBody>
          <DataTables  tableData={data} columnsData={columnsData1} />
        </CardBody>
      </Card>
    );
  };
  
  export default ListePatients;