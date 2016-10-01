var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var ReactS3Uploader = require('react-s3-uploader')


var PORT = process.env.PORT || 3000
var app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: "audio-foley-base",
    ACL: 'private'
}))

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
