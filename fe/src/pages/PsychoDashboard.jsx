import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import styles from "./PsychoDashboard.module.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useDisclosure } from "@chakra-ui/react";

import { Calendar, momentLocalizer } from "react-big-calendar";
import NoteAccordition from "../Psychocomponents/NoteAccordition";
import ClientProgress from "../Psychocomponents/ClientProgression";
import AddClientNotes from "../Psychocomponents/AddClientNotes";
import ClientCreateEvent from "../Psychocomponents/ClientCreateEvent";
import ClienTasks from "../Psychocomponents/ClientTasks";

import moment from "moment";
import events from "../../resources/event";

const PsychoDashboard = () => {
  const { clientsub } = useContext(UserContext);

  const [client, setClient] = useState(null);
  const [newData, setNewData] = useState(false);
  const [note, setNote] = useState({ title: "", description: "" });
  const [progression, setProgression] = useState({ name: "", percentages: "" });
  const localizer = momentLocalizer(moment);
  const [loading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);

  const btnRef = useRef();
  const { onClose } = useDisclosure();
  useEffect(() => {
    const getClientDetails = async () => {
      console.log(clientsub);
      const response = await axios.get(
        `http://localhost:8004/api/psychologist/${clientsub}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      setClient(response.data);
    };
    getClientDetails();
    setIsLoading(false);
  }, [newData]);

  useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get(
        'http://localhost:8004/api/psychologist/getevents',
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data);
      setEvents(response.data);
    };
    getEvents();
  }, []);



  const sendNote = async () => {
    console.log("sendnote", note, "clientsub", clientsub);
    const response = await axios.post(
      `http://localhost:8004/api/psychologist/addnote/${clientsub}`,
      {
        title: note.title,
        description: note.description,
      },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setNote({
      title: "",
      description: "",
    });
    onClose();
    setNewData(!newData);
  };

  const handleTitleChange = (event) => {
    setNote({ ...note, title: event.target.value });
  };

  const handleContentChange = (event) => {
    setNote({ ...note, description: event.target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSubContainer}>
        <div className={styles.clientNotes}>
          <h1>Felírt jegyzetek</h1>
          <div className={styles.clientNotesAccorditionDiv}>
            {client != null && client.notes != undefined ? (
              client.notes.map((note, i) => (
                <NoteAccordition key={i} note={note} />
              ))
            ) : (
              <p>Nincs jegyzet</p>
            )}
          </div>
          <AddClientNotes
            note={note}
            handleTitleChange={handleTitleChange}
            handleContentChange={handleContentChange}
            sendNote={sendNote}
          />
        </div>
        <div className={styles.clientHomework}>
          <h1>Kiadott házifeladatok</h1>
          {client && (
            <ClienTasks
              newData={newData}
              setNewData={setNewData}
              client={client}
              clientsub={clientsub}
            />
          )}
        </div>
        <div className={styles.clientProgress}>
          <h1>Meghatározott folyamatok</h1>
          <ClientProgress
            newData={newData}
            setNewData={setNewData}
            clientsub={clientsub}
            client={client}
            progression={progression}
            setProgression={setProgression}
          />
        </div>
        <div className={styles.clientDocuments}>
          <h1>Dokkumentumok hozzáadása</h1>
        </div>
      </div>
      <div className={styles.rightSubContainer}>
        <h1>Naptár</h1>
        <ClientCreateEvent />
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

export default PsychoDashboard;
