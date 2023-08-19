"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
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
        // Handle the root route with a simple "Hello, Express!" message
        this.app.get("/", (req, res) => {
            res.send("Hello, Express!");
        });
        // Handle the '/search' route for searching in CSV file
        this.app.get("/search", (req, res) => {
            var _a;
            const searchText = ((_a = req.query.text) === null || _a === void 0 ? void 0 : _a.toString()) || ""; // Get the search query from request
            // Construct the file path to the CSV file
            const csvFilePath = path_1.default.join(__dirname, "worldcities.csv");
            const results = []; // Array to store search results
            let count = 0; // Counter for limiting results
            // Read the CSV file, parse it, and search for matching rows
            fs_1.default.createReadStream(csvFilePath)
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                // Check if the city name includes the search text and the result count is within limit
                if (row.city.toLowerCase().includes(searchText.toLowerCase()) &&
                    count < 10) {
                    results.push(row); // Add matching row to results
                    count++; // Increment result count
                }
            })
                .on("end", () => {
                res.json(results); // Respond with the search results
            });
        });
    }
    // Start the Express server
    start() {
        this.server = http_1.default.createServer(this.app); // Create the server instance
        this.server.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    stop() {
        if (this.server) {
            this.server.close(() => {
                console.log("Server has been stopped.");
            });
        }
    }
}
// Create an instance of the Server class and start the server
const server = new Server();
server.start();
exports.default = Server;
//# sourceMappingURL=server.js.map