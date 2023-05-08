import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";

import styles from "./ClientAddTopic.module.css";

import { Button, Input, Textarea } from "@chakra-ui/react";

const ClientAddTopic = () => {
  const { onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const closeModal = () => {
    console.log("close");
    onClose();
    setTitle("");
    setDescription("");
  };
  const sendTopic = async (func) => {
    func();
    try {
      const response = await axios.post(
        "http://localhost:8004/api/client/newtopic",
        {
          title,
          description,
          date: new Date(),
          isNewTopic: true,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p>A téma címe:</p>
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Téma címe"
      />
      <p>A téma rövid leírása:</p>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Here is a sample placeholder"
      />
      <div className={styles.allButtonDiv}>
        <Button colorScheme="blue" onClick={() => sendTopic(closeModal)}>
          Elküldöm
        </Button>
      </div>
    </div>
  );
};

export default ClientAddTopic;
