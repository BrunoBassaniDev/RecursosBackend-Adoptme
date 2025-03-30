import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080');

describe('Session Router Tests', () => {
    describe('POST /api/session/register', () => {
        it('Debería registrar un nuevo usuario', async () => {
            const newUser = {

                first_name: 'martin',
                last_name: 'mastronardi',
                email: 'mastronardi@gmail.com',
                password: '12345'
            };

            const { statusCode, body } = await requester.post('/api/session/register').send(newUser);

            expect(statusCode).to.eql(201);
            expect(body).to.have.property('status', 'success');
        });
    });

    describe('POST /api/session/login', () => {
        it('Debería iniciar sesión un usuario existente', async () => {
            const loginData = {
                username: 'testUser',
                password: 'password123',
            };

            const { statusCode, body } = await requester.post('/api/session/login').send(loginData);

            expect(statusCode).to.eql(200);
            expect(body).to.have.property('token');
        });
    });

    describe('GET /api/session/current', () => {
        it('Debería obtener la sesión del usuario actual', async () => {
            const token = 'TOKEN_AQUÍ'; 

            const { statusCode, body } = await requester.get('/api/session/current')
                .set('Authorization', `Bearer ${token}`);

            expect(statusCode).to.eql(200);
            expect(body).to.have.property('user');
        });
    });
});