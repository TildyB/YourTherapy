import { Button } from "@chakra-ui/react";
import AddClientTask from "./AddClientTask";
import styles from "./ClientTasks.module.css";
import axios from "axios";

import { Tooltip } from '@chakra-ui/react'


const ClienTasks = ({client,clientsub,setNewData,newData}) => {

    const deleteTask = async (id) => {
        console.log(id)
        const response = await axios.delete(`http://localhost:8004/api/psychologist/deletetask/${clientsub}/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
        console.log(response)
        setNewData(!newData)
    }

    const tasks = client.tasks;
    return (
        <div>
            <div>
                {tasks.length > 0 ? tasks.map((task,i) =>
                    <div className={task.isUrgent ? styles.oneTaskImportant : styles.oneTask} key={i}>
                        <div className={styles.taskTitleDiv}>
                            <Tooltip label={task.description}>
                            {task.title}
                            </Tooltip>
                        </div>
                        <p>{task.issueddate.substring(0,10)}</p>
                        <Button onClick={()=>deleteTask(task._id)} colorScheme="red" size="sm">Törlés</Button>
                    </div>
                ) 
                : <p>Nincs házifeladat</p>}
            </div>
            <AddClientTask newData={newData} setNewData={setNewData} clientSub = {client.sub} />
        </div>
    )

}

export default ClienTasks;