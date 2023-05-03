import { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

const AddClientTask = ({setNewData,newData}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { clientsub } = useContext(UserContext);

  const [task, setTask] = useState({
    title: "",
    description: "",
    issuedate: new Date(),
    deadline: "",
    isDone: false,
    isUrgent: false,
  });

  const sendTask = async () => {
    console.log(task)
    const response = await axios.post(
      `http://localhost:8004/api/psychologist/addtask/${clientsub}`,
      task,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    setNewData(!newData);
    onClose();

  };
  return (
    <div>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Házifeladat hozzáadása
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="top"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <label>Házifeladat neve</label>
            <Input placeholder="házifeladat elnevezése" value={task.title} onChange={e =>setTask({...task,title: e.target.value})} />
            <label>Házifeladat leírása</label>
            <Input placeholder="házifeladat leirása" value={task.description} onChange={e =>setTask({...task,description: e.target.value})} />
            <label>Házifeladat határideje</label>
            <Input
              placeholder="A házi feladat határideje"
              size="md"
              type="datetime-local"
              value={task.deadline}
              onChange={e =>setTask({...task,deadline: e.target.value})}
            />
            <Select placeholder="Kiemelten fontos?" onChange={e => setTask({...task,isUrgent:e.target.value==="true"})}>
              <option value="true">Igen</option>
              <option value="false">Nem</option>
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Kilépés
            </Button>
            <Button onClick={sendTask} colorScheme="blue">
              Mentés
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddClientTask;
