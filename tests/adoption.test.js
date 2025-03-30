import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080');

describe('Adoption Endpoints', () => {
    describe('GET /adoptions', () => {
        it('Debe devolver todas las adopciones', async () => {
            const { statusCode, body } = await requester.get('/adoptions');

            expect(statusCode).to.eql(200);
            expect(body).to.have.property('status', 'success');
            expect(body.payload).to.be.an('array');
        });
    });

    describe('GET /adoptions/:aid', () => {
        it('Debe devolver una adopción específica por ID', async () => {
            const mockAdoptionId = '123456789abcdef123456789';
            const { statusCode, body } = await requester.get(`/adoptions/${mockAdoptionId}`);

            expect(statusCode).to.eql(200);
            expect(body).to.have.property('status', 'success');
            expect(body.payload).to.have.property('_id', mockAdoptionId);
        });

        it('Debe devolver un error 404 si no encuentra la adopción', async () => {
            const invalidAdoptionId = 'invalidId';
            const { statusCode, body } = await requester.get(`/adoptions/${invalidAdoptionId}`);

            expect(statusCode).to.eql(404);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Adoption not found');
        });
    });

    describe('POST /adoptions/:uid/:pid', () => {
        it('Debe crear una nueva adopción', async () => {
            const mockUserId = '675cd5b96a539e196c0eabd0'; 
            const mockPetId = '675ce0cd3e28111a0f1bc788'; 

            const { statusCode, body } = await requester.post(`/adoptions/${mockUserId}/${mockPetId}`);

            expect(statusCode).to.eql(200);
            expect(body).to.have.property('status', 'success');
            expect(body).to.have.property('message', 'Pet adopted');
        });

        it('Debe devolver un error 404 si el usuario no existe', async () => {
            const invalidUserId = 'invalidUserId';
            const mockPetId = 'abcdef123456789abcdef123';

            const { statusCode, body } = await requester.post(`/adoptions/${invalidUserId}/${mockPetId}`);

            expect(statusCode).to.eql(404);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'user Not found');
        });

        it('Debe devolver un error 404 si la mascota no existe', async () => {
            const mockUserId = '1234';
            const invalidPetId = 'invalidPetId';

            const { statusCode, body } = await requester.post(`/adoptions/${mockUserId}/${invalidPetId}`);

            expect(statusCode).to.eql(404);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Pet not found');
        });

        it('Debe devolver un error 400 si la mascota ya está adoptada', async () => {
            const mockUserId = '123456789abcdef123456789';
            const adoptedPetId = '675ce0b03e28111a0f1bc786'; 

            const { statusCode, body } = await requester.post(`/adoptions/${mockUserId}/${adoptedPetId}`);

            expect(statusCode).to.eql(400);
            expect(body).to.have.property('status', 'error');
            expect(body).to.have.property('error', 'Pet is already adopted');
        });
    });
});