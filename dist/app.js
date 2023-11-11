import express from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import bcrypt from 'bcrypt';
import session from 'express-session';
import flash from 'express-flash';
// import { authUser } from './authentication.js';
// import { authRoutes } from './authentication.js';
import { getAllUsers, getUserById } from './controllers/users.controller.js';
import { getAllTransactions, getTransactionsByUser, postNewTransaction } from './controllers/transactions.controller.js';
import { getAllUsersModel } from './db/models/users.model.js';
const plainPass = "tet";
const hashedPass = await bcrypt.hash(plainPass, 10);
console.log(hashedPass);
bcrypt.compare("test", hashedPass, function (err, result) {
    console.log("result", result, err);
    // result == true
});
import { pageNotFound } from './errors.js';
export const app = express();
const allUsers = await getAllUsersModel().then((rows) => {
    return rows;
});
import { initializePassport } from './passport-config.js';
initializePassport(passport, function emails(email) {
    allUsers.find((user) => {
        console.log("usr", user);
        user.email === email;
    });
}, function ids(id) {
    allUsers.find((user) => {
        user.user_id === id;
    });
});
app.use(express.json());
app.use(flash());
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    // res.redirect('/login')
}
function checkNotAuthenticated(req, res, next) {
    console.log("checking not authenticated");
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    next();
}
app.get('/', (req, res) => {
    res.send('Express + TypeScript are running together');
});
//I can't tell whether this is complete or not so I may have to make a mock front-end
app.post('/api/auth/login', checkNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    });
    next();
}, (req, res) => {
    console.log(req.user);
    res.status(201).send(req.user);
});
app.post('/api/auth/register', async (req, res) => {
    console.log("hello");
    try {
        //this creates the hased password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        allUsers.push({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });
        console.log(allUsers);
        // res.redirect('/login')
    }
    catch {
        // res.redirect('/register')
    }
});
app.get('/api/users', getAllUsers);
app.get('/api/users/:user_id', getUserById);
app.get('/api/transactions', getAllTransactions);
app.get('/api/users/:user_id/transactions', getTransactionsByUser);
app.post('/api/transactions/:user_id', postNewTransaction);
app.get('/api/:anything', pageNotFound);
// const port = 9090  
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// }); 
// export {app}
