import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./PsychoAllClients.module.css";
import { Select } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import AddNewClient from "../Psychocomponents/AddNewClient";

const PsychoAllClients = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState(null);
  const [email, setEmail] = useState("");

  const {clientSub, setClientsub } = useContext(UserContext);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await axios.get(
        "http://localhost:8004/api/psychologist/allclients"
      );
      setClients(response.data);
    };
    fetchClients();
  }, [email]);

  const getClientDetails = (e) => {
    setClientsub(e.target.value);
    localStorage.setItem("clientSub", e.target.value);
  };
  const changeRoute = () => {
    navigate("/psychodashboard");
  };

  return (
    <div className={styles.psychoAllClients}>
      <div className={styles.allClientsInside}>
        <h1 >
          Kérlek válaszd ki a kliens nevét:
        </h1>
        <div className={styles.allClientInput}>
          <Select placeholder="Select option" onChange={getClientDetails}>
            {clients !== null ? (
              clients.map((client) => {
                return (
                  <option key={client.email} value={client.sub}>
                    {client.name} email: {client.email}
                  </option>
                );
              })
            ) : (
              <option value="option1">Loading...</option>
            )}
          </Select>
        </div>
        <div className={styles.allClientButtons}>
          <Button onClick={changeRoute} colorScheme="blue">
            Tovább
          </Button>
          <AddNewClient setEmail={setEmail} email={email} />
        </div>
      </div>
    </div>
  );
};

export default PsychoAllClients;
