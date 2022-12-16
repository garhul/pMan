import cfg from '../../config';
const Minio = require('minio')

const client = new Minio.Client({
    endPoint: '',
    port: 9000,
    useSSL: true,
    accessKey: 'Q3AM3UQ867SPQQA43P2F',
    secretKey: 'zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG'
})

export async function getPresignedUrl(filename:string): Promise<string> {
  return new Promise((resolve, reject) => {
    client.presignedPutObject('uploads', filename, (err, url) => {
      if (err) {
        reject(err);
      }else{
        resolve(url);
      }
    });
  });  
}