import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from "@aws-sdk/client-s3"

// Step 2: The s3Client function validates your request and directs it to your Space's specified endpoint using the AWS SDK.
const s3Client = new S3Client({
  endpoint: "fra1.digitaloceanspaces.com", // Find your endpoint in the control panel, under Settings. Prepend "https://".
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  region: "fra1", // Must be "us-east-1" when creating new Spaces. Otherwise, use the region in your endpoint (e.g. nyc3).
  credentials: {
    accessKeyId: process.env.DIGITALOCEAN_SPACES_KEY, // Access key pair. You can create access key pairs using the control panel or API.
    secretAccessKey: process.env.DIGITALOCEAN_SPACES_SECRET, // Secret access key defined through an environment variable.
  },
})

const bucket = "lost-dot-staging"

export const getFileByID = async (key: string) =>
  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
    })
  )

export const uploadFile = async (key: string, file) => {
  // Step 3: Define the parameters for the object you want to upload.
  const params = {
    Bucket: bucket, // The path to the directory you want to upload the object to, starting with your Space name.
    Key: key, // Object key, referenced whenever you want to access this file later.
    Body: file, // The object's contents. This variable is an object, not a string.
    ACL: "private", // Defines ACL permissions, such as private or public.
    // Metadata: {
    //   // Defines metadata tags.
    //   "x-amz-meta-my-key": "your-value",
    // },
  }

  // Step 4: Define a function that uploads your object using SDK's PutObjectCommand object and catches any errors.
  try {
    const data = await s3Client.send(new PutObjectCommand(params))
    console.log(
      "Successfully uploaded object: " + params.Bucket + "/" + params.Key
    )
    return data
  } catch (err) {
    console.log("Error", err)
  }
}
