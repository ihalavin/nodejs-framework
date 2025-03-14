const Router = require('../../MyFramework/Router/Router');
const UserController = require('../Controller/UserController');

const router = new Router();

router.get('/users', UserController.getUsers);

router.post('/users', UserController.createUser);

module.exports = router;
