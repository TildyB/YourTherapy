import ClientLoginButton from "../ClientComponents/ClientLoginButton";
import PsychoLoginButton from "../Psychocomponents/PsychoLoginButton";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.homeMainDiv}>
      <div className={styles.middleDiv}>
        <div className={styles.upperTextDiv}>
          <h1><span className={styles.your}>Your</span> Therapy</h1>
          <h2>Kérlek jelentkezz be</h2>
        </div>
        <div className={styles.loginButtonsDiv}>
          <ClientLoginButton />
          <PsychoLoginButton />
        </div>
      </div>
    </div>
  );
};

export default Home;
