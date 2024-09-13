"use strict" ;(self["webpackChunkgpxnav" ]=self[                         "webpackChunkgpxnav"   ]  ||   [ ])    . push([[ 
"gpxParsing_tsx"] ,{ "./gpxParsing.tsx": (             __unused_webpack_module,                       __webpack_exports__, 
 __webpack_require__)   =>  {   eval(        "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"compressPointsToTargetSize\": () => (/* binding */ compressPointsToTargetSize),\n/* harmony export */   \"default\": () => (/* binding */ parseGpxFile)\n/* harmony export */ });\n/* harmony import */ var gpxparser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! gpxparser */ \"../node_modules/gpxparser/dist/GPXParser.min.js\");\n/* harmony import */ var gpxparser__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(gpxparser__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _turf_turf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @turf/turf */ \"../node_modules/@turf/turf/dist/es/index.js\");\n/* harmony import */ var _mapTools__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mapTools */ \"./mapTools.ts\");\n\n\n\n/** Compute the total distance of the root d. Merge points until distance between points is ~d/target */\nfunction compressPointsToTargetSize(originalPoints, target) {\n    // We always include the first point, exclude that from the target.\n    target -= 1;\n    if (originalPoints.length <= target) {\n        return originalPoints.slice();\n    }\n    const cumulativeDistances = [];\n    for (let i = 0; i < originalPoints.length - 1; i++) {\n        const currentTailDistance = i == 0 ? 0 : cumulativeDistances[cumulativeDistances.length - 1];\n        cumulativeDistances.push(currentTailDistance +\n            _turf_turf__WEBPACK_IMPORTED_MODULE_1__.distance((0,_mapTools__WEBPACK_IMPORTED_MODULE_2__.toGeoJson)(originalPoints[i]), (0,_mapTools__WEBPACK_IMPORTED_MODULE_2__.toGeoJson)(originalPoints[i + 1])));\n    }\n    const distanceInterval = cumulativeDistances[cumulativeDistances.length - 1] / target;\n    const newPoints = [originalPoints[0]];\n    for (let pointIndex = 0; pointIndex < cumulativeDistances.length; pointIndex++) {\n        const distanceSoFar = cumulativeDistances[pointIndex];\n        if (distanceSoFar >= distanceInterval * newPoints.length) {\n            newPoints.push(originalPoints[pointIndex + 1]);\n        }\n    }\n    console.log(`Reduced points from ${originalPoints.length} to ${newPoints.length}`);\n    return newPoints;\n}\nfunction parseGpxFile(gpxContents, targetPoints, joinTracks) {\n    const gpx = new (gpxparser__WEBPACK_IMPORTED_MODULE_0___default())();\n    gpx.parse(gpxContents);\n    const originalPoints = joinTracks\n        ? gpx.tracks.flatMap((track) => track.points)\n        : gpx.tracks[0].points;\n    const name = joinTracks\n        ? gpx.tracks.map((t) => t.name).join(', ')\n        : gpx.tracks[0].name;\n    const points = compressPointsToTargetSize(originalPoints, targetPoints);\n    const distance = {\n        total: points\n            .slice(1)\n            .reduce((acc, cur, idx) => acc + _turf_turf__WEBPACK_IMPORTED_MODULE_1__.distance((0,_mapTools__WEBPACK_IMPORTED_MODULE_2__.toGeoJson)(cur), (0,_mapTools__WEBPACK_IMPORTED_MODULE_2__.toGeoJson)(points[idx])), 0),\n    };\n    // If any point does not have ele key, then add ele: 0\n    for (const point of points) {\n        if (point.ele == null) {\n            point.ele = 0;\n        }\n    }\n    return {\n        distance,\n        points,\n        name,\n        sizeBytes: gpxContents.length,\n    };\n}\n\n\n//# sourceURL=webpack://gpxnav/./gpxParsing.tsx?" 
     )    ;}      }       ]    )   ;  /*ooooooooooooooooooooooooooooo*/ /*ooooooooooooooooooooooooooooooooooooo*/ /*ooooooooooooooooooooooooooooo*/ 
