import bcrypt from 'bcrypt'

import passportLocal from 'passport-local'
const LocalStrategy = passportLocal.Strategy


export function initializePassport(passport: any, getUserByEmail: any, getUserById: any) {
  console.log("passport initializing")
  //done is custom to do whats done when authing user
  const authenticateUser = async (email:string, password:string, done: Function) => {
    console.log("passport pre user")
    const user = getUserByEmail(email)
    console.log("usr initializing", user)
    passport.use("email", email)
    //this is for the error
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      //compares encrypted password (1st param) to password user put in
      if (await bcrypt.compare(password, user.password)) {
        console.log("bcrypt compared")
        return done(null, user)
      } else {
        console.log("bcrypt did not compare")
        return done(null, false, { message: 'Password Incorrect' })
      }
    } catch (err) {
      return done(err)
    }
  }
  passport.use( new LocalStrategy({ usernameField: 'email'}, 
  authenticateUser ))
  passport.serializeUser((user: object, done: Function) => done(null, user))
  passport.deserializeUser((id: any, done: Function) => {
    return done(null, getUserById(id))
  })
}