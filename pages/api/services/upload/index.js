const cloud_config = require("../../config/upload");
const { convertToMB } = require("../../helpers");
const fs = require("fs");
const mime = require('mime');
const path = require("path");
const provider = cloud_config[process.env.DEFAULT_UPLOAD_PROVIDER];
// Load the AWS SDK for Node.js
const AWS = require("aws-sdk");
// Set the region
AWS.config.update({
  region: provider.region,
  secretAccessKey: provider.secret,
  accessKeyId: provider.key,
});
// Create S3 service object
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
export const upload = async (
  file,
  dirPath,
  allowed_types,
  allowed_size,
  secure_this_file = true
) => {
  try {
    const fileSize = convertToMB(file.size);
    if (allowed_types.includes(file.mimetype) && fileSize <= allowed_size) {
      let data = fs.readFileSync(file.filepath);
      let lastChar = dirPath.substr(-1); // Selects the last character
      if (lastChar != '/') {         // If the last character is not a slash
        dirPath = dirPath + '/';            // Append a slash to it.
      }
      let uploadParams = {
        Bucket: provider.bucket,
        Key: `${dirPath}${file.newFilename}_${file.originalFilename}`,
        Body: data
      };
      if (!secure_this_file) {
        uploadParams['ACL'] = "public-read";
      }
      return new Promise((resolve, reject) => {
        // call S3 to retrieve upload file to specified bucket
        s3.upload(uploadParams, function (err, data) {
          if (err) {
            resolve({ success: false, message: "File upload error" });
          }
          if (data) {
            resolve({ success: true, url: data.Location });
          }
        });
      });
    } else {
      return { success: false, message: "Please check file size and type" };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong." };
  }
};

export const download = async (fileUrl) => {
  fileUrl = decodeURIComponent(fileUrl);
  let baseUrl = `https://${provider.bucket}.s3.${provider.region}.amazonaws.com/`;
  let fileKey = fileUrl.replace(baseUrl, "");
  let mimeType = mime.getType(fileKey);
  const params = {
    Bucket: provider.bucket,
    Key: fileKey
  }
  let response = await s3.getObject(params).promise();
  let base64String = response.Body.toString('base64');
  let fileName = path.basename(fileKey);
  fileName = fileName.substring(fileName.indexOf('_') + 1);
  return {
    name: fileName,
    content_type: mimeType,
    data: base64String
  };
}