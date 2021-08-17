import React, { useEffect, useState } from "react";
import {getDiscoverWeekly} from "../utils/spotifyApi";

function LoggedIn() {

  const [playlists, setPlaylists] = useState([]);

  useEffect(loadDiscoverWeekly, []);

  function loadDiscoverWeekly() {
    const playlistsarr = getDiscoverWeekly();
    setPlaylists(playlistsarr);
  }

  return (
    <div>
      {playlists.map((pl) => <p>{pl}</p>)}
    </div>
  )
}

export default LoggedIn;