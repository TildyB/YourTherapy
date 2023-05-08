import styles from "./Tasks.module.css";
import { Tooltip } from "@chakra-ui/react";

const Tasks = ({ client}) => {

  const tasks = client.tasks;
  return (
    <div>
      <div>
        {tasks.length > 0 ? (
          tasks.map((task, i) => (
            <div
              className={
                task.isUrgent ? styles.oneTaskImportant : styles.oneTask
              }
              key={i}
            >
              <div className={styles.taskTitleDiv}>
                <Tooltip label={task.description}>{task.title}</Tooltip>
              </div>
              <p>{task.issueddate.substring(0, 10)}</p>
            </div>
          ))
        ) : (
          <p>Nincs házifeladat</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
