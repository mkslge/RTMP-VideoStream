const express = require('express');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

const app = express();
const port = 3000;

//serve static files (HTML and HLS stream)
app.use(express.static(path.join(__dirname, 'public')));
app.use('/streams', express.static(path.join(__dirname, 'streams')));

//make sure the streams directory exists
const streamDir = path.join(__dirname, 'streams');
if (!fs.existsSync(streamDir)) {
    fs.mkdirSync(streamDir);
}

//start FFmpeg to pull RTMP and convert to HLS
const rtmpUrl = process.argv[2] 
console.log(`Streaming RTMP from ${rtmpUrl}`)

//run ffmpeg cmd
const ffmpeg = spawn('ffmpeg', [
    '-i', rtmpUrl,
    '-c:v', 'libx264',
    '-c:a', 'aac',
    '-f', 'hls',
    '-hls_time', '2',
    '-hls_list_size', '5',
    '-hls_flags', 'delete_segments',
    path.join(streamDir, 'index.m3u8')
]);

//error log
ffmpeg.stderr.on('data', (data) => {
    console.error(`FFmpeg stderr: ${data}`);
});

//exit
ffmpeg.on('close', (code) => {
    console.log(`FFmpeg exited with code ${code}`);
});

const os = require('os');

const ip = Object.values(os.networkInterfaces())
  .flat()
  .find((i) => i.family === 'IPv4' && !i.internal).address;

//start message
app.listen(port, ip, () => {
    console.log(`Server started at http://${ip}:${port}`);
});
