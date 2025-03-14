const UserModel = require("../Model/UserModel");

const getUsers = async (req, res) => {
    if (req.params.id) {
        const user = await UserModel.findById(req.params.id);
        res.sendJson(user);

        return;
    }

    const users = await UserModel.find();
    res.sendJson(users);
}

const createUser = async (req, res) => {
    const user = UserModel.create(req.body);
    res.sendJson(user);
}

module.exports = {
    getUsers,
    createUser,
}