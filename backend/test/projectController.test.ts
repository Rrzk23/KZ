import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import app from '../src/app';
import { describe, expect, beforeAll, afterAll, it, beforeEach } from '@jest/globals';




let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  // Start MongoDB in memory
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  // Disconnect from the database and stop MongoMemoryServer
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  await mongoServer.stop();
});



describe('Authentication and Project Tests', () => {
  let agent: request.SuperAgentTest;
  beforeEach(() => {
    agent = request.agent(app) as unknown as request.SuperAgentTest;
  });
  afterAll(async () => {
    // Clear the database after each test
    await mongoose.connection.dropDatabase();
  });

  it('should sign up, create prices, and get prices', async () => {
    // Sign up
    const signupResponse = await agent
      .post('/api/admin/signup')
      .send({
        adminName: 'admin1',
        password: 'password123',
      });
    //console.log(signupResponse.body)
    expect(signupResponse.status).toBe(201);
    const admin = await agent
      .get('/api/admin/');
  
    expect(admin.status).toBe(200);
    // Create first project
    const projectResponse1 = await agent
      .post('/api/projects/create')
      .send({
        title: 'title',
        image: 'url/images/',
        text: 'a text',
        demoUrl: 'https://tosomeWhere',
      });

    expect(projectResponse1.status).toBe(201);

    // Create second project
    const projectResponse2 = await agent
      .post('/api/projects/create')
      .send({
        title: 'title',
        image: 'url/images/',
        text: 'a text',
        demoUrl: 'https://tosomeWhere',
      });

    expect(projectResponse2.status).toBe(201);

    // Get project
    const getPricesResponse = await agent.get('/api/projects/getAll');
    expect(getPricesResponse.status).toBe(200);
    expect(getPricesResponse.body).toHaveLength(2);

    // Cleanup
    await agent.delete('/api/projects/delete/' + projectResponse1.body._id);
    await agent.delete('/api/projects/delete/' + projectResponse2.body._id);
    await agent.post('/api/admin/logout');
  },30000);
});

