// const fs = require('fs');
// const util = require('util');

// const { usersConst } = require('../const');
//
// const readFilePromise = util.promisify(fs.readFile);
// const writeFilePromise = util.promisify(fs.writeFile);

// module.exports = {
//     findAllUsers: _getUsers,
//     getUsersByLogin: async (login) => {
//         const allUsers = await _getUsers();
//
//         return allUsers.find((value) => value.login === login);
//     },
//
//     deleteUser: async (user) => {
//         const allUsers = await _getUsers();
//         const indexDelete = _findIndex(allUsers, user);
//
//         allUsers.splice(indexDelete, 1);
//         await writeFilePromise(usersConst.DB_DIR, JSON.stringify(allUsers));
//     },
//
//     updateUser: async (user, body) => {
//         const allUsers = await _getUsers();
//         const indexDelete = _findIndex(allUsers, user);
//
//         allUsers.splice(indexDelete, 1, { ...allUsers[indexDelete], ...body });
//         await writeFilePromise(usersConst.DB_DIR, JSON.stringify(allUsers));
//     }
// };
//
// async function _getUsers() {
//     const users = await readFilePromise(usersConst.DB_DIR);
//     return JSON.parse(users.toString());
// }
//
// function _findIndex(array, user) {
//     return array.findIndex((value) => value.login === user.login);
// }
