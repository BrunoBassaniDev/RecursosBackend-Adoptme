import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080'); 

describe('Users Router Tests', () => {
    describe('GET /api/users', () => {
        it('Debería obtener todos los usuarios', async () => {
            const { statusCode, body } = await requester.get('/api/users');
            
            expect(statusCode).to.eql(200);
            expect(body).to.have.property('status', 'success');
            expect(body.payload).to.be.an('array');
        });
    });

    describe('GET /api/users/:uid', () => {
        it('Debería obtener un usuario por ID', async () => {
            const mockUserId = '675cd5b96a539e196c0eabd0'; 

            const { statusCode, body } = await requester.get(`/api/users/${mockUserId}`);
            
            if (statusCode === 404) {
                expect(body).to.have.property('error', 'User not found');
            } else {
                expect(statusCode).to.eql(200);
                expect(body.payload).to.have.property('_id', mockUserId);
            }
        });
    });

    describe('PUT /api/users/:uid', () => {
        it('Debería actualizar un usuario por ID', async () => {
            const mockUserId = '675cd5cf6a539e196c0eabd2'; 
            const updatedData = { role: 'admin' };

            const { statusCode, body } = await requester.put(`/api/users/${mockUserId}`).send(updatedData);
            
            if (statusCode === 404) {
                expect(body).to.have.property('error', 'User not found');
            } else {
                expect(statusCode).to.eql(200);
                expect(body).to.have.property('message', 'User updated');
            }
        });
    });

    describe('DELETE /api/users/:uid', () => {
        it('Debería eliminar un usuario por ID', async () => {
            const mockUserId = '675cd5d76a539e196c0eabd4'; 

            const { statusCode, body } = await requester.delete(`/api/users/${mockUserId}`);
            
            if (statusCode === 404) {
                expect(body).to.have.property('error', 'User not found');
            } else {
                expect(statusCode).to.eql(200);
                expect(body).to.have.property('message', 'User deleted');
            }
        });
    });
});