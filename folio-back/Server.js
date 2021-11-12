const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const key = require('./key/key');

// Connect to MongoDB
mongoose.connect(key.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}) 
    .then(() => console.log('Connect to MongoDB!'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser()); 

// Connect to Routes
app.use('/api/main', require('./routes/main'));
app.use('/api/user', require('./routes/user'));
app.use('/api/folio', require('./routes/folio'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server on ${port} port!`);
});