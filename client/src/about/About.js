import React from "react";

function About() {
  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      <h1>About</h1>
      <p>Discover Weekly Archiver was created by Kyra Kwak.</p>
      <p>
        This application uses the{" "}
        <a href="https://developer.spotify.com/documentation/web-api/">
          Spotify Web API
        </a>{" "}
        to access your account and get your Discover Weekly songs.
      </p>
    </div>
  );
}

export default About;
