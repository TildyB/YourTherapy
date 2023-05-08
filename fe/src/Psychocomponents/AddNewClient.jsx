import axios from "axios";
import {
  Button,
  Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useToast,
} from "@chakra-ui/react";

const AddNewClient = ({ setEmail, email }) => {
  const toast = useToast();

  const sendNewClientEmail = async () => {
    const response = await axios.post(
      "http://localhost:8004/api/psychologist/addclientemail",
      { email: email },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    console.log(response);
    if (response.data === "client already exist") {
      toast({
        title: "Nem tudja elmenteni a klienst.",
        description: "Ez a kliens már létezik.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: "Sikeres mentése",
        description: "Elmentette a klienst.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Új Kliens hozzáadása</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Add meg az új kliens email címét:</PopoverHeader>
        <PopoverBody>
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={sendNewClientEmail}>Küldés</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddNewClient;
