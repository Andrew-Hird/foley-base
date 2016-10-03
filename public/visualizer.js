  navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMeida ||
    navigator.mozGetUserMedia

  var canvas = document.querySelector('.visualizer')
  var audioCtx = new(window.AudioContext || webkitAudioContext)();
  var canvasCtx = canvas.getContext("2d");

  if (navigator.getUserMedia) {
    navigator.getUserMedia({
        audio: true
      },

      function(stream) {
        var audioCtx = new(window.AudioContext || window.webkitAudioContext)()
        var analyser = audioCtx.createAnalyser()

        var source = audioCtx.createMediaStreamSource(stream);
        source.connect(analyser);

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        analyser.getByteTimeDomainData(dataArray);

        analyser.fftSize = 2048;
        var bufferLength = analyser.frequencyBinCount;
        var dataArray = new Uint8Array(bufferLength);

        var WIDTH = canvas.width
        var HEIGHT = canvas.height
        canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

        draw()

        function draw() {
          var drawVisual = requestAnimationFrame(draw)
          analyser.getByteTimeDomainData(dataArray);
          canvasCtx.fillStyle = 'tomato';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
          canvasCtx.lineWidth = 2;
          canvasCtx.strokeStyle = 'black';

          canvasCtx.beginPath();

          var sliceWidth = WIDTH * 1.0 / bufferLength;
          var x = 0;

          for (var i = 0; i < bufferLength; i++) {

            var v = dataArray[i] / 128.0;
            var y = v * HEIGHT / 2;

            if (i === 0) {
              canvasCtx.moveTo(x, y);
            } else {
              canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
          }

          canvasCtx.lineTo(canvas.width, canvas.height / 2);
          canvasCtx.stroke();
        };
      },
      function(err) {
        console.log('The following gUM error occured' + err)
      })
  }
