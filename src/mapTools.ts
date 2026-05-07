import { GeoJsonPoint, LatLonEle } from './types';

export function toGeoJson(point: LatLonEle): GeoJsonPoint {
    return [point.lon, point.lat, point.ele];
}

export const clamp = (num: number, lo: number, hi: number) =>
    num < lo ? lo : num > hi ? hi : num;

// Given bearings a and b in the range [-180, 180], return the short angle that moves a to b.
// examples:
// if a is 10 and b is -10, then the answer is -20.
// if a is -10 and b is 10, then the answer is 20.
// if a is -170 and b is 170, then the answer is -20.
// if a is 170 and b is -170, then the answer is 20.
export const bearingDiff = (a: number, b: number) => {
    // diff will be in the range [0, 360]
    const diff = Math.abs(b - a);
    const sign = b > a ? 1 : -1;
    return sign * (diff > 180 ? -(360 - diff) : diff);
};

// Convert a GPX point to google maps data encoded point.
// The inverse of https://github.com/david-r-edgar/google-maps-data-parameter-parser
export type MapMode = 'walk' | 'bike' | 'car';
export function pointsToMapsUrl(
    points: LatLonEle[],
    mode: MapMode = 'walk' as const
): string {
    let modeValue;
    switch (mode) {
        case 'walk':
            modeValue = 2;
            break;
        case 'bike':
            modeValue = 1;
            break;
        case 'car':
            modeValue = 0;
            break;
    }
    const baseUrl = 'https://www.google.com/maps/dir';
    let url = baseUrl;
    for (const point of points) {
        url += `/${point.lat},${point.lon}`;
    }
    // https://www.google.com/maps/dir/C%26C+Asian+Market+Food,+Albert+Cuypstraat,+Amsterdam/Fietswasserette+Chasse+Patate,+Tweede+van+der+Helststraat+75,+1073+AL+Amsterdam/@52.3532438,4.8908895,16z/data=!3m1!4b1!4m14!4m13!1m5!1m1!1s0x47c60955fe535737:0x12b014394910caf5!2m2!1d4.8987913!2d52.3571635!1m5!1m1!1s0x47c609c136a35847:0xeb04126d27bc574e!2m2!1d4.8949328!2d52.3493243!3e2?entry=ttu&g_ep=EgoyMDI0MTAxNi4wIKXMDSoASAFQAw%3D%3D
    const modeString = `/data=!4m2!4m1!3e${modeValue}`;
    return url + modeString;
}
