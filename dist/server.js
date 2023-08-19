"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        dotenv_1.default.config();
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    routes() {
        this.app.get("/", (req, res) => {
            res.send("Hello, Express!");
        });
        this.app.get("/search", (req, res) => {
            var _a;
            const searchText = ((_a = req.query.text) === null || _a === void 0 ? void 0 : _a.toString()) || "";
            const results = [];
            fs_1.default.createReadStream("./data/cities.csv")
                .pipe((0, csv_parser_1.default)())
                .on("data", (row) => {
                if (row.city.toLowerCase().includes(searchText.toLowerCase())) {
                    results.push(row);
                }
            })
                .on("end", () => {
                res.json(results);
            });
        });
    }
    start() {
        this.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
}
const server = new Server();
server.start();
//# sourceMappingURL=server.js.map