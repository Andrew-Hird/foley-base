import request from 'aws-sdk/dist/aws-sdk'

export default {
  getAudio: getAudio,
  audioDetails: audioDetails,
  addAudio: addAudio,
  addFile: addFile,
  delAudio: delAudio
}

AWS.config.update({
  accessKeyId: process.env.AWS_SECRET_KEY,
  secretAccessKey: process.env.AWS_ACCESS_KEY_ID
})

const s3bucket = new AWS.S3({
  params: {
    Bucket: 'audio-foley-base'
  }
})

let allAudio = []
function getAudio(cb) {
  allAudio = []
  const params = {
    Bucket: 'audio-foley-base'
  }

  s3bucket.listObjects(params, function(err, data) {
    let audio = []
    if (!err) {
      audio = data.Contents
      for (var i = 0; i < audio.length; i++) {
        audioDetails(audio[i].Key, cb)
      }
      cb(null, allAudio)
    } else {
      cb(err)
    }
  })
}

function audioDetails(fileName, cb) {
  const params = {
    Bucket: 'audio-foley-base',
    Key: fileName
  }
  s3bucket.getObject(params, function(err, data) {
    let details = []
    if (!err) {
      allAudio.push({
        Key: fileName,
        author: data.Metadata.author,
        clipName: data.Metadata.clipname,
        clipDescription: data.Metadata.clipdescription
      })
      cb(null, allAudio)
    } else {
      cb(err)
    }
  })
}

function addAudio(audio, clipName, recordist, description) {
  return new Promise(function(resolve, reject) {
    if (audio) {
      try {
        var params = {
          Key: recordist + '-' + clipName + '.wav',
          Body: audio,
          Metadata: {
            author: recordist,
            clipName: clipName,
            clipDescription: description
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

function addFile(upload, clipName, recordist, description) {
  return new Promise(function(resolve, reject) {
    if (upload) {
      try {
        var params = {
          Key: recordist + '-' + clipName + '.wav',
          Body: upload,
          Metadata: {
            author: recordist,
            clipName: clipName,
            clipDescription: description
          }
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
