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

// Convert a GPX point to google maps data encoded point.
// The inverse of https://github.com/david-r-edgar/google-maps-data-parameter-parser
export function pointsToMapsUrl(points: LatLonEle[]): string {
    const start = points[0];
    const end = points[points.length - 1];
    const waypoints = points.slice(1, points.length - 1)
    const baseUrl = "https://www.google.com/maps/dir/";
    let url = `${baseUrl}${start.lat},${start.lon}/${end.lat},${end.lon}/`;
  
    url += "data=!4m25!4m24!1m21!";
  
    waypoints.forEach((point, index) => {
      url += `3m4!1m2!1d${point.lon}!2d${point.lat}!3s0x0:0x0!`;
    });
  
    url += "4e1!1m0!3e1!5m1!1e2";
  
    return url;
}

