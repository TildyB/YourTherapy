import { useEffect, useState } from "react";

import axios from "axios";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "../../resources/event";

import styles from "./ClientDashboard.module.css";

import ClientAddTopic from "../ClientComponents/ClientAddTopic";
import Tasks from "../ClientComponents/Tasks";

const ClientDashboard = () => {
  const [client, setClient] = useState(null);
  const localizer = momentLocalizer(moment);


  useEffect(() => {
    const getClientDetails = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8004/api/client/getdetails",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setClient(response.data);
        console.log(response.data)
      } catch (error) {
        console.log(error);
      }
    };
    getClientDetails();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.leftSubContainer}>
        <div className={styles.yourPsychologist}>
          <h1>Az Ön pszichológusa</h1>
          {client && (
            <div className={styles.psychologist}>
              <div className={styles.psychologistName}>
                <h2>Neve: {client.therapist}</h2>
              </div>
              <div className={styles.psychologistEmail}>
                <p>Email-címe: {client.therapistEmail}</p>
              </div>
              <div className={styles.psychologistPhone}>
                <p>telefonszám:</p>
              </div>  
              <div className= {styles.psychologistFee}>
                <p>Óradíj: {client.therapistsFee} Ft</p>
              </div>
            </div>  
          )}
        </div>
        <div className={styles.clientHomework}>
            <h1>Kiadott házifeladatok</h1>
            {client && (
              <Tasks
                client={client}
              />
            )}
          </div>
         <div className={styles.clientAddTopic} > 
          <h1>Témajavaslat</h1>
          <ClientAddTopic />
        </div>
      </div>
      <div className={styles.rightSubContainer}>
      <div className={styles.calendarDiv}>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
            />

            </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
