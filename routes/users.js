const userController = require('../controllers/users.js');

module.exports = (app) => {
	app.post('/users', userController.createUser);

	app.get('/users/:id', userController.getUser);

	return app;
}
