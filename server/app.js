require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log('connected to MongoDB'));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
