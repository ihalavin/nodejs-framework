const users = [
    {id: '0', name: 'Ilya'},
    {id: '1', name: 'Petr'},
];

const getUsers = (req, res) => {
    if (req.params.id && users[req.params.id]) {
        res.sendJson(users.find(user => user.id === req.params.id));

        return;
    }

    res.sendJson(users);
}

const createUser = (req, res) => {
    const user = req.body;
    users.push(user);

    res.sendJson(users);
}

module.exports = {
    getUsers,
    createUser,
}