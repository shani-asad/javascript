const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');


mongoose.connect('mongodb+srv://shaniasad:secre7@cluster0.vp4fu.mongodb.net/?retryWrites=true&w=majority')

const server = express()

const origin = '*' // insert your origin here
server.use(cors({
    origin: origin
}));

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(5000, () => {
    console.log('server listening on port 5000.')
})