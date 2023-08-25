import calculateDistances from './calculate-distance';

describe('calculateDistances function', () => {
    it('calculates distances between multiple points', () => {
        const latitudes = [25.435826, 28.609869, 31.223603];
        const longitudes = [81.846416, 77.229899, 75.204455];

        const distances = calculateDistances(latitudes, longitudes);

        expect(distances).toHaveLength(3);
        expect(distances[0]).toBeCloseTo(387.13, 2);
        expect(distances[1]).toBeCloseTo(349.62, 2);
        expect(distances[2]).toBeCloseTo(229.14, 2);
    });

    it('handles empty input arrays', () => {
        const latitudes: number[] = [];
        const longitudes: number[] = [];

        const distances = calculateDistances(latitudes, longitudes);

        expect(distances).toHaveLength(0);
    });

    it('calculates distances correctly for single point', () => {
        const latitudes: number[] = [25.435826];
        const longitudes: number[] = [81.846416];

        const distances = calculateDistances(latitudes, longitudes);

        expect(distances).toHaveLength(0);
    });
});
