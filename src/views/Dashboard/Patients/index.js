// Chakra imports
import { Flex, Spinner } from "@chakra-ui/react";
import request from 'superagent';
import{Text,Progress} from "@chakra-ui/react";
import React,{ useState, useEffect } from "react";
import ListePatients from "./components/ListePatients";
import { tablesTableData, dashboardTableData } from "variables/general";
import { list_employes } from "variables/employes";
function Patients() {
    // Etatts
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   
    // manipulation
      useEffect(() => {
        //process.env.REACT_APP_BACKEND_URL
        request.get('/hr_soints/dependantes')
        .then((response) => {
          setData(response.body);
          console.log("=================== onlinedata============")
          console.log(data)
          setLoading(false)
        })
        .catch((erreur) => {
          console.error('Erreur lors de la récupération des données :', erreur);
          setError(erreur)
        });
      }, []);

    //affichage
   
    if (loading) {
      console.log("loading...");
      return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
          <Progress size="xs" hasStripe isIndeterminate/>
          <p>Chargement... 
          <Spinner
            thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='blue.500'
            size='sm'
          /></p>
          </Flex>);
    }
    if (error) {
      console.log(error);
      return (
          <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
              <Text>Erreur : {error}</Text>
    
          </Flex>
      ) ;
    } 

  return (
    <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
      
      <ListePatients
      title={"Liste des Patients"}
      captions={[ "Responsable","Patient", "Status de l'employé", "Date d'Engagement", ""]}
      // data={tablesTableData}
      data={data}
      />
    </Flex>
  );
}

export default Patients;