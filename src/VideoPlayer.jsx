import Hls from 'hls.js';
import React, { useEffect, useRef } from 'react';
import './App.css'

const VideoPlayer = ({ url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();

      hls.loadSource(url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('Manifest parsed');
        video.play().catch(error => console.error('Error playing video:', error));
      });

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error('HLS.js error:', data.fatal, data);
      });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = url;
      video.play().catch(error => console.error('Error playing video:', error));
    } else {
      console.error('HLS is not supported and video type is not supported.');
    }
  }, [url]);

  return (
    <div className='center'>
      <video className='mp3' ref={videoRef} controls width="" />
    </div>
  );
};

export default VideoPlayer;
