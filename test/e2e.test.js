const request = require('supertest');
const app = require('../app');
let tokens = {};
let availabilityId;
let appointmentId;

describe('E2E Appointment System', () => {
  it('Register users', async () => {
    await request(app).post('/api/auth/register').send({ name: 'A1', email: 'a1@test.com', password: 'pass', role: 'student' });
    await request(app).post('/api/auth/register').send({ name: 'A2', email: 'a2@test.com', password: 'pass', role: 'student' });
    await request(app).post('/api/auth/register').send({ name: 'P1', email: 'p1@test.com', password: 'pass', role: 'professor' });
  });

  it('Login users', async () => {
    const student = await request(app).post('/api/auth/login').send({ email: 'a1@test.com', password: 'pass' });
    tokens.student = student.body.token;
    const student2 = await request(app).post('/api/auth/login').send({ email: 'a2@test.com', password: 'pass' });
    tokens.student2 = student2.body.token;
    const professor = await request(app).post('/api/auth/login').send({ email: 'p1@test.com', password: 'pass' });
    tokens.professor = professor.body.token;
    tokens.professorId = professor.body.user._id;
  });

  it('Professor adds availability', async () => {
    const res = await request(app).post('/api/availability').set('Authorization', tokens.professor).send({ date: '2025-07-10', time: '10:00' });
    availabilityId = res.body._id;
  });

  it('Student A1 books slot', async () => {
    const res = await request(app).post('/api/appointments').set('Authorization', tokens.student).send({ professorId: tokens.professorId, availabilityId });
    appointmentId = res.body._id;
  });

  it('Student A2 books second slot', async () => {
    const slot = await request(app).post('/api/availability').set('Authorization', tokens.professor).send({ date: '2025-07-10', time: '11:00' });
    const res = await request(app).post('/api/appointments').set('Authorization', tokens.student2).send({ professorId: tokens.professorId, availabilityId: slot.body._id });
  });

  it('Professor cancels A1 appointment', async () => {
    await request(app).delete(`/api/appointments/${appointmentId}`).set('Authorization', tokens.professor);
  });

  it('Student A1 checks for empty appointments', async () => {
    const res = await request(app).get('/api/appointments').set('Authorization', tokens.student);
    expect(res.body.length).toBe(0);
  });
});
