import request from 'aws-sdk/dist/aws-sdk'
const dotenv = require('dotenv')
dotenv.load()

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

function addAudio(clipInfo) {
  return new Promise(function(resolve, reject) {
    if (clipInfo) {
      try {
        var params = {
          Key: clipInfo.clipAuthor + '-' + clipInfo.clipName + '.wav',
          Body: clipInfo.blob,
          Metadata: {
            author: clipInfo.clipAuthor,
            clipName: clipInfo.clipName,
            clipDescription: clipInfo.clipDescription
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
  return new Promise(function(resolve, reject) {
    if (file) {
      try {
        var clipName = prompt('Enter a name of your sound clip', file.name)
        var clipAuthor = prompt('Who recorded the sound clip?', file.name)
        var clipDescription = prompt('Tell me about the sound', file.name)
        var params = {
          Key: file.name,
          Body: file,
          Metadata: {
            author: clipAuthor,
            clipName: clipName,
            clipDescription: clipDescription
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
