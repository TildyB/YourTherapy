import { Progress} from "@chakra-ui/react";
import AddClientProgression from "./AddClientProgression";
import ClientProgressionButtons from "./ClientProgressionButtons";
import styles from "./ClientProgression.module.css";

const ClientProgress = ({
  client,
  clientsub,
  newData,
  setNewData,
  progression,
  setProgression,
}) => {
  return (
    <div>
      {client != null && client.progressions.length > 0 ? (
        client.progressions.map((progression, i) => (
          <div className={styles.oneProgressionDiv} key={i}>
            <div className={styles.oneProgressionDivLeft}>
              <h2>{progression.name}</h2>
              <Progress
                bgColor="#CBD5E0"
                isAnimated
                hasStripe
                value={progression.percentages}
                colorScheme="green"
              />
            </div>
            <div className={styles.oneProgressionDivRight}>
              <h2>{progression.percentages}%</h2>
              <ClientProgressionButtons
                setNewData={setNewData}
                newData={newData}
                clientsub={clientsub}
                id={progression._id}
                percentage={progression.percentages}
              />
            </div>
          </div>
        ))
      ) : (
        <p>Nincs folyamat</p>
      )}
      <AddClientProgression
        setNewData={setNewData}
        clientsub={clientsub}
        progression={progression}
        setProgression={setProgression}
      />
    </div>
  );
};

export default ClientProgress;
