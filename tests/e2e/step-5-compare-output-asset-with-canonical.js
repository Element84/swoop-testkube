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
  region: __ENV.RUNNER_REGION,
  accessKeyId: __ENV.RUNNER_ACCESSKEYID,
  secretAccessKey: __ENV.RUNNER_SECRETACCESSKEY,
});

const s3 = new S3Client(awsConfig);

export default async function() {
  const assetObjects = await s3.listObjects(__ENV.STAC_ASSET_BUCKET_NAME, `data/naip/${__ENV.TESTID}/`);

  check(assetObjects, {
    'output asset object exists on s3': (r) => objects.filter((r) => r.key === __ENV.STAC_ASSET_OBJECT_NAME).length > 0
  });
  
  check(assetObjects, {
    'output asset size matches canonical object': (r) => __ENV.STAC_ASSET_CANONICAL_SIZE == parseInt(objects.filter((r) => r.key === __ENV.STAC_ASSET_OBJECT_NAME)[0].size)
  });

  check(assetObjects, {
    'output asset checksum matches canonical object': (r) => __ENV.STAC_ASSET_CANONICAL_CHECKSUM == objects.filter((r) => r.key === __ENV.STAC_ASSET_OBJECT_NAME)[0].etag
  });
}
