import { useSearchParams } from "react-router-dom"
import { useEffect,useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom"


const PsychoCallback = () => {

    const navigate = useNavigate()
    const  {login} = useContext(UserContext)
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code")
    
    useEffect(() => {
        const fetchToken = async () => {
        try {
            const response = await axios.post("http://localhost:8004/api/psychologist/login", {code})
            const token = response.data
            const decoded = jwt_decode(token)
            const user = {
                name: decoded.family_name + " " + decoded.given_name,
                email: decoded.email,
                picture: decoded.picture,
              }
            login(user, token)
            navigate("/psychoallclients")
        } catch (error) {
            console.log(error)
            navigate("/")
        }
        }
        fetchToken()
    }, [])

    return(
        <div>
            <h1>PsychoCallback</h1>
        </div>

    )
}
export default PsychoCallback