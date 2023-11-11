import { app } from "../dist/app.js";
import request from "supertest";

import { seed } from "../dist/db/seed-files/seed.js";
import {
  usersData,
  paymentTypesData,
  transactionsData,
} from "../dist/data/test-data/index.js";
const testData = { usersData, paymentTypesData, transactionsData };
import { db } from "../dist/db/connection.js";
const connection = db;

beforeEach(() => seed(testData));
afterAll(() => connection.end());

////////Test Template////////
// describe('[REQUEST] [ENDPOINT]' , () => {
//   describe('Successful connection test(s)', () => {
//     test('[STATUS CODE]: [DESCRIPTION]', () => {
//     })
//   })
//   describe('Unsuccessful connection test(s)', () => {
//   })
// })

describe("GET /api/users", () => {
  describe("Successful connection test(s)", () => {
    test("200: page returns an array of objects", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          body.map((user) => {
            expect(typeof user).toBe("object");
          });
        });
    }),
      test("200: if users > 0, return them with all necessary parameters", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            if (body.length > 0) {
              body.map((user) => {
                expect(user).toHaveProperty("user_id", expect.any(Number));
                expect(user).toHaveProperty("username", expect.any(String));
                expect(user).toHaveProperty("email", expect.any(String));
                expect(user).toHaveProperty("password", expect.any(String));
              });
            }
          });
      });
  });
  describe("Unsuccessful connection test(s)", () => {
    test("404: Come back with error if route not correct", () => {
      return request(app)
        .get("/api/usernames")
        .expect(404)
        .then(({ body }) => {
          expect(body).toMatchObject({
            message: "Error 404: Page not found",
          });
        });
    });
  });
});

describe("GET /api/users/user_id", () => {
  describe("Successful connection test(s)", () => {
    test("200: userId returns a single object", () => {
      return request(app)
        .get("/api/users/3")
        .expect(200)
        .then(({ body }) => {
          expect(typeof body).toBe("object");
          expect(Array.isArray(body)).toBe(false);
        });
    }),
      test("200: Article returns with a users information", () => {
        return request(app)
          .get("/api/users/3")
          .expect(200)
          .then(({ body }) => {
            expect(body.username).toEqual("Piccolo");
            expect(body.email).toEqual("piccolo@namekian.com");
            expect(body.password).toEqual("hashed_password_3");
          });
      });
  });
  describe("Unsuccessful connection test(s)", () => {
    test("400: article fails if param is not a number", () => {
      return request(app)
        .get("/api/users/three")
        .expect(400)
        .then(({ body }) => {
          expect(body).toMatchObject({
            message: "Error 400 - Bad Request: User path must be a number",
          });
        });
    }),
      test("404: article fails if param number does not match a user", () => {
        return request(app)
          .get("/api/users/99999999")
          .expect(404)
          .then(({ body }) => {
            expect(body).toMatchObject({
              message: "Error 404: User ID not found",
            });
          });
      });
  });
});

describe("GET /api/transactions", () => {
  describe("Successful connection test(s)", () => {
    test("200: returns an array", () => {
      return request(app)
        .get("/api/transactions")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
        });
    }),
      test("200: array is full of objects that include all necessary parameters", () => {
        return request(app)
          .get("/api/transactions")
          .expect(200)
          .then(({ body }) => {
            if (body.length === 0) {
              return;
            }
            body.map((txn) => {
              expect(typeof txn).toBe("object");
              expect(txn).toHaveProperty("transaction_id", expect.any(Number));
              expect(txn).toHaveProperty("user_id", expect.any(Number));
              expect(txn).toHaveProperty("name", expect.any(String));
              expect(txn).toHaveProperty("type", expect.any(Number));
              expect(txn).toHaveProperty("frequency", expect.any(String));
              expect(txn).toHaveProperty("created_at", expect.any(String));
            });
          });
      }),
      test("200: transactions should be ordered by most recently created first", () => {
        return request(app)
          .get("/api/transactions")
          .expect(200)
          .then(({ body }) => {
            let lastCreated;
            body.map((txn) => {
              const unixEpochTimestamp = Date.parse(txn.created_at);
              if (lastCreated !== undefined) {
                expect(unixEpochTimestamp).toBeLessThanOrEqual(lastCreated);
              }
              lastCreated = unixEpochTimestamp;
            });
          });
      });
    describe("Unsuccessful connection test(s)", () => {});
  });
});

