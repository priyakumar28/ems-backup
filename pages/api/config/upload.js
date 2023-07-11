module.exports = {
    provider: process.env.DEFAULT_UPLOAD_PROVIDER,
    aws: {
        secret: process.env.AWS_SECRET_ACCESS_KEY,
        key: process.env.AWS_ACCESS_KEY_ID,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET
    },
    azure: {
        secret: process.env.ACCESS_SECRET,
        key: process.env.ACCESS_KEY,
        region: process.env.REGION,
        bucket: process.env.BUCKET
        
    }
}

