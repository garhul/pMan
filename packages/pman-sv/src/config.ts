const cfg = {
  server: {
    port: process.env['SV_PORT'] || 3000,
  },
  logger: {
    level: process.env['SV_LOGLEVEL'] || 'info'
  },
  storage: {
    driver: 'minio', //localFS | googleDrive
    endPoint: process.env['MINIO_ADDR'],
    port: process.env['MINIO_PORT'],
    useSSL: false,
    accessKey: process.env['MINIO_ACCESS_KEY'],
    secretKey: process.env['MINIO_SECRET'],
    bucket: process.env['MINIO_BUCKET']
  }
};

export default cfg;