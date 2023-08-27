"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("./server");
describe("Root Route", () => {
    let server;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = new server_1.Server();
        const port = 0;
        server.start(port);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    it("should respond with 'Hello, Express!'", () => __awaiter(void 0, void 0, void 0, function* () {
        const app = server.getApp();
        const response = yield (0, supertest_1.default)(app).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("Hello, Express!");
    }));
    it("should respond with search results", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.getApp())
            .get("/search")
            .query({ text: "New" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(10);
        expect(response.body[0]).toHaveProperty("city");
        expect(response.body[0]).toHaveProperty("country");
    }));
    it("should respond with 0 search results", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server.getApp())
            .get("/search")
            .query({ text: "123Test" });
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    }));
});
//# sourceMappingURL=routes.test.js.map