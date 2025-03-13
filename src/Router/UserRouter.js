const Router = require('../../MyFramework/Router/Router');

const router = new Router();

const users = [
    {id: 1, name: 'Ilya'},
    {id: 2, name: 'Petr'},
];

router.get('/users', (req, res) => {
    res.sendJson(users);
});

router.post('/users', (req, res) => {
    const user = req.body;
    users.push(user);

    res.sendJson(users);
});

module.exports = router;
