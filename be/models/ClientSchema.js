const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const progression = new Schema({
    name: String,
    percentages: Number,
    startDate: Date,   
})

const task = new Schema({
    title: String,
    description: String,
    issueddate: {
        type: Date,
        default: Date.now
      },
    deadline: Date,
    isDone: Boolean,
    isUrgent: Boolean,
})

const topicSuggestion ={
    deadline: Date,
    title: String,
    description: String,
    date: Date,
    isNewTopic: Boolean,
}

const ClientSchema = new Schema({
    sub: {
        type: String,
        required: true,
        unique: true,
      },
    name: String,
    email: String,
    phone: String,
    address: String,
    createdAt: String,
    Invoice: [],
    Documents: [],
    tasks: [task],
    topicSuggestions: [topicSuggestion],
    nextSession: Date,
    occasions: [Object],
    therapist: String,
    notes: [Object],
    progressions:[progression],
    access_token: String, 
    refresh_token: String,  
})

module.exports = mongoose.model("Client", ClientSchema)