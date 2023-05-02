import styles from "./PsychoLoginButton.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCoffee} from "@fortawesome/free-solid-svg-icons";
import {faUsers} from "@fortawesome/free-solid-svg-icons";

const LoginButton = () => {

  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth"
  const googleClientId = "497486426720-n5fl050qpmvf91sr8usdadqfroo56bb7.apps.googleusercontent.com"
  const redirectUri = "http://localhost:5173/psychocallback"
  const scope = "openid%20profile%20email%20https://www.googleapis.com/auth/calendar"
  const prompt = "consent"
  const googleUrl = `${rootUrl}?client_id=${googleClientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&prompt=${prompt}&access_type=offline`
  
  return (
    <a href={googleUrl} className={styles.clientLoginDiv}>
    <div className={styles.clientLoginInnerDiv}>
      <FontAwesomeIcon icon={faUsers} style={{ fontSize: 100}}  />
       Psychologist <br /> Login
    </div>
       </a>   
    
  )
}

export default LoginButton