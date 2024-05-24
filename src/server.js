const express = require('express')
const app = express()
const cors = require('cors');
const routes = require('./routes')
const mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://matheusmoraisvipaccess:gDyKvcRhTiVUKKXJ@cluster0.1m2cp6h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connect('mongodb+srv://matheusmoraisvipaccess:gDyKvcRhTiVUKKXJ@cluster0.1m2cp6h.mongodb.net/yourDatabaseName?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.use(cors());

app.use(express.json());

app.use(routes)


// notFound
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

// catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message})
})


app.listen(3333)
