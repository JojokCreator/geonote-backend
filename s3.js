import aws from 'aws-sdk';
import crypto from 'crypto';
import { promisify } from 'util';
const randomBytes = promisify(crypto.randomBytes)

const region=process.env.AWS_REGION
const accessKeyId=process.env.ASIAWCJ5L2TDXE72JOXO
const secretAccessKey=process.env.AWS_SECRET_ACCESS_KEY
const bucketName="cyclic-cyan-embarrassed-worm-eu-west-3"
const token=process.env.AWS_SESSION_TOKEN

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4'
})

export async function generateUploadURL() {
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })
  
  const uploadURL = await s3.getSignedUrlPromise('putObject', params)
  console.log(uploadURL)
  return uploadURL
}
export async function generateSignedURL(url) {

  const params = ({
    Bucket: bucketName,
    Key: url,
    Expires: 86400,
  })
  
  const image_url = s3.getSignedUrl('getObject', params)
  console.log(image_url)
  return image_url
}