describe('Unit Tests for POST /projects/create and DELETE /projects/delete/priceId', () => {
  let agent: request.SuperAgentTest;
  beforeAll(async () => {
    agent = request.agent(app) as unknown as request.SuperAgentTest;
    await agent
      .post('/api/admin/signup')
      .send({
        adminName: 'admin1',
        password: 'password123',
      });
  });
  afterAll(async () => {
    await agent.post('/api/auth/logout');
    await mongoose.connection.dropDatabase();
  });
  it('should throw error of Posting project requires missing field', async () => {
    const response = await agent
      .post('/api/projects/create')
      .send({
        title: '',
        image: 'url/images/',
        text: 'a text',
        demoUrl: 'https://tosomeWhere',

      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Title is required');

    const response2 = await agent
    .post('/api/projects/create')
    .send({
      title: 'title',
      image: 'url/images/',
      text: '',
      demoUrl: 'https://tosomeWhere',

    });
  expect(response2.status).toBe(400);
  expect(response2.body.error).toBe('Text is required');
  });
  it('should post a valid project and able to delete it, if the id is wrong it should return 400 or 404', async () => {
    const response = await agent
      .post('/api/projects/create')
      .send({
        title: 'title',
        image: 'url/images/',
        text: 'text',
        demoUrl: 'https://tosomeWhere',
      });
    expect(response.status).toBe(201);
    expect(response.body.title).toBe('title');
    expect(response.body.image).toBe('url/images/');
    expect(response.body.text).toBe('text');
    expect(response.body.demoUrl).toBe('https://tosomeWhere');

    const testId = response.body._id;
    const invalid = new mongoose.Types.ObjectId().toString();

    const deleteResponse = await agent.delete('/api/projects/delete/' + 'abc');
    expect(deleteResponse.status).toBe(400);
    expect(deleteResponse.body.error).toBe('Invalid project id');

    const deleteResponse2 = await agent.delete('/api/projects/delete/' + invalid);
    expect(deleteResponse2.status).toBe(404);
    expect(deleteResponse2.body.error).toBe('Project not found');

    const deleteResponse3 = await agent.delete('/api/projects/delete/' + testId);
    expect(deleteResponse3.status).toBe(200);
  

  });
});
/*
describe('Unit Tests for GET /prices/getprice/:priceId', () => {
  let agent: request.SuperAgentTest;
  let testPriceId: string;
  beforeAll(async () => {
    // Seed the database with a test document
    agent = request.agent(app) as unknown as request.SuperAgentTest;
    await agent
      .post('/api/auth/signup')
      .send({
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
      });
    const response = await agent
      .post('/api/prices/post') 
      .send({ location: 'Eastwood', price: '100', title: 'Title' });
    testPriceId = response.body._id;
  });
  afterAll(async () => {
    // Delete the test document after tests
    await agent.delete('/api/prices/deleteprice' + testPriceId);
    await agent.post('/api/auth/logout');
    await mongoose.connection.dropDatabase();
  });
  it('shoult throws error 400 of invalid id for getting price', async () => {
    const response = await agent
      .get('/api/prices/getprice/abc');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid price id');
  });
  it('should return 404 for a non-existent price ID', async () => {
    // Using a random or invalid ObjectId
    const invalidId = new mongoose.Types.ObjectId().toString();

    const response = await agent
      .get('/api/prices/getprice/' + invalidId);
      
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Price not found'); 
  });
  it('should return 200 and get the correct price with the id', async () => {
    const response = await agent
      .get('/api/prices/getprice/' + testPriceId);
      
    expect(response.status).toBe(200);
    expect(response.body.location).toBe('Eastwood');
    expect(response.body.price).toBe('100');
    //expect(Date.parse(response.body.date)).toBeInstanceOf(Date);
  });
});

describe('Unit Tests for Patch /updateprice/:priceId', () => {
  let agent: request.SuperAgentTest;
  let testPriceId: string;
  beforeAll( async () => {
    agent = request.agent(app) as unknown as request.SuperAgentTest;
    await agent
      .post('/api/auth/signup')
      .send({
        username: 'user1',
        email: 'user1@example.com',
        password: 'password123',
      });
  });
  beforeEach(async () => {
    // Seed the database with a test document
    const response = await agent
      .post('/api/prices/post') 
      .send({ location: 'Eastwood', price: '100', title: 'Title' });
    testPriceId = response.body._id;
  });
  afterEach(async () => {
    // Delete the test document after tests
    await agent.delete('/api/prices/deleteprice' + testPriceId);
  });
  afterAll(async () => {
    // Delete the test document after tests
    await agent.post('/api/auth/logout');
    await mongoose.connection.dropDatabase();
  });
  it('shoult throws error 400 of invalid id for updating price with wrong id', async () => {
    const response = await agent
      .patch('/api/prices/updateprice/abc');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid price id');
  });
  it('shoult throws error 400 for updating price with missing location filed', async () => {
    const response = await agent
      .patch('/api/prices/updateprice/' + testPriceId)
      .send({
        price: '120',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Updating price missing a location');
  });

  it('shoult throws error 400 for updating price with missing title filed', async () => {
    const response = await agent
      .patch('/api/prices/updateprice/' + testPriceId)
      .send({
        location: 'Burwood',
        price: '120',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Updating price missing a title');
  });

  it('shoult throws error 400 for updating price with missing price filed', async () => {
    const response = await agent
      .patch('/api/prices/updateprice/' + testPriceId)
      .send({
        location: 'Burwood',
        price: '',
        title: 'Title',
      });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Updating price missing a price');
  });

  it('should return 404 for a non-existent price ID', async () => {
    // Using a random or invalid ObjectId
    const invalidId = new mongoose.Types.ObjectId().toString();

    const response = await agent
      .patch('/api/prices/updateprice/' + invalidId)
      .send({
        location: 'Chatswood',
        price: '150',
        title: 'Title',
      });
      
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Price not found'); 
  });
  it('should return 200 and get the correct price with the id', async () => {
    const response = await agent
      .patch('/api/prices/updateprice/' + testPriceId)
      .send({
        location: 'Chatswood',
        price: '150',
        title: 'Title',
      });
      
    expect(response.status).toBe(200);
    expect(response.body.location).toBe('Chatswood');
    expect(response.body.price).toBe('150');
    //expect(Date.parse(response.body.date)).toBeInstanceOf(Date);
  });
});*/