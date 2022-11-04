const request = require('supertest');
const app = require('../src/app');

describe("GET /", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).get("/").send();
      expect(response.statusCode).toBe(200);
    });
});

describe("GET /api/consumos", () => {
    const parametros = {
        "date" :"2022-10-14",
        "period" : "weekly"
    }

    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/api/consumos").send(parametros);
        expect(response.statusCode).toBe(200);
    });

    test("should respond a json", async () => {
        const response = await request(app).get("/api/consumos").send(parametros);

        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    describe("when the period and date is missing", () => {
        test("shoud respond with a 400 status code", async () => {
            const parametros2 = {
                "period" : "weekly"
            }

            const response = await request(app).get("/api/consumos").send(parametros2);
            expect(response.statusCode).toBe(400);    
        });
    });
});

describe("POST /api/consumos", () => {
    const parametros = {
        "date" :"2022-10-14",
        "period" : "weekly"
    }

    test("should respond with a 200 status code", async () => {
        const response = await request(app).post("/api/consumos").send(parametros);
        expect(response.statusCode).toBe(200);
    });

    test("should respond a json", async () => {
        const response = await request(app).post("/api/consumos").send(parametros);

        expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json")
        );
    });

    describe("when the period and date is missing", () => {
        test("shoud respond with a 400 status code", async () => {
            const parametros2 = {
                "period" : "weekly"
            }

            const response = await request(app).post("/api/consumos").send(parametros2);
            expect(response.statusCode).toBe(400);    
        });
    });
});