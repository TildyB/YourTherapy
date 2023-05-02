import { Button } from "@chakra-ui/react";

import styles from "./Tasks.module.css";
import axios from "axios";

import { Tooltip } from '@chakra-ui/react'


const TopicSuggestion = () => {

    const deleteTask = async (id) => {
        console.log(id)
        const response = await axios.delete(`http://localhost:8004/api/psychologist/deletetask/${clientsub}`,{
            id: id
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        )
    }

    return (
        <div>
        </div>
    )

}

export default TopicSuggestion;