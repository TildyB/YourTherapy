
const dotenv  = require("dotenv")
dotenv.config({ path: ".env.test" })

const supertest = require("supertest")
const app = require("../app")
const Psychologist = require("../models/PsychoSchema")
const Clients = require("../models/ClientSchema")
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");

let mongoDb;

const connect = async () => {
  mongoDb = await MongoMemoryServer.create();
  const uri = mongoDb.getUri();
  mongoose.set('strictQuery', false);
  await mongoose.connect(uri);
};

const clearData = async () => {
  await mongoose.connection.db.dropDatabase();
};

 const disconnect = async () => {
  await mongoose.disconnect();
  await mongoDb.stop();
};


const testApp = supertest(app)


describe("GET /api/psychologist/allclients", () => {
  beforeAll(connect)
  afterAll(disconnect)
  afterEach(clearData)
  it("should return the  list of the clients", async () => {
    // given
    const client = new Clients({
      sub: "116345710901692365892",
      name: "Teszt Elek",
      email:"teszt@teszt.com",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: {date:"2021-02-08T00:00:00.000Z"},
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
    await client.save();
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"
    // when
    const res = await testApp
    .get("/api/psychologist/allclients")
    .set("Authorization", `Bearer ${token}`)
    // then
    expect(res.status).toBe(200)
  })
})


describe("POST /addclientemail", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it("should add a new client email to the psychologist's clients list", async () => {
    // Create a test psychologist
    const psychologist = new Psychologist({
      email: "balazs.tildy@gmail.com",
    });
    await psychologist.save();

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .post("/api/psychologist/addclientemail")
      .set("Authorization", `Bearer ${token}`)
      .send({ email: "test@test.com" });

    // Check that the response is successful
    expect(res.text).toBe("client added");

    // Check that the client email was added to the psychologist's clients list
    const updatedPsychologist = await Psychologist.findOne({ email: "balazs.tildy@gmail.com" });
    expect(updatedPsychologist.clients.length).toBe(1);
    expect(updatedPsychologist.clients[0].email).toBe("test@test.com");
  });
});

describe("POST /addnote/:sub", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it('should add a note to the client and return the updated client', async () => {
    // Create a test psychologist
    const client = new Clients({
      sub: "116345710901692365892",
      notes: [
        {
          title: "proba",
          description: "proba",
          issuedate: "2021-02-08T00:00:00.000Z"
        }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
    await client.save();
    const note = {
      title: "proba",
      description: "proba",
      issuedate: "2021-02-08T00:00:00.000Z"
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .post(`/api/psychologist/addnote/${client.sub}`)
      .set("Authorization", `Bearer ${token}`)
      .send(note);

    // Check that the response is successful
    expect(res.body).toEqual({
      sub: "116345710901692365892",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: "2021-02-08T00:00:00.000Z",
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
  });
});
describe("GET /:sub", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it('should add a task from the client', async () => {
    // Create a test psychologist
    const client = new Clients({
      sub: "116345710901692365892",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: {date:"2021-02-08T00:00:00.000Z"},
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
    await client.save();

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .get(`/api/psychologist/${client.sub}`)
      .set("Authorization", `Bearer ${token}`)

    // Check that the response is successful
    expect(res.status).toBe(200);
  });
});

describe("POST /clientprogression/:sub", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it('should add a task from the client', async () => {
    // Create a test psychologist
    const client = new Clients({
      sub: "116345710901692365892",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: {date:"2021-02-08T00:00:00.000Z"},
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
    await client.save();
    const newData = {
      name: "Edzés",
      percentages: 50,
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .post(`/api/psychologist/addtask/${client.sub}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData);

    // Check that the response is successful
    expect(res.status).toBe(200);
  });
});

describe("PUT '/dicreaseprogression/:sub'", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it('should add a note to the client and return the updated client', async () => {
    // Create a test psychologist
    const client = new Clients({
      sub: "116345710901692365892",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: {date:"2021-02-08T00:00:00.000Z"},
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [
        {
          name: "Edzés",
          percentages: 50,
        }
      ],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
    await client.save();
    const newData = {
      percentages: 60,
      id: client.progressions[0]._id
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .put(`/api/psychologist/dicreaseprogression/${client.sub}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData);

    // Check that the response is successful
    expect(res.status).toBe(200);
  });
});

describe("POST /addtask/:sub", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it('should add a task from the client', async () => {
    // Create a test psychologist
    const client = new Clients({
      sub: "116345710901692365892",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: {date:"2021-02-08T00:00:00.000Z"},
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [],
      topicSuggestions: [],
    });
    await client.save();
    const newData =       {
      title:"proba",
      description:"proba",
      deadline: "2021-02-08T00:00:00.000Z",
      isDone: false,
      isUrgent: false,
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .post(`/api/psychologist/addtask/${client.sub}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData);

    // Check that the response is successful
    expect(res.status).toBe(200);
  });
});

describe("DELETE /deletetask/:sub/:id", () => {
  beforeAll(connect)
  afterEach(clearData)
  afterAll(disconnect)
  it('should delete a task from the client', async () => {
    // Create a test psychologist
    const client = new Clients({
      sub: "116345710901692365892",
      notes: [{
        title: "proba",
        description: "proba",
        issuedate: {date:"2021-02-08T00:00:00.000Z"},
      }
      ],
      Documents: [],
      Invoice: [],
      progressions: [],
      __v: 0,
      _id: "644a80ff97a92a07b08b0770",
      occasions: [],
      tasks: [
        {
          title:"proba",
          description:"proba",
          deadline: "2021-02-08T00:00:00.000Z",
          isDone: false,
          isUrgent: false,
          _id: "6450e6a1013224ca555a1934"
        }
      ],
      topicSuggestions: [],
    });
    await client.save();
    const newData = {
      percentages: 60,
      id: client.tasks[0]._id
    }
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"

    // Make a POST request to add a client email
    const res = await testApp
      .delete(`/api/psychologist/deletetask/${client.sub}/${client.tasks[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(newData);

    // Check that the response is successful
    expect(res.status).toBe(200);
  });
});