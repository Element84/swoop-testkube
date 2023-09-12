import http from 'k6/http';
import {check,sleep} from 'k6';
import { _ } from 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js';

export const options = {
  stages: [
    {
      maxDuration: `${__ENV.TESTTIMEOUT}`,
      target: parseInt(__ENV.TESTUSERTARGET)
    },
  ],
};

export default function() {

  let outputFixture = {
    "type": "FeatureCollection",
    "features": [
      {
        "id": `${__ENV.TESTID}`,
        "properties": {
          "proj:shape": [
            12320,
            11160
          ],
          "proj:transform": [
            0.6,
            0,
            630384,
            0,
            -0.6,
            2952762,
            0,
            0,
            1
          ],
          "processing:software": {
            "publish": "0.1.0"
          },
          "proj:bbox": [
            630384,
            2945370,
            637080,
            2952762
          ],
          "proj:epsg": 26914,
          "naip:state": "tx",
          "gsd": 0.6,
          "datetime": "2020-12-17T00:00:00Z",
          "naip:year": "2020"
        },
        "stac_extensions": [
          "https://stac-extensions.github.io/processing/v1.1.0/schema.json",
          "https://stac-extensions.github.io/eo/v1.0.0/schema.json",
          "https://stac-extensions.github.io/projection/v1.0.0/schema.json"
        ],
        "collection": "naip",
        "assets": {
          "thumbnail": {
            "href": `https://${__ENV.STAC_ASSET_BUCKET_NAME}.s3.${__ENV.AWS_REGION}.amazonaws.com/data/naip/${__ENV.TESTID}/thumbnail.jpg`,
            "type": "image/jpeg",
            "title": "Thumbnail",
            "roles": [
              "thumbnail"
            ]
          }
        },
        "bbox": [
          -97.690252,
          26.622563,
          -97.622203,
          26.689923
        ],
        "type": "Feature",
        "stac_version": "1.0.0",
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -97.623004,
                26.622563
              ],
              [
                -97.622203,
                26.689286
              ],
              [
                -97.68949,
                26.689923
              ],
              [
                -97.690252,
                26.623198
              ],
              [
                -97.623004,
                26.622563
              ]
            ]
          ]
        },
        "links": [
          {
            "type": "application/json",
            "rel": "self",
            "href": `s3://${__ENV.STAC_ASSET_BUCKET_NAME}/data/naip/${__ENV.TESTID}/${__ENV.TESTID}.json`
          },
          {
            "type": "application/json",
            "rel": "canonical",
            "href": `s3://${__ENV.STAC_ASSET_BUCKET_NAME}/data/naip/${__ENV.TESTID}/${__ENV.TESTID}.json`
          },
          {
            "href": "https://planetarycomputer.microsoft.com/api/stac/v1/collections/naip",
            "type": "application/json",
            "rel": "collection"
          },
          {
            "rel": "parent",
            "href": "https://planetarycomputer.microsoft.com/api/stac/v1/collections/naip",
            "type": "application/json"
          },
          {
            "href": "https://planetarycomputer.microsoft.com/api/data/v1/item/map?collection=naip&item=tx_m_2609719_se_14_060_20201217",
            "type": "text/html",
            "title": "Map of item",
            "rel": "preview"
          }
        ]
      }
    ],
    "process": {
      "description": "string",
      "tasks": {
        "copy-assets": {
          "assets": [
            "thumbnail"
          ],
          "drop_assets": [
            "image"
          ]
        },
        "publish": {
          "stac_validate": true,
          "public": false
        }
      },
      "upload_options": {
        "path_template": `s3://${__ENV.STAC_ASSET_BUCKET_NAME}/data/\${collection}/\${id}/`,
        "collections": {
          "naip": "*"
        },
        "public_assets": [],
        "s3_urls": false
      },
      "workflow": "mirror"
    }
  };

  const payload = JSON.stringify({
    "inputs": {
      "payload": {
        "id": `${__ENV.TESTID}`,
        "type": "FeatureCollection",
        "features": [
          {
            "id": `${__ENV.TESTID}`,
            "bbox": [
              -97.690252,
              26.622563,
              -97.622203,
              26.689923
            ],
            "type": "Feature",
            "links": [
              {
                "rel": "collection",
                "type": "application/json",
                "href": "https://planetarycomputer.microsoft.com/api/stac/v1/collections/naip"
              },
              {
                "rel": "parent",
                "type": "application/json",
                "href": "https://planetarycomputer.microsoft.com/api/stac/v1/collections/naip"
              },
              {
                "rel": "root",
                "type": "application/json",
                "href": "https://planetarycomputer.microsoft.com/api/stac/v1/"
              },
              {
                "rel": "self",
                "type": "application/geo+json",
                "href": "https://planetarycomputer.microsoft.com/api/stac/v1/collections/naip/items/tx_m_2609719_se_14_060_20201217"
              },
              {
                "rel": "preview",
                "href": "https://planetarycomputer.microsoft.com/api/data/v1/item/map?collection=naip&item=tx_m_2609719_se_14_060_20201217",
                "title": "Map of item",
                "type": "text/html"
              }
            ],
            "assets": {
              "image": {
                "href": "https://naipeuwest.blob.core.windows.net/naip/v002/tx/2020/tx_060cm_2020/26097/m_2609719_se_14_060_20201217.tif",
                "type": "image/tiff; application=geotiff; profile=cloud-optimized",
                "roles": [
                  "data"
                ],
                "title": "RGBIR COG tile",
                "eo:bands": [
                  {
                    "name": "Red",
                    "common_name": "red"
                  },
                  {
                    "name": "Green",
                    "common_name": "green"
                  },
                  {
                    "name": "Blue",
                    "common_name": "blue"
                  },
                  {
                    "name": "NIR",
                    "common_name": "nir",
                    "description": "near-infrared"
                  }
                ]
              },
              "thumbnail": {
                "href": "https://naipeuwest.blob.core.windows.net/naip/v002/tx/2020/tx_060cm_2020/26097/m_2609719_se_14_060_20201217.200.jpg",
                "type": "image/jpeg",
                "roles": [
                  "thumbnail"
                ],
                "title": "Thumbnail"
              }
            },
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [
                    -97.623004,
                    26.622563
                  ],
                  [
                    -97.622203,
                    26.689286
                  ],
                  [
                    -97.68949,
                    26.689923
                  ],
                  [
                    -97.690252,
                    26.623198
                  ],
                  [
                    -97.623004,
                    26.622563
                  ]
                ]
              ]
            },
            "collection": "naip",
            "properties": {
              "gsd": 0.6,
              "datetime": "2020-12-17T00:00:00Z",
              "naip:year": "2020",
              "proj:bbox": [
                630384,
                2945370,
                637080,
                2952762
              ],
              "proj:epsg": 26914,
              "naip:state": "tx",
              "proj:shape": [
                12320,
                11160
              ],
              "proj:transform": [
                0.6,
                0,
                630384,
                0,
                -0.6,
                2952762,
                0,
                0,
                1
              ]
            },
            "stac_extensions": [
              "https://stac-extensions.github.io/eo/v1.0.0/schema.json",
              "https://stac-extensions.github.io/projection/v1.0.0/schema.json"
            ],
            "stac_version": "1.0.0"
          }
        ],
        "process": [{
                  "description": "string",
                  "workflow": "mirror",
          "upload_options": {
            "path_template": `s3://${__ENV.STAC_ASSET_BUCKET_NAME}/data/\${collection}/\${id}/`,
            "collections": {
              "naip": "*"
            },
            "public_assets": [],
            "s3_urls": false
          },
          "tasks": {
            "copy-assets": {
              "assets": [
                "thumbnail"
              ],
              "drop_assets": [
                "image"
              ]
            },
            "publish": {
              "public": false,
              "stac_validate": true
            }
          }
        }]
      }
    },
    "response": "document"
  });

  delete outputFixture.features[0].properties.created
  delete outputFixture.features[0].properties.updated

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let equalOutput = (function(){
    function isObject(o){
      return o !== null && typeof o === 'object';
    }
    return function(o1, o2){
      if(!isObject(o1) || !isObject(o2)) return o1 === o2;
      var key, allKeys = {};
      for(key in o1)
        if(o1.hasOwnProperty(key))
          allKeys[key] = key;
      for(key in o2)
        if(o2.hasOwnProperty(key))
          allKeys[key] = key;
      for(key in allKeys){
        if(!equalOutput(o1[key], o2[key])) return false;
      }
      return true;
    }
  })();

  const swoopApiProcessExecution = http.post('http://' + __ENV.API_HOST + '/processes/mirror/execution', payload, params);

  const jobID = swoopApiProcessExecution.json().jobID

  const swoopApiJobResults = http.get('http://' + __ENV.API_HOST + '/jobs/' + jobID + '/results');

  let jobResults = swoopApiJobResults.json()
  delete jobResults.features[0].properties.created
  delete jobResults.features[0].properties.updated

  console.log("outputFixture= ",outputFixture);
  console.log("jobResults= ",jobResults);
  console.log("isEqual= ",_.isEqual(outputFixture, jobResults));
  check(swoopApiJobResults, {
    'job results match output fixture': (r) => _.isEqual(outputFixture, jobResults)
  });
}
