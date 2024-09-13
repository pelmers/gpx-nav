import GpxParser from 'gpxparser';
import * as turf from '@turf/turf';

import { GpxInfo, LatLonEle } from './types';
import { toGeoJson } from './mapTools';

/** Compute the total distance of the root d. Merge points until distance between points is ~d/target */
export function compressPointsToTargetSize(
    originalPoints: LatLonEle[],
    target: number
) {
    // We always include the first point, exclude that from the target.
    target -= 1;
    if (originalPoints.length <= target) {
        return originalPoints.slice();
    }
    const cumulativeDistances = [];
    for (let i = 0; i < originalPoints.length - 1; i++) {
        const currentTailDistance: number =
            i == 0 ? 0 : cumulativeDistances[cumulativeDistances.length - 1];
        cumulativeDistances.push(
            currentTailDistance +
                turf.distance(
                    toGeoJson(originalPoints[i]),
                    toGeoJson(originalPoints[i + 1])
                )
        );
    }
    const distanceInterval =
        cumulativeDistances[cumulativeDistances.length - 1] / target;
    const newPoints: LatLonEle[] = [originalPoints[0]];
    for (let pointIndex = 0; pointIndex < cumulativeDistances.length; pointIndex++) {
        const distanceSoFar = cumulativeDistances[pointIndex];
        if (distanceSoFar >= distanceInterval * newPoints.length) {
            newPoints.push(originalPoints[pointIndex + 1]);
        }
    }
    console.log(`Reduced points from ${originalPoints.length} to ${newPoints.length}`);
    return newPoints;
}

export default function parseGpxFile(
    gpxContents: string,
    targetPoints: number,
    joinTracks: boolean
): GpxInfo {
    const gpx = new GpxParser();
    gpx.parse(gpxContents);
    const originalPoints = joinTracks
        ? gpx.tracks.flatMap((track) => track.points)
        : gpx.tracks[0].points;
    const name = joinTracks
        ? gpx.tracks.map((t) => t.name).join(', ')
        : gpx.tracks[0].name;
    const points = compressPointsToTargetSize(originalPoints, targetPoints);
    const distance = {
        total: points
            .slice(1)
            .reduce(
                (acc, cur, idx) =>
                    acc + turf.distance(toGeoJson(cur), toGeoJson(points[idx])),
                0
            ),
    };
    // If any point does not have ele key, then add ele: 0
    for (const point of points) {
        if (point.ele == null) {
            point.ele = 0;
        }
    }
    return {
        distance,
        points,
        name,
        sizeBytes: gpxContents.length,
    };
}
