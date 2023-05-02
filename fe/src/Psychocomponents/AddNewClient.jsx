import {useState} from "react";
import {
    Button,
    Input,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import axios from "axios";

const AddNewClient = () => {
    const [email, setEmail] = useState("");
    console.log(email)
    const sendNewClientEmail = async() => {
        const response = await axios.post("http://localhost:8004/api/psychologist/addclientemail",
        {email: email},
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        console.log(response)
    }
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
            <Input placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Button onClick={sendNewClientEmail}>Küldés</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default AddNewClient;
