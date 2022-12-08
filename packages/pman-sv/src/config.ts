const cfg = {
  server: {
    port: process.env['SV_PORT'] || 3000,
  },
  logger: {
    level: process.env['SV_LOGLEVEL'] || 'info'
  },
  storage: {
    driver: 'localFS', //localFS | googleDrive
    localFSPath: '', //TODO:: determine where to put stuff, 
  }
};

export default cfg;