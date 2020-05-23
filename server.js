const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require('./Controllers/image');

const db = knex ({
	client: 'pg',
	connection: {
		host: process.env.DATABASE_URL,
		ssl: true
	}
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send(db.users)});

app.post('/register', register.handleRegister(db, bcrypt));

app.post('/signin', signin.handleSignin(db, bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image', image.handleImagePut(db));

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(process.env.PORT, () => {
	console.log(`Running on port ${process.env.PORT}`);
});