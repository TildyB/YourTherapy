import { useRef } from "react";
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
  useDisclosure,
} from "@chakra-ui/react";

const AddClientNotes = ({
  note,
  handleTitleChange,
  handleContentChange,
  sendNote,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  return (
    <div>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        Jegyzet hozzáadása
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
            <label>Jegyzet neve</label>
            <Input
              placeholder="jegyzet elnevezése"
              value={note.title}
              onChange={handleTitleChange}
            />
            <label>Jegyzet leírása</label>
            <Input
              placeholder="jegyzet leirása"
              value={note.description}
              onChange={handleContentChange}
            />
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Kilépés
            </Button>
            <Button onClick={() => sendNote(onClose)} colorScheme="blue">
              Mentés
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AddClientNotes;
