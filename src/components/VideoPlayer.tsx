import * as React from "react";
import { render } from "react-dom";
import Hls from "hls.js";

interface Props {
  url: string
}

function VideoPlayer(props: Props) {
    const [hls, setHls] = React.useState(new Hls());
    const videoEl = React.useRef(null);
  
    React.useEffect(() => {
      if (videoEl.current) {
        hls.attachMedia(videoEl.current);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls.loadSource(
            props.url
          );
        });
      }
  
      return () => {
        if (hls) {
          hls.destroy();
        }
        setHls(null as any);
      };
    });
  
    return (
      <div className="App">
        <video ref={videoEl} controls />
      </div>
    );
}

export default VideoPlayer