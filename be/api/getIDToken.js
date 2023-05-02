const axios = require("axios");
const { z } = require("zod");



const Response = z.object({
    expires_in: z.number(),
    access_token: z.string(),
    scope: z.string(),
    token_type: z.literal("Bearer"),
    id_token: z.string(),
    refresh_token: z.string().optional()
    // ide jon a refres token mert kulonben nincs meg
})



const client_id = process.env.CLIENT_ID
const client_secret = process.env.CLIENT_SECRET
const grant_type= "authorization_code"
const url = "https://oauth2.googleapis.com/token"

 const getIDToken = async (code,redirect_uri)=> {

    try {
        const resp = await axios.post("https://oauth2.googleapis.com/token", {
            grant_type:grant_type,
            code:code,
            client_id:client_id,
            client_secret:client_secret,
            redirect_uri:redirect_uri
        })

        const result = Response.safeParse(resp.data)

        if (!result.success) {
            console.log("ez itt a hiba?")
            return null      
        }
        console.log("ez itt a result",result.data);
        return result.data

    } catch (err) {
        console.log(err);
        
        return null
    }
}

module.exports = getIDToken

