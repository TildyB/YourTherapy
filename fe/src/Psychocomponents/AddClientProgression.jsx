import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  useDisclosure
} from "@chakra-ui/react";

const AddClientProgression = ({clientsub,newData,setNewData,progression,setProgression}) =>{

    const sendProgression = async () => {
        console.log(progression)
        const response = await axios.post(
          `http://localhost:8004/api/psychologist/clientprogression/${clientsub}`,
          {
            name: progression.name,
            percentages: progression.percentages,
          },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setProgression({
          name: "",
          percentages: "",
        });
        onClose();
        setNewData(!newData);
      };
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    return (
        <div>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Folyamat hozzáadása
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <label>Folyamat neve</label>
            <Input
              placeholder="jegyzet elnevezése"
                value={progression.name}
                onChange={(e) => setProgression({ ...progression, name: e.target.value })}
            />
            <label>Folyamat százaleka</label>
            <Input
              placeholder="jegyzet leirása"
              value={progression.percentages}
              onChange={(e) => setProgression({ ...progression, percentages: e.target.value })}   
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Kilépés
            </Button>
            <Button onClick={sendProgression} colorScheme="blue">
              Mentés
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </div>
    )
}

export default AddClientProgression