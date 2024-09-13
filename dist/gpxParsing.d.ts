import { GpxInfo, LatLonEle } from './types';
/** Compute the total distance of the root d. Merge points until distance between points is ~d/target */
export declare function compressPointsToTargetSize(originalPoints: LatLonEle[], target: number): LatLonEle[];
export default function parseGpxFile(gpxContents: string, targetPoints: number, joinTracks: boolean): GpxInfo;
