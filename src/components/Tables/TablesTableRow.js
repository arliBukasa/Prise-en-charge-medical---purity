import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  HStack,
  VStack,
  StackDivider,
  Tr,
  Icon,
  useColorModeValue,
  Box,
  Spacer,
  Divider,
  Circle,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { LuSyringe } from "react-icons/lu";
import request from 'superagent';
import {
  List,
  ListItem,
  ListIcon,
  UnorderedList,
} from '@chakra-ui/react'

import patient from "assets/img/avatars/patient.png";
import { MdCheckCircle } from "react-icons/md";
import React, { useEffect, useRef, useState } from "react";
import { PhoneIcon } from "@chakra-ui/icons";
import { SonIcon,ChildIcon} from "components/Icons/Icons";
import ModalPatient from "views/Dashboard/Patients/components/ModalAction";
import ModalAgentAction from "views/Dashboard/Patients/components/ModalAgentAction";
//import { useForm } from "@refinedev/react-hook-form";
function TablesTableRow(props) {
  //Etats
  const { name, genre,company,position, familly,id} = props;
  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");
  const { isOpen, onOpen, onClose } =useDisclosure();
  const [typemodal,setTypemodal]=useState("agent")
  const [idmodal,setidmodal]=useState(null)
  const initialRef = useRef(null)
  const finalRef = useRef(null)

  const [enfants,setEnfants]=useState({})

  // manipulation
  const getDependants =async (ids)=>{
      let res=[]
      let result={"name":null}
       useEffect(() => {
        request.post('/hr_soints/listdependants')
        .send({params:{rids:ids}})
        .end((err,res)=>{
          if (!err && res) {
            result= res.body; // Réponse du serveur
            setEnfants(result.result[0])
            console.log(`************************** ${ids}`)
            console.log(result.result[0])
            return result.result[0]
          } else {
            console.log("Erreur lors de la requête POST");
          }
        }
        )
       }, []);
      
      return result
    }
  function openModalAgent(){
    onOpen()
  }    
  function openModalDependant(id){
    onClose
    setTypemodal("dependant")
    if(id!=null){
      setidmodal(id)
    }
    onOpen()
  }

  //Affichage
  return (
    <>
    <Tr>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {id}
        </Text>
      </Td>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          <Avatar src={patient} w="50px" borderRadius="12px" me="18px" />
          <Flex direction="column">
            <Text
              fontSize="md"
              color={textColor}
              fontWeight="bold"
              minWidth="100%"
            >
              {name}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="bold">
              {company}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {position}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
        <VStack spacing={1}>  
        {familly.map((row) => {
                //let enf=getDependants(row[0])
                return (  
                  <>                           
                    <Box flex={1} key={row[0]}>
                      <HStack divider={<StackDivider borderColor='gray.200' />}>
                      <Badge
                        variant='outline'
                        colorScheme={row === "Contrat Encours" ? "teal" : 'teal'}
                        color={status === "Contrat Encours" ? "white" : colorStatus}
                        fontSize="13px"
                        p="3px 10px"
                        borderRadius="8px"
                      >  
                        <Text color={'teal'}>{row[0]}</Text>  
                      </Badge>
                      
                      <Box w='230px'>
                        <HStack>
                        <Box w='190px'>
                          <Text color={'teal'}>{row[1][0]}</Text>
                          </Box>
                          <Button rightIcon={<LuSyringe /> }  variant='outline' size='xs' onClick={()=>openModalDependant(row[0])}>
                          <Text fontSize='xs' >{"Soigner"}</Text>
                          </Button>
                        </HStack>
                      </Box>
                      <Box w='75px'>
                      <Text color={'teal'}>{row[1][1]}</Text>
                      </Box>
                      <Avatar src={SonIcon} w="15px" h="15px" borderRadius="12px" />
                      <Divider orientation="vertical"/>
                      </HStack>
                      
                    </Box>
                    
                  </> 
                
                )})}
        </VStack>
          </Flex>
      </Td>
      <Td>
        <Flex direction="column">
          {
            <Box flex={1}>
            <Text fontSize="sm" color="gray.400" fontWeight="bold">
            {position}
            </Text>
            </Box>
          }                
        </Flex>
      </Td>
      <Td>
        <Badge
          bg={status === "Contrat Encours" ? "green.400" : bgStatus}
          color={status === "Contrat Encours" ? "white" : colorStatus}
          fontSize="16px"
          p="3px 10px"
          borderRadius="8px"
        >
          {genre}
          
        </Badge>
      </Td>
      
      <Td>

          <Button leftIcon={<LuSyringe /> } colorScheme='teal' variant='solid' size='sm' onClick={()=>openModalAgent()}>
            Soigner
          </Button>
      </Td>
    </Tr>
    <ModalAgentAction 
      id={id}
      idmodal={idmodal}
      typemodal={typemodal}
      name={name}
      genre={genre}
      company={company}
      initialRef={initialRef}
      finalRef={finalRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      /> 
      
    </>
  );
}

export default TablesTableRow;
