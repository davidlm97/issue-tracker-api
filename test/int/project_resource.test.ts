import supertest from "supertest";
import { app } from "../../src/index";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("PROJECT RESOURCE /projects", () => {
  describe("GET", () => {
    test("Should return a 200", async () => {
      await supertest(app)
        .get(`/projects`)
        .expect(200)
        .then((response) => {
          console.log(response)
        });
    });
  });

  describe("POST", () => {
    test("Should return a 200", async () => {
      await supertest(app)
        .post(`/projects`)
        .send({
          name: "Project test",
          description: "My desc",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  
});
