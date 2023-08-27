"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const calculate_distance_1 = __importDefault(require("./calculate-distance"));
describe('calculateDistances function', () => {
    it('should calculate distances using metric units', () => {
        const latitudes = [51.5074, 40.7128]; // London, New York
        const longitudes = [-0.1278, -74.0060];
        const unit = 'metric';
        const distances = (0, calculate_distance_1.default)(latitudes, longitudes, unit);
        expect(distances).toHaveLength(1);
        expect(distances[0]).toBeCloseTo(5570.222179737958, 2); // Approximate distance in kilometers
    });
    it('should calculate distances using imperial units', () => {
        const latitudes = [51.5074, 40.7128]; // London, New York
        const longitudes = [-0.1278, -74.0060];
        const unit = 'imperial';
        const distances = (0, calculate_distance_1.default)(latitudes, longitudes, unit);
        expect(distances).toHaveLength(1);
        expect(distances[0]).toBeCloseTo(3461.3890456101985, 2); // Approximate distance in miles
    });
    it('should calculate distances for multiple points', () => {
        const latitudes = [51.5074, 40.7128, 34.0522]; // London, New York, Los Angeles
        const longitudes = [-0.1278, -74.0060, -118.2437];
        const unit = 'metric';
        const distances = (0, calculate_distance_1.default)(latitudes, longitudes, unit);
        expect(distances).toHaveLength(3);
        expect(distances[0]).toBeCloseTo(5570.222179737958, 2);
        expect(distances[1]).toBeCloseTo(8755.602341157259, 2);
        expect(distances[2]).toBeCloseTo(3935.746254609722, 2);
    });
});
//# sourceMappingURL=calculate-distance.test.js.map