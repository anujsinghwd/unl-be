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
const server_1 = __importDefault(require("./server"));
describe('Express App', () => {
    let server;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        server = yield new server_1.default();
        yield server.start();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield server.stop();
    }));
    it('should respond with "Hello, Express!" on the root route', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = server.getApp(); // Get the Express app instance
        const response = yield (0, supertest_1.default)(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello, Express!');
    }));
    it('should return search results for valid search query', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = server.getApp();
        const response = yield (0, supertest_1.default)(app).get('/search?text=New');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(10);
    }));
    it('should handle invalid search query', () => __awaiter(void 0, void 0, void 0, function* () {
        const app = server.getApp();
        const response = yield (0, supertest_1.default)(app).get('/search?text=123445');
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(0);
    }));
});
//# sourceMappingURL=server.test.js.map