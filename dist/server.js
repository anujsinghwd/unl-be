"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    getApp() {
        return this.app;
    }
    // Configure the application settings
    config() {
        dotenv_1.default.config(); // Load environment variables from '.env' file
        this.app.use(express_1.default.json()); // Parse JSON request bodies
        this.app.use(express_1.default.urlencoded({ extended: true })); // Parse URL-encoded request bodies
        this.app.use((0, cors_1.default)({
            origin: "*",
            methods: "GET",
        }));
        this.app.use((0, helmet_1.default)());
    }
    // Define application routes
    routes() {
        this.app.use("/", routes_1.default);
    }
    // Start the Express server
    start(port = Number(process.env.PORT)) {
        this.server = http_1.default.createServer(this.app); // Create the server instance
        this.server.listen(port, () => {
            // console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    stop() {
        if (this.server) {
            this.server.close(() => {
                // console.log("Server has been stopped.");
            });
        }
    }
}
exports.Server = Server;
// Create an instance of the Server class and start the server
const server = new Server();
server.start(Number(process.env.PORT));
//# sourceMappingURL=server.js.map