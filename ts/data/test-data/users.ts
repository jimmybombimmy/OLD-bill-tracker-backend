// users.js

interface UserData {
  username: string;
  email: string;
  password: string;
}

export const users: UserData[] = [
    {
      username: "Goku",
      email: "goku@kamehouse.com",
      password: "hashed_password_1", // Replace with the actual hashed password
    },
    {
      username: "Vegeta",
      email: "vegeta@saiyanprince.com",
      password: "hashed_password_2", // Replace with the actual hashed password
    },
    {
      username: "Piccolo",
      email: "piccolo@namekian.com",
      password: "hashed_password_3", // Replace with the actual hashed password
    },
    {
      username: "Bulma",
      email: "bulma@capsulecorp.com",
      password: "hashed_password_4", // Replace with the actual hashed password
    },
    {
      username: "Trunks",
      email: "trunks@future.com",
      password: "hashed_password_5", // Replace with the actual hashed password
    },
  ]
