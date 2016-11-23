export default {
  startRecord: startRecord,
  endRecord: endRecord
}

var chunks = []
var mediaRecorder = null

function startRecord() {
  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMeida ||
    navigator.mozGetUserMedia

  if (navigator.getUserMedia) {
    console.log('getUserMedia supported')
    navigator.getUserMedia({
        audio: true
      },

      function(stream) {
        mediaRecorder = new MediaRecorder(stream)

        mediaRecorder.start()
        console.log(mediaRecorder.state)

        mediaRecorder.ondataavailable = function(e) {
          chunks.push(e.data)
        }
      },
      function(err) {
        console.log('The following gUM error occured' + err)
      })

  } else {
    console.log("Your browser is not supported")
  }
}

function endRecord() {
  return new Promise(function(resolve, reject) {
    if (mediaRecorder) {
      try {
        mediaRecorder.stop()
        console.log(mediaRecorder.state)
      } catch (err) {
        reject(err)
      }
    } else {
      reject(new Error('Recording not started'))
    }

    mediaRecorder.onstop = function(e) {
      var clipName = prompt('Enter a name of your sound clip')
      var clipAuthor = prompt('Who recorded the sound clip?')
      var clipDescription = prompt('Tell me about the sound')
      var blob = new Blob(chunks, {
        mimeType: 'audio/wav'
      })
      var clipInfo = {
        clipName,
        clipAuthor,
        clipDescription,
        blob
      }
      chunks = []
      resolve(clipInfo)
    }
  })
}
