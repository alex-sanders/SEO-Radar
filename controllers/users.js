const userModel = require('../models/index').users_n

module.exports = {
	createUser: (req, res) => {
		userModel.create(req.body)
		.then(user => res.send(user))
		.catch(err => res.send(err));
	},
	getUser: (req, res) => {
		userModel.findOne({where: {id: req.params.id}})
		.then(user => {
			if (req.query.pin == user.pin) {
				res.send(user);
			} else {
				res.send({Error: 'Dude, you entered a wrong pin!!!'})
			}
		})
		.catch(err => res.send(err));
	}
	/*getAllUsers: (req, res) => {
		if (req.body.pin == '1234') {

		}
		userModel.findAll()
	}*/
}