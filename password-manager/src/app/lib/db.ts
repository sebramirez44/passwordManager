// Conectar por http, tener un objeto db que tiene:
// execute solo, toma la sql query y ya y lo ejecuta por http
// execute con args? idk si pueda
import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.TURSO_DATABASE_URL_HTTP}`,
    timeout: 1000,
    headers: {Authorization: `Bearer ${process.env.TURSO_AUTH_TOKEN}`, "Content-Type": "application/json"},
});
// instance.post('/sign-up', {email: 'sebramirezcordero@gmail.com', password: 'password'});

export const db = {
    async getUsers() {
        const data = await instance.post('', {requests: [
            {type: "execute", stmt: {sql: "SELECT * FROM Users"}},
            {type: "close"}
        ]});
        return data;
    },

    async insertUser(email: string, password: string) {
        const data = await instance.post('', {requests: [
            {type: "execute", stmt: {sql: `INSERT INTO User (email, password) VALUES ('${email}', '${password}')`}},
            {type: "close"} //idk si ocupo esto
        ]});
        return data;
    },

    async getUserByEmail(email: string) {
        const data = await instance.post('', {requests: [
            {type: "execute", stmt: {sql: `SELECT * FROM User WHERE email='${email}'`}},
            {type: "close"}
        ]});
        return data;
    }
};