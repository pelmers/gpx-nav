import { GeoJsonPoint, LatLonEle } from './types';
export declare function toGeoJson(point: LatLonEle): GeoJsonPoint;
export declare const clamp: (num: number, lo: number, hi: number) => number;
export declare const bearingDiff: (a: number, b: number) => number;
export type MapMode = 'walk' | 'bike' | 'car';
export declare function pointsToMapsUrl(points: LatLonEle[], mode?: MapMode): string;
