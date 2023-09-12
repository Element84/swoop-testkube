import {check} from 'k6';
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.9.0/s3.js';

export const options = {
  stages: [
    {
      maxDuration: `${__ENV.TESTTIMEOUT}`,
      target: parseInt(__ENV.TESTUSERTARGET)
    },
  ],
};

const awsConfig = new AWSConfig({
  region: __ENV.AWS_REGION,
  accessKeyId: __ENV.AWS_ACCESS_KEY_ID,
  secretAccessKey: __ENV.AWS_SECRET_ACCESS_KEY,
  sessionToken: __ENV.AWS_SESSION_TOKEN,
});

const s3 = new S3Client(awsConfig);

export default async function() {
  const assetObjects = await s3.listObjects(__ENV.STAC_ASSET_BUCKET_NAME, `data/naip/${__ENV.TESTID}/`);

  console.log(assetObjects);
  console.log(assetObjects.filter((o) => o.key === `data/naip/${__ENV.TESTID}/${__ENV.STAC_ASSET_OBJECT_NAME}`)[0].etag);
  console.log(__ENV.STAC_ASSET_CANONICAL_CHECKSUM);
  check(assetObjects, {
    'output asset object exists on s3': (r) => r.filter((o) => o.key === `data/naip/${__ENV.TESTID}/${__ENV.STAC_ASSET_OBJECT_NAME}`).length > 0
  });
  
  check(assetObjects, {
    'output asset size matches canonical object': (r) => __ENV.STAC_ASSET_CANONICAL_SIZE == parseInt(r.filter((o) => o.key === `data/naip/${__ENV.TESTID}/${__ENV.STAC_ASSET_OBJECT_NAME}`)[0].size)
  });

  check(assetObjects, {
    'output asset checksum matches canonical object': (r) => __ENV.STAC_ASSET_CANONICAL_CHECKSUM == r.filter((o) => o.key === `data/naip/${__ENV.TESTID}/${__ENV.STAC_ASSET_OBJECT_NAME}`)[0].etag
  });
}
