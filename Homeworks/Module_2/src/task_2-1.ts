import express from 'express';
import users from './usersData';
import { v4 as uuidv4 } from 'uuid';
import { UserSchema } from './validation';
import { ContainerTypes, ValidatedRequest, ValidatedRequestSchema, createValidator } from 'express-joi-validation';
import { listOfUsedRoutes } from './listOfRoutes';

const app = express();
const port = process.env.PORT || 3000;
const validator = createValidator();

interface UserModel extends ValidatedRequestSchema {
    [ContainerTypes.Body]: {
        id: string;
        login: string;
        password: string;
        age: number;
        isDeleted: boolean;
    }
}
// type UserModel = {
//       id: string;
//       login: string;
//       password: string;
//       age: number;
//       isDeleted: boolean;
//   }


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('title', 'User DB');

function sortByLogin(arrayToSort: any, keyName:string) {
    arrayToSort.sort((a:any, b:any) => {
        const nameA = a[keyName];
        const nameB = b[keyName];
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return arrayToSort;
}
function getAutoSuggestUsers(loginSubstring: string, limit: number) {
    const userMatches = [];
    for (const userDict of users) {
        if (userDict.login.includes(loginSubstring)) {
            userMatches.push(userDict);
        }
        if (userMatches.length === limit) {
            return sortByLogin(userMatches, 'login');
        }
    }
    return sortByLogin(userMatches, 'login');
}


app.get('/', (req, res) => {
    console.log(listOfUsedRoutes);
    res.status(200).send(listOfUsedRoutes);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users/createUser', validator.body(UserSchema), (req: ValidatedRequest<UserModel>, res) => {
    const { login, password, age } = req.body;
    const userToCreate = users.find(user => (
        user.login === login
        &&
        user.isDeleted === false
    ));
    if (userToCreate) {
        res.status(400).send(`User with login=${login} already exist.`);
    } else {
        users.push({ 'id': uuidv4(), login, password, age, 'isDeleted': false });
        res.json(users);
    }
});

app.put('/users/updateUser/:id', validator.body(UserSchema), (req: ValidatedRequest<UserModel>, res) => {
    const { login, password, age } = req.body;
    const userById = users.find(user => (
        user.id === req.params.id
        &&
        user.isDeleted === false
    ));
    if (userById) {
        const userByLogin = users.find(user => user.id !== req.params.id && user.login === login);
        if (userByLogin) {
            res.status(403).send('Login already used by different user');
        } else {
            const userInstance = users.find(user => user.id === req.params.id);
            userInstance.login = login;
            userInstance.password = password;
            userInstance.age = age;
            res.json(userInstance);
        }
    } else {
        res.status(404).send(`User with id=${req.params.id} does not exist.`);
    }
});

app.get('/users/:id', (req, res) => {
    const userDataById = users.find(user => (
        user.id === req.params.id
        &&
        user.isDeleted === false
    ));
    if (userDataById) {
        res.json(userDataById);
    } else {
        res.status(404).send(`User with id=${req.params.id} not found`);
    }
});

app.get('/users/:getUsersBySubstring/:limit', (req, res) => {
    const limit = Number(req.params.limit);
    const matchedUsers = getAutoSuggestUsers(req.params.getUsersBySubstring, limit);
    console.log(matchedUsers);
    res.send(matchedUsers);
});

app.put('/users/deleteUser/:id', (req, res) => {
    const userToDelete = users.find(user => (
        user.id === req.params.id
        &&
        user.isDeleted === false
    ));
    if (userToDelete) {
        userToDelete['isDeleted'] = true;
        res.status(200).send(`User with id=${req.params.id} was deleted successfully.`);
    } else {
        res.status(404).send(`User with id=${req.params.id} not found`);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
