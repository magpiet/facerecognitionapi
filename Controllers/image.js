const clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: 'ba457b9baafd46189fc17bf95a702406'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}

const handleImagePut = (db) => (req, res) => {
	const {id} = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('uable to get entries'));
};

module.exports = {
	handleImagePut: handleImagePut,
	handleApiCall: handleApiCall
}