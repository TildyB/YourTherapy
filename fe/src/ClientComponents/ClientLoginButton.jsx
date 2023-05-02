import styles from "./ClientLoginButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const ClientLoginButton = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const googleClientId =
    "497486426720-n5fl050qpmvf91sr8usdadqfroo56bb7.apps.googleusercontent.com";
  const redirectUri = "http://localhost:5173/clientcallback";
  const scope =
    "openid%20profile%20email%20https://www.googleapis.com/auth/calendar";
  const prompt = "consent";
  const googleUrl = `${rootUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=${prompt}&access_type=offline`;

  return (
    
      <a href={googleUrl} className={styles.clientLoginDiv}>
    <div className={styles.clientLoginInnerDiv}>
      <FontAwesomeIcon icon={faUser} style={{ fontSize: 100}} />
       Client Login
    </div>
       </a>   
    
  );
};

export default ClientLoginButton;