describe("GET /api/users/:user_id/transactions", () => {
  describe("Successful connection test(s)", () => {
    test("200: returns an array full of objects", () => {
      return request(app)
        .get("/api/users/2/transactions")
        .expect(200)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(true);
          body.map((txn) => {
            expect(typeof txn).toBe("object");
          });
        });
    }),
      test("200: each users transaction has all relevant info", () => {
        return request(app)
          .get("/api/users/2/transactions")
          .expect(200)
          .then(({ body }) => {
            body.map((txn) => {
              expect(txn).toHaveProperty("transaction_id", expect.any(Number));
              expect(txn).toHaveProperty("user_id", expect.any(Number));
              expect(txn).toHaveProperty("name", expect.any(String));
              expect(txn).toHaveProperty("type", expect.any(Number));
              expect(txn).toHaveProperty("frequency", expect.any(String));
              expect(txn).toHaveProperty("created_at", expect.any(String));
            });
          });
      }),
      test("200: transactions should be ordered by newest first", () => {
        return request(app)
          .get("/api/users/2/transactions")
          .expect(200)
          .then(({ body }) => {
            let lastCreated;
            body.map((txn) => {
              const unixEpochTimestamp = Date.parse(txn.created_at);
              if (lastCreated !== undefined) {
                expect(unixEpochTimestamp).toBeLessThanOrEqual(lastCreated);
              }
              lastCreated = unixEpochTimestamp;
            });
          });
      }),
      test("200: transactions will pull empty array if user has no transactions listed", () => {
        return request(app)
          .get("/api/users/5/transactions")
          .expect(200)
          .then(({ body }) => {
            expect(body.length).toBe(0);
          });
      });
  });
  describe("Unsuccessful connection test(s)", () => {
    test("400: fails if user_id param is not a number", () => {
      return request(app)
        .get("/api/users/three/transactions")
        .expect(400)
        .then(({ body }) => {
          expect(body).toMatchObject({
            message: "Error 400 - Bad Request: User path must be a number",
          });
        });
    }),
      test("404: fails if user_id param number does not match a user", () => {
        return request(app)
          .get("/api/users/99999999/transactions")
          .expect(404)
          .then(({ body }) => {
            expect(body).toMatchObject({
              message: "Error 404: User ID not found",
            });
          });
      });
  });
});

describe("POST /api/transactions/:user_id", () => {
  describe("Successful connection test(s)", () => {
    test("201: page returns with an object", () => {
      const newTxn1 = {
        user_id: 2,
        name: "Netflix",
        type: 3,
        frequency: "monthly",
      };

      return request(app)
        .post("/api/transactions/2")
        .send(newTxn1)
        .expect(201)
        .then(({ body }) => {
          expect(Array.isArray(body)).toBe(false);
          expect(typeof body).toBe("object");
        });
    });
  });
  describe("Unsuccessful connection test(s)", () => {
    //user_id doesn't match txn details or link
  });
});

describe("POST /api/auth/register", () => {
  describe("Successful connection test(s)", () => {
    const userReg = {
      username: "Gohan123",
      email: "gohan@satancity.com",
      password: "test123",
    };
    test(
      "201: Registered user returns as an object with a user_id and a hashed password from the database",
      async () => {
        await request(app)
          .post("/api/auth/register")
          .send(userReg)
          .expect(201)
          .then(({ body }) => {
            expect(typeof body).toBe("object");
            expect(Array.isArray(body)).toBe(false);
            expect(body.user_id).toBe(6);
            expect(body.username).toBe("Gohan123");
            expect(body.email).toBe("gohan@satancity.com");
            expect(body.password).not.toBe(userReg.password);
            expect(body.password.length).toBeGreaterThan(20);
          });
        return request(app)
          .get("/api/users/6")
          .expect(200)
          .then(({ body }) => {
            expect(typeof body).toBe("object");
            expect(Array.isArray(body)).toBe(false);
            expect(body.user_id).toBe(6);
            expect(body.username).toBe("Gohan123");
            expect(body.email).toBe("gohan@satancity.com");
            expect(body.password).not.toBe(userReg.password);
            expect(body.password.length).toBeGreaterThan(20);
          });
      }
    );
  });
  describe("Unsuccessful connection test(s)", () => {});
});
