import { Progress, Button,IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AddIcon,MinusIcon } from '@chakra-ui/icons'
import axios from "axios";

import styles from "./ClientProgression.module.css";

const ClientProgressionButtons = ({setNewData,newData,id,percentage,clientsub}) =>{
    const [newprogression, setNewProgression] = useState(Number(percentage))
    const [progressionId, setProgressionId] = useState(id)
    const [minusDisable, setminusDisable] = useState(false)
    const [plusDisable, setplusDisable] = useState(false)

    useEffect(() => {
        if(newprogression <=0){
            setminusDisable(true)
        }else {
            setminusDisable(false)
        }
        if(newprogression >=100){
            setplusDisable(true)
        }else {
            setplusDisable(false)
            
        }

        const sendProgression = async () => {
          const response = await axios.put(
            `http://localhost:8004/api/psychologist/dicreaseprogression/${clientsub}`,
            {
              percentages: newprogression,
              id: progressionId,
            },
            {
              headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            }
          );
        };
        sendProgression();
        setNewData(!newData);
      }, [newprogression]);
  
    const increaseProgression = async(progression,id) => {

      setNewProgression(newprogression + 10);
      setProgressionId(id)
    }
    const decreaseProgression = async(progression,id) => {

        setNewProgression(newprogression - 10);
        setProgressionId(id)
      }

    return(
        <div className={styles.oneProgressionDivButtons}>
            <IconButton isDisabled={plusDisable}  onClick={() =>increaseProgression(percentage,id)} size="xs" aria-label='Add to friends' icon={<AddIcon />} />
            <IconButton isDisabled={minusDisable} onClick={() =>decreaseProgression(percentage,id)} size="xs" aria-label='Add to friends' icon={<MinusIcon />} />
      </div>
    )
}

export default ClientProgressionButtons;