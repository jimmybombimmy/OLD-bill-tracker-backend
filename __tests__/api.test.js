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
        .get("/api/tops")
        .expect(404);
    });
  });
});
