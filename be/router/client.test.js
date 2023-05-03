
const dotenv  = require("dotenv")
dotenv.config({ path: ".env.test" })

const supertest = require("supertest")
const app = require("../app")
const Psychologist = require("../models/PsychoSchema")
const Clients = require("../models/ClientSchema")
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

jest.mock("../api/getIDToken")
const getIdToken = require ("../api/getIDToken")
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


describe("POST /login", () => {
  beforeAll(connect);
  afterEach(clearData);
  afterAll(disconnect);

  it("should return a session token when given a valid login code", async () => {
    // given
    const code = "as56df5w5a8d823djak";
    const mockToken = process.env.TEST_TOKEN;
    const mockPayload = { email: "jane@example.com", sub: "123456" };
    const mockPsychologist = new Psychologist({
      name: "Dr. Smith",
      email: "portaproba85@gmail.com",
      clients: [{ email: mockPayload.email }],
    });
    await mockPsychologist.save();
    const mockedGetIdToken = jest.mocked(getIdToken);
    mockedGetIdToken.mockResolvedValueOnce({
      id_token: mockToken,
      access_token: "mock_access_token",
      refresh_token: "mock_refresh_token",
    });
    const expectedToken = jwt.sign(mockPayload, process.env.JWT_SECRET || { expiresIn: 0 });

    // when
    const response = await testApp.post("/api/client/login").send({ code });

    // then
    const dbContent = await Clients.find()
    expect(dbContent).toHaveLength(1)
    expect(response.status).toBe(200);
  });
});

describe('GET /getdetails', () =>{
    beforeAll(connect)
    afterEach(clearData)
    afterAll(disconnect)
    it("should return the client details with the therapist's fee and email", async()=>{

        // given
        const client = new Clients({
            sub: "117753958626988270722",
            name: "Test Client",
            email: "balazs.tildy@gmail.com",
            phone: "1234567890",
            address: "123 Main St",
            createdAt: 'Thu Apr 27 2023 13:22:27 GMT+0200 (Central European Summer Time)',
            Invoice: [],
            Documents: [],
            tasks: [],
            topicSuggestions: [],
            occasions: [],
            therapist: "Dr. Test Psychologist",
          });
          await client.save();

          const therapist = new Psychologist({
            name: "Dr. Test Psychologist",
            email: "testpsychologist@example.com",
            oradij: 150,
          });
          await therapist.save();
          const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"
        // when

        const resp = await supertest(app)
        .get("/api/client/getdetails")
        .set("Authorization", `Bearer ${token}`);
        
        

        // then
        expect(resp.status).toBe(200)
        expect(resp.body).toEqual({ 
                sub: '117753958626988270722',
                name: 'Test Client',
                email: 'balazs.tildy@gmail.com',
                phone: '1234567890',
                address: '123 Main St',
                createdAt: 'Thu Apr 27 2023 13:22:27 GMT+0200 (Central European Summer Time)',
                Invoice: [],
                Documents: [],
                tasks: [],
                topicSuggestions: [],
                occasions: [],
                therapist: 'Dr. Test Psychologist',
                therapistsFee: 150,
                therapistEmail: 'testpsychologist@example.com'              
    })
    })
} );
 
describe("POST /newtopic", () => {
    beforeAll(connect)
    afterEach(clearData)
    afterAll(disconnect)
    it("should add a new topic suggestion to the client", async () => {
      const client = new Clients({
        sub: "12345",
        name: "Test Client",
        email: "balazs.tildy@gmail.com",
        phone: "1234567890",
        address: "123 Main St",
        createdAt: new Date(),
        Invoice: [],
        Documents: [],
        tasks: [],
        topicSuggestions: [],
        occasions: [],
        therapist: "Dr. Test Psychologist",
      });
      await client.save();
  
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMTc3NTM5NTg2MjY5ODgyNzA3MjIiLCJlbWFpbCI6ImJhbGF6cy50aWxkeUBnbWFpbC5jb20iLCJmYW1pbHlfbmFtZSI6IlRpbGR5IiwiZ2l2ZW5fbmFtZSI6IkJhbMOhenMiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUdObXl4YS1MTjAtVEU4YnhVUWpmeGhXWnEzc0YtVXFFblIycVlwQl9TaWtMUT1zOTYtYyIsImlhdCI6MTY4MTIyNjQzOH0.hTpNmVlUTwKrj4KdKB_HeggzSXWit3xFQP5KZ8OqGbo"; // Replace with a valid token for authentication
  
      const newTopic = {
        title: "Test Topic",
        description: "This is a test topic suggestion",
      };
  
      const response = await supertest(app)
        .post("/api/client/newtopic")
        .set("Authorization", `Bearer ${token}`)
        .send(newTopic);
  
      expect(response.status).toBe(200);
  
      const updatedClient = await Clients.findOne({ email: client.email });
      expect(updatedClient.topicSuggestions.length).toBe(1);
      expect(updatedClient.topicSuggestions[0].title).toBe(newTopic.title);
      expect(updatedClient.topicSuggestions[0].description).toBe(
        newTopic.description
      );
    });
  });