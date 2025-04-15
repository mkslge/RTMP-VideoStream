# RTMP to HLS Streaming Server

This is a lightweight Node.js server that uses **FFmpeg** to pull a live **RTMP stream**, converts it to **HLS**

## Features

- Converts RTMP input to HLS using FFmpeg
- Serves `.m3u8` playlists and `.ts` video segments
- Automatically creates a `streams/` directory if it doesn't exist
- Simple static file server (ideal for hosting an HTML video player)

## Prerequisites

- [Node.js](https://nodejs.org/) installed
- [FFmpeg](https://ffmpeg.org/) installed 

## Installation

Clone this repo:

```bash
git clone https://github.com/mkslge/RTMP-VideoStream/
cd RTMP-VideoStream/
npm install
```

Then to run the program:
```bash
node server.js rtmp://IP_ADDRESS/live/stream
```
