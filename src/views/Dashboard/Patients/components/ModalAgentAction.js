import{
    Textarea,
    Modal,ModalBody,ModalBodyProps,ModalHeader,
    ModalFooter,ModalOverlay,ModalContent,ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure,Tabs, TabList, TabPanels, Tab, TabPanel,Spacer,Flex,Button, } from '@chakra-ui/react'
import {FormControl,FormControlOptions,FormLabel,FormLabelProps,
    Input} from '@chakra-ui/react'
import React, { useEffect, useRef, useState,  } from "react";
import TablesTableRow from "components/Tables/TablesTableRow";
import request from 'superagent';

function ModalAgentAction (props){
    const {name, genre,id,company,idmodal,typemodal} = props
    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const { isOpen, onOpen,onClose} =props;
    const [value,setValue]=useState()
    //const  {onClose} =useDisclosure();


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
     //Afficahage
    

  if (typemodal==="agent"){
    onClose
    return (
        <>
        <Modal
        size="4xl"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Prise en charge de l'agent</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Noms Complet</FormLabel>
                <Input  placeholder='First name' value={name} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Affectation</FormLabel>
                <Input ref={initialRef} placeholder='Companie' value={value} />
            </FormControl>
            <Spacer/>
            <Flex>
            <Tabs>
                <TabList>
                <Tab>Consultation</Tab>
                <Tab>Examens</Tab>
                <Tab>Intervention churigicale</Tab>
                </TabList>

                <TabPanels>
                <TabPanel>
                    <p>Examens!</p>
                    <Textarea
                    value={""}
                    onChange={{}}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    />
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
                </TabPanels>
            </Tabs>
            </Flex>
            </ModalBody>

            <ModalFooter>
            <Button colorScheme={"teal"} mr={3} onClick={getDependants}>
                Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>           
    </>
    )
  } else{
    onClose
    return (
        <>
        <Modal
        size="4xl"
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        >
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Prise en charge du dependant</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
            <FormControl>
                <FormLabel>Noms Complet</FormLabel>
                <Input  placeholder='First name' value={name} />
            </FormControl>

            <FormControl mt={4}>
                <FormLabel>Affectation</FormLabel>
                <Input ref={initialRef} placeholder='Companie' value={value} />
            </FormControl>
            <Spacer/>
            <Flex>
            <Tabs>
                <TabList>
                <Tab>Consultation</Tab>
                <Tab>Examens</Tab>
                <Tab>Intervention churigicale</Tab>
                </TabList>

                <TabPanels>
                <TabPanel>
                    <p>Examens!</p>
                    <Textarea
                    value={""}
                    onChange={{}}
                    placeholder='Here is a sample placeholder'
                    size='sm'
                    />
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
                </TabPanels>
            </Tabs>
            </Flex>
            </ModalBody>

            <ModalFooter>
            <Button colorScheme={"teal"} mr={3} onClick={getDependants}>
                Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
        </ModalContent>
        </Modal>           
    </>
    )
}
}
export default ModalAgentAction