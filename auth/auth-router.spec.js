const request = require("supertest");
const server = require("../api/server");


describe('server', () => {
    describe('GET /jokes', () => {
        it('should return 401 no creds', () => {
            return request(server).get('/api/jokes').then(res => {
                expect(res.status).toBe(401);
            })
        })
        it('should return JSON data', () => {
            return request(server).get('/api/jokes').then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
    describe('POST /register', () => {
        it('should return 200 OK', () => {
            return request(server).post('/api/auth/register').send({username:"a",password:"a"})
            .then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON data', () => {
            return request(server).post('/api/auth/register').send({username:"bob",password:"bob"}).then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })
    describe('POST /login', () => {
        it('should return 200 OK', () => {
            return request(server).post('/api/auth/login').send({username:"bob",password:"bob"}).then(res => {
                expect(res.status).toBe(200);
            })
        })
        it('should return JSON data', () => {
            return request(server).post('/api/auth/login').send({username:"bob",password:"bob"}).then(res => {
                expect(res.type).toMatch(/json/i);
            })
        })
    })

    })
