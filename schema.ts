/* const task ={
    deadline: Date,
    title: String!,
    description: String!,
}
const topicSuggestion ={
    deadline: Date,
    title: String!,
    description: String!,
}

const Client ={
    id: ID!,
    name: String!,
    email: String!,
    phone: String!,
    address: String!,
    createdAt: String!,
    Invoice: [Invoice!],
    Documents: [Document!],
    tasks: [task],
    topicSuggestions: [topicSuggestion!],
    occasions: Number!,
    therapist: String,
    notes: String!,
    progressions:[progression!],   
}

const progression ={
    name: String!,
    percentages: Number!,
    startDate: Date!,   
}


const psychologist ={
    id: ID!,
    name: String!,
    email: String!,
    phone: String!,
    oradij: Number!,
    Clients: [Client],
} */
/**
    Endpoints
    
    1. Create a client
    api/client/create
    api/client/login
    api/client/getDetailedData
    api/client/update
    api/client/:id/suggestTopic

    2. Create a psychologist
    Compassba vinni fel a pszichologusokat, (ergo nincs regisztracio)

    api/psychologist/login (leellenorzni h fent e a DB-ben ha nincs akkor no JWT)
    api/psychologist/update
    api/psychologist/me/clients
    api/psychologist/me/clients/:id !!!!!!!!
*/
