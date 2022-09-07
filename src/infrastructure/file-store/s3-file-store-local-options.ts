export const defaultLocalS3Options = {
  bucketName: "local",
  endpoint: "http://127.0.0.1:9002",
  s3Options: {
    accessKeyId: "minioadmin",
    secretAccessKey: "minioadmin",
    endpoint: "http://127.0.0.1:9002",
    s3ForcePathStyle: true,
    signatureVersion: "v4",
  },
};
