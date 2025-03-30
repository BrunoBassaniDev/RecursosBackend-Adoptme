import { expect } from "chai";
import supertest from "supertest";

const requester = supertest('http://localhost:8080'); 

describe('Pets Router Tests', () => {
    describe('GET /api/pets', () => {
        it('Debería obtener todas las mascotas', async () => {
            const { statusCode, body } = await requester.get('/api/pets');
            
            expect(statusCode).to.eql(200);
            expect(body).to.have.property('status', 'success');
            expect(body.payload).to.be.an('array');
        });
    });

    describe('GET /api/pets/:pid', () => {
        it('Debería obtener una mascota por ID', async () => {
            const mockPetId = '675ce0cd3e28111a0f1bc788'; 

            const { statusCode, body } = await requester.get(`/api/pets/${mockPetId}`);
            
            if (statusCode === 404) {
                expect(body).to.have.property('error', 'Pet not found');
            } else {
                expect(statusCode).to.eql(200);
                expect(body.payload).to.have.property('_id', mockPetId);
            }
        });
    });

    describe('POST /api/pets', () => {
        it('Debería crear una nueva mascota', async () => {
            const newPet = {
                name: 'Max',
                specie: 'Perro',
                birthDate: '2024-12-13',
            };

            const { statusCode, body } = await requester.post('/api/pets').send(newPet);
            
            expect(statusCode).to.eql(201);
            expect(body).to.have.property('status', 'success');
            expect(body.payload).to.include({ name: 'Max', age: 3 });
        });
    });

    describe('DELETE /api/pets/:pid', () => {
        it('Debería eliminar una mascota por ID', async () => {
            const mockPetId = '675ce0e73e28111a0f1bc78a'; 

            const { statusCode, body } = await requester.delete(`/api/pets/${mockPetId}`);
            
            if (statusCode === 404) {
                expect(body).to.have.property('error', 'Pet not found');
            } else {
                expect(statusCode).to.eql(200);
                expect(body).to.have.property('message', 'Pet deleted');
            }
        });
    });
});