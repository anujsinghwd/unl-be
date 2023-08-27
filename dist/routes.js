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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path_1 = __importDefault(require("path"));
const calculate_distance_1 = __importDefault(require("./helpers/calculate-distance"));
const router = express_1.default.Router();
// Handle the root route with a simple "Hello, Express!" message
router.get("/", (req, res) => {
    res.send("Hello, Express!");
});
// Handle the '/search' route for searching in CSV file
router.get("/search", (req, res) => {
    var _a;
    const searchText = ((_a = req.query.text) === null || _a === void 0 ? void 0 : _a.toString()) || "";
    const csvFilePath = path_1.default.join(__dirname, "worldcities.csv");
    const results = [];
    let count = 0;
    fs_1.default.createReadStream(csvFilePath)
        .pipe((0, csv_parser_1.default)())
        .on("data", (row) => {
        if (row.city.toLowerCase().includes(searchText.toLowerCase()) &&
            count < 10) {
            results.push(row);
            count++;
        }
    })
        .on("end", () => {
        res.json(results);
    });
});
router.post("/distance-matrix", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const latitudes = req.body.latitudes;
    const longitudes = req.body.longitudes;
    const unit = ((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.unit) || "imperial";
    const distances = yield (0, calculate_distance_1.default)(latitudes, longitudes, unit);
    res.json(distances);
}));
exports.default = router;
//# sourceMappingURL=routes.js.map