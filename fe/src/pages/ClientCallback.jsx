import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import jwt_decode from "jwt-decode"

import axios from "axios"


const ClienCallback = () => {

    const navigate = useNavigate()
    const  {login} = useContext(UserContext)
    const [searchParams] = useSearchParams()
    const code = searchParams.get("code")
    useEffect(() => {
        const fetchToken = async () => {
            try{
                const response = await axios.post("http://localhost:8004/api/client/login", {code})
                const token = response.data
                const decoded = jwt_decode(token)
                const user = {
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture,
                }
                login(user, token)
                navigate("/clientdashboard")
            }catch(error){
                console.log(error)
                navigate("/")
            }
        }
        fetchToken()
    }, [])

    return(
        <div>
            <h1>ClientCallback</h1>
        </div>

    )
}
export default ClienCallback