const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server'); 
const app = require('../server');
const Tip = require('../models/Tip');

let mongoServer;

describe('Tips API Integration', () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  test('POST /api/tips - Successfully saves a Hybrid model tip', async () => {
    const hybridTip = {
      title: "NAT Gateway Test",
      serviceName: "VPC",
      category: "Networking",
      description: "Testing hybrid logic",
      calculationType: "HYBRID",
      oldFixedRate: 0.045,
      newFixedRate: 0.011,
      oldVarRate: 0.045,
      newVarRate: 0
    };

    const response = await request(app)
      .post('/api/tips')
      .send(hybridTip);

    expect(response.status).toBe(201);

    const savedTip = await Tip.findOne({ title: "NAT Gateway Test" });
    expect(savedTip).not.toBeNull();
    expect(savedTip.calculationType).toBe('HYBRID');
    expect(savedTip.oldFixedRate).toBe(0.045);
  });
});