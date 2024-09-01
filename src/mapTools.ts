import { Feature, Point } from '@turf/turf';
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

// Fix a bearing between [-360, 360] to [-180, 180]
export const fixBearingDomain = (b: number) => {
    if (b < -180) {
        return 360 + b;
    } else if (b > 180) {
        return -360 + b;
    }
    return b;
};
