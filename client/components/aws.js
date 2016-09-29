import request from 'aws-sdk/dist/aws-sdk'

export default {
  getAudio: getAudio,
  addAudio: addAudio
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

function addAudio(clipInfo) {
  return new Promise(function(resolve, reject) {

    if (clipInfo) {
      try {
        s3bucket.createBucket(function() {
          var params = {
            Key: clipInfo.clipAuthor + '-' + clipInfo.clipName + '.ogg',
            Body: clipInfo.blob,
            Metadata: {
              author: clipInfo.clipAuthor,
              clipName: clipInfo.clipName
            }
          }
          s3bucket.upload(params, function(err, data) {
            if (err) {
              console.log("Error uploading data: ", err);
            } else {
              console.log("Successfully uploaded data to audio-foley-base bucket")
            }
          })
        })
      } catch (err) {
        reject(err)
      }
    } else {
      reject(new Error('could not get clipInfo'))
    }
    resolve()
  })
}