/*oooooooooooooooooooooooooo*/      /*ooooooooooooooooooooooooooooooooooooooooooooo*/      /*oooooooooooooooooooooooooo*/ 
/*ooooooooooooooooooooooo*/      /*ooooooooooooooooooooooooooooooooooooooooooooooooooo*/      /*ooooooooooooooooooooooo*/ 
/*ooooooooooooooooooooo*/     /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/     /*ooooooooooooooooooooo*/ 
/*ooooooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/    /*ooooooooooooooooooo*/ 
/*ooooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/    /*ooooooooooooooooo*/ 
/*ooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooo*/  /*oooooooooooooooooooooooooooooooo*/    /*ooooooooooooooo*/ 
/*ooooooooooooo*/    /*oooooooooooooooooooooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooo*/    /*ooooooooooooo*/ 
/*oooooooooooo*/   /*ooooooooooooooooooooooooooooooooooo*/      /*oooooooooooooooooooooooooooooooooo*/   /*oooooooooooo*/ 
/*oooooooooo*/   /*oooooooooooooooooooooooooooooooooooo*/        /*ooooooooooooooooooooooooooooooooooo*/   /*oooooooooo*/ 
/*ooooooooo*/   /*ooooooooooooooooooooooooooooooooooo*/           /*ooooooooooooooooooooooooooooooooooo*/   /*ooooooooo*/ 
/*ooooooo*/   /*ooooooooooooooooooooooooooooooooooooo*/            /*oooooooooooooooooooooooooooooooooooo*/   /*ooooooo*/ 
/*oooooo*/   /*ooooooooooooooooooooooooooooooooooooo*/              /*oooooooooooooooooooooooooooooooooooo*/   /*oooooo*/ 
/*ooooo*/   /*ooooooooooooooooooooooooooooooooooooo*/               /*ooooooooooooooooooooooooooooooooooooo*/   /*ooooo*/ 
/*oooo*/   /*ooooooooooooooooooooooooooooooooooooo*/                 /*ooooooooooooooooooooooooooooooooooooo*/   /*oooo*/ 
/*ooo*/   /*ooooooooooooooooooooooooooooooooooooo*/                   /*ooooooooooooooooooooooooooooooooooooo*/   /*ooo*/ 
/*oo*/   /*ooooooooooooooooooooooooooooooooooooo*/                      /*oooooooooooooooooooooooooooooooooooo*/   /*oo*/ 
        /*ooooooooooooooooooooooooooooooooooooo*/                       /*ooooooooooooooooooooooooooooooooooooo*/         
       /*oooooooooooooooooooooooooooooooooooo*/                          /*oooooooooooooooooooooooooooooooooooo*/         
      /*ooooooooooooooooooooooooooooooooooooo*/                           /*ooooooooooooooooooooooooooooooooooooo*/       
      /*oooooooooooooooooooooooooooooooooooo*/                             /*oooooooooooooooooooooooooooooooooooo*/       
     /*oooooooooooooooooooooooooooooooooooo*/                               /*oooooooooooooooooooooooooooooooooooo*/      
     /*ooooooooooooooooooooooooooooooooooo*/                                 /*ooooooooooooooooooooooooooooooooooo*/      
    /*ooooooooooooooooooooooooooooooooooo*/                                   /*ooooooooooooooooooooooooooooooooooo*/     
    /*oooooooooooooooooooooooooooooooooo*/                                      /*ooooooooooooooooooooooooooooooooo*/     
   /*oooooooooooooooooooooooooooooooooo*/                                       /*oooooooooooooooooooooooooooooooooo*/    
   /*ooooooooooooooooooooooooooooooooo*/                                         /*ooooooooooooooooooooooooooooooooo*/    
   /*oooooooooooooooooooooooooooooooo*/                                           /*oooooooooooooooooooooooooooooooo*/   
  /*oooooooooooooooooooooooooooooooo*/                                             /*oooooooooooooooooooooooooooooooo*/  
  /*ooooooooooooooooooooooooooooooo*/                                               /*ooooooooooooooooooooooooooooooo*/  
  /*ooooooooooooooooooooooooooooo*/                                                  /*oooooooooooooooooooooooooooooo*/  
  /*ooooooooooooooooooooooooooooo*/                                                   /*ooooooooooooooooooooooooooooo*/  
  /*oooooooooooooooooooooooooooo*/                                                     /*oooooooooooooooooooooooooooo*/  
  /*ooooooooooooooooooooooooooo*/                                                       /*ooooooooooooooooooooooooooo*/  
  /*oooooooooooooooooooooooooo*/                                                         /*oooooooooooooooooooooooooo*/  
  /*ooooooooooooooooooooooooo*/                                                            /*oooooooooooooooooooooooo*/  
  /*oooooooooooooooooooooooo*/                                                             /*oooooooooooooooooooooooo*/  
   /*oooooooooooooooooooooo*/                                                               /*oooooooooooooooooooooo*/   
   /*ooooooooooooooooooooo*/                                                                 /*ooooooooooooooooooooo*/    
   /*oooooooooooooooooooo*/                                                                   /*ooooooooooooooooooo*/     
    /*oooooooooooooooooo*/                                                                     /*oooooooooooooooooo*/     
    /*ooooooooooooooooo*/                                                                        /*oooooooooooooooo*/     
     /*ooooooooooooooo*/                                                                         /*ooooooooooooooo*/      
     /*oooooooooooooo*/                                                                           /*oooooooooooooo*/      
      /*oooooooooooo*/                                                                             /*oooooooooooo*/       
      /*oooooooooooo*/                                                                             /*oooooooooooo*/       
        /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/         
        /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/         
/*oo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*oo*/ 
/*ooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*ooo*/ 
/*oooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*oooo*/ 
/*ooooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*ooooo*/ 
/*oooooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*oooooo*/ 
/*ooooooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*ooooooo*/ 
/*ooooooooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*ooooooooo*/ 
/*oooooooooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*oooooooooo*/ 
/*oooooooooooo*/   /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/   /*oooooooooooo*/ 
/*ooooooooooooo*/    /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/    /*ooooooooooooo*/ 
/*ooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/    /*ooooooooooooooo*/ 
/*ooooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/    /*ooooooooooooooooo*/ 
/*ooooooooooooooooooo*/    /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/    /*ooooooooooooooooooo*/ 
/*ooooooooooooooooooooo*/     /*ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo*/     /*ooooooooooooooooooooo*/ 
/*ooooooooooooooooooooooo*/      /*ooooooooooooooooooooooooooooooooooooooooooooooooooo*/      /*ooooooooooooooooooooooo*/ 
/*oooooooooooooooooooooooooo*/      /*ooooooooooooooooooooooooooooooooooooooooooooo*/      /*oooooooooooooooooooooooooo*/ 
/*ooooooooooooooooooooooooooooo*/       /*ooooooooooooooooooooooooooooooooooooo*/       /*ooooooooooooooooooooooooooooo*/ 
/*ooooooooooooooooooooooooooooooooo*/        /*ooooooooooooooooooooooooooo*/        /*ooooooooooooooooooooooooooooooooo*/ 
/*oooooooooooooooooooooooooooooooooooooo*/             /*ooooooo*/             /*oooooooooooooooooooooooooooooooooooooo*/ 
/*oooooooooooooooooooooooooooooooooooooooooooo*/                         /*oooooooooooooooooooooooooooooooooooooooooooo*/ 
