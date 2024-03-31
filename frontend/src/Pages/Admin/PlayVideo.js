import React, { useEffect } from "react";
import YouTube from "react-youtube";

const PlayVideo = () => {
  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return <YouTube videoId="VGUItmV-q-4" opts={opts} />;

  //   const embeded = `<iframe width="560" height="315" src="https://www.youtube.com/embed/Qqn1iGB5Rhk?si=YzMHFf6vBuyt1TOj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  //   useEffect(() => {
  //     document.getElementById("trailer").innerHTML += embeded;
  //   }, []);
  //   const trailer = "https://youtu.be/Qqn1iGB5Rhk?si=6WAS3gr5wMbUzHqq";
  //   return (
  //     <div id="trailer">
  //       <iframe
  //         width="560"
  //         height="315"
  //         src={trailer}
  //         title="YouTube video player"
  //         frameborder="0"
  //         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  //         referrerpolicy="strict-origin-when-cross-origin"
  //         allowfullscreen
  //       ></iframe>
  //     </div>
  //   );
};

export default PlayVideo;
