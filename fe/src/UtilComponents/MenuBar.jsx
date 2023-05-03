import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import styles from "./MenuBar.module.css";
import { Button } from "@chakra-ui/react";

const MenuBar = () => {
  const { user,isLoggedIn,logout } = useContext(UserContext);
  console.log(user, "user");
  return (
    <div className={styles.menuBarMainDiv}>
      <h1>
        <span className={styles.your}>Your</span> Therapy
      </h1>
      <div className={styles.menuRightDiv}>
        <h2>
          Üdvözöllek {user && <span className={styles.menuName}>{user.name}</span>}
        </h2>
        {isLoggedIn &&<Button onClick={logout} colorScheme="teal" size="xs">
          Kijelentkezés
        </Button>}
      </div>
    </div>
  );
};

export default MenuBar;
