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

export async function generateUploadURL(){
  const rawBytes = await randomBytes(16)
  const imageName = rawBytes.toString('hex')
  console.log(imageName)
  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60
  })

  const uploadURL = await s3.getSignedUrlPromise('PutObject', params)
  return uploadURL
}