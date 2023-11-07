import format from 'pg-format';
import { db } from '../connection.js';
import { convertTimestampToDate } from './utils.js';
const seed = (data) => {
    return db
        .query(`DROP TABLE IF EXISTS transactions;`)
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS payment_types;`);
    })
        .then(() => {
        return db.query(`DROP TABLE IF EXISTS users;`);
    })
        .then(() => {
        return db.query(`
      CREATE TABLE users(
        user_id SERIAL PRIMARY KEY,
        username VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        password VARCHAR NOT NULL
      );`);
    })
        .then(() => {
        return db.query(`
      CREATE TABLE payment_types(
        type_id SERIAL PRIMARY KEY,
        type VARCHAR NOT NULL,
        description VARCHAR,
        examples VARCHAR
      );`);
    })
        .then(() => {
        return db.query(`
      CREATE TABLE transactions(
        transaction_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(user_id) NOT NULL,
        name VARCHAR NOT NULL,
        type INT,
        frequency VARCHAR,
        created_at TIMESTAMP DEFAULT NOW()
      );`);
    })
        .then(() => {
        class UserDataClass {
            constructor(un, em, pw) {
                this.username = un;
                this.email = em;
                this.password = pw;
            }
            createArray() {
                return [
                    this.username,
                    this.email,
                    this.password
                ];
            }
        }
        const userArray = (u) => {
            const userClassFormat = new UserDataClass(u.username, u.email, u.password);
            return userClassFormat.createArray();
        };
        return db.query(format(`INSERT INTO users (username, email, password) VALUES %L RETURNING *;`, data.usersData.map((user) => {
            return userArray(user);
        })));
    })
        .then(() => {
        class PaymentTypeDataClass {
            constructor(t, d, e) {
                this.type = t;
                this.description = d;
                this.examples = e;
            }
            createArray() {
                return [
                    this.type,
                    this.description,
                    this.examples
                ];
            }
        }
        const paymentTypeArray = (p) => {
            const paymentTypeClassFormat = new PaymentTypeDataClass(p.type, p.description, p.examples);
            return paymentTypeClassFormat.createArray();
        };
        return db.query(format(`INSERT INTO payment_types (type, description, examples) VALUES %L RETURNING *;`, data.paymentTypesData.map((payment) => {
            return paymentTypeArray(payment);
        })));
    })
        .then(() => {
        class TransactionDataClass {
            constructor(u, n, t, f, c) {
                this.user_id = u,
                    this.name = n,
                    this.type = t,
                    this.frequency = f,
                    this.created_at = c;
            }
            createArray() {
                return [
                    this.user_id,
                    this.name,
                    this.type,
                    this.frequency,
                    convertTimestampToDate(this.created_at)
                ];
            }
        }
        const transactionArray = (t) => {
            const transactionClassFormat = new TransactionDataClass(t.user_id, t.name, t.type, t.frequency, t.created_at);
            return transactionClassFormat.createArray();
        };
        return db.query(format(`INSERT INTO transactions (user_id, name, type, frequency, created_at) VALUES %L RETURNING *;`, data.transactionsData.map((transaction) => {
            return transactionArray(transaction);
        })));
    });
};
export { seed };
