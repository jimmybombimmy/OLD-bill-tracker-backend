import express from 'express'
import { app } from './app.js'

import { getAllUsersModel } from './db/models/users.model.js'

// export const authUser = (username: string, password: string, done: Function) => {
//   let authenticatedUser = {username, password}
//   return done(null, authenticatedUser)
// }

// const allUsers = await getAllUsersModel().then(({rows}) =>{
//   return rows
// })
// console.log(allUsers)


// import { initializePassport } from './passport-config.js';
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )


