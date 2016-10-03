import request from 'aws-sdk/dist/aws-sdk'

export default {
  getAudio: getAudio,
  audioDetails: audioDetails,
  addAudio: addAudio,
  addFile: addFile,
  delAudio: delAudio
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

function audioDetails(clipName, cb) {
  console.log(clipName)
  const params = {
    Bucket: 'audio-foley-base',
    Key: clipName
    // Key: "andrew-tues.ogg"
  }
  s3bucket.getObject(params, function(err, data) {
    let details = []
    if (!err) {
      console.log(this.httpResponse)
      details = data
      console.log(details)
      cb(null, details)
    } else {
      cb(err)
    }
  })

}

function addAudio(clipInfo) {
  return new Promise(function(resolve, reject) {
    if (clipInfo) {
      try {
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
            console.log("Error uploading data: ", err)
          } else {
            console.log("Successfully uploaded data to audio-foley-base bucket")
          }
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

function addFile(file) {
  console.log(file)
  return new Promise(function(resolve, reject) {
    if (file) {
      try {
        var params = {
          Key: 'upload',
          Body: file
        }
        s3bucket.upload(params, function(err, file) {
          if (err) {
            console.log("Error uploading data: ", err)
          } else {
            console.log("Successfully uploaded data to audio-foley-base bucket")
          }
        })
      } catch (err) {
        reject(err)
      }
    } else {
      reject(new Error('could not upload file'))
    }
    resolve()
  })
}

function delAudio(clipName) {
  return new Promise(function(resolve, reject) {
    if (clipName) {
      try {
        var params = {
          Key: clipName
        }
        s3bucket.deleteObject(params, function(err, clipName) {
          if (err) {
            console.log(err, err.stack)
          } else {
            console.log("deleted clip")
          }
        })
      } catch (err) {
        reject(err)
      }
    } else {
      reject(new Error('could not delete file'))
    }
    resolve()
  })
}
