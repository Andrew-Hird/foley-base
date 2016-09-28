import request from 'aws-sdk/dist/aws-sdk'

export default {
    getAudio: getAudio
}

const AWS = window.AWS
AWS.config.update({
    accessKeyId: 'AKIAJPMFMWBUYEU6MURA',
    secretAccessKey: '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'
})

const s3bucket = new AWS.S3({
    params: {
        Bucket: 'audio-foley-base'
    }
})

function getAudio(cb) {
    const params = {
        Bucket: 'audio-foley-base'
    }

    s3bucket.listObjects(params, function(err, data) {
      let audio = []
        if (!err) {
            audio = data.Contents
            cb(null, audio)
        } else {
            cb(err)
        }
    })
}
