import * as fs from 'fs';
import * as path from 'path';
const jsonminify = require("jsonminify");

function minify(json: object) {
  return jsonminify( JSON.stringify(json))
}

function writeGeoJson(geojson: any, file: string) {
  var fileData = minify(geojson)
  try {
    fs.writeFileSync(file, fileData, 'utf8');
    return {status: true, msg: 'Data Appended!'}
  } catch (e) {
    return {status: false, msg: e.message}
  }
}

export const appendGeoJSON = (req: any, file: string) => {
  console.log('--INCOMING APPEND REQUEST--')
  console.log(JSON.stringify(req.body))

  const newFeature = {
   "type": "Feature",
   "geometry": {
     "type": "Polygon",
     "coordinates": [req.body.coords]
   },
   "properties": {
     "redirect": req.body.url
    }
  }
  try {
    let geojson = JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
    geojson.features.push(newFeature)

    let writeFileStatus = writeGeoJson(geojson, file)
    if (writeFileStatus && !writeFileStatus.status){ throw writeFileStatus.msg || 'error' }

    return {status: writeFileStatus.status, msg: writeFileStatus.msg}
  } catch (e) {
    return {status: false, msg: e.message}
  }
}
