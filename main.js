import { initAudioContext, preloadAllTracks, togglePlayPause, stopTracks, toggleLocalTrackPlayPause, 
  toggleMute, setVolume, toggleSolo, switchTrackLevel, initialLevels, downloadPDF } from './audioLogic.js';

  const trackSources = [
    './tracks/lvl1/drums_lvl1.mp3',
    './tracks/lvl1/bass_lvl1.mp3',
    './tracks/lvl1/guitar_lvl1.mp3',
    './tracks/lvl1/keyboard_lvl1.mp3',
    './tracks/lvl1/altoSax_lvl1.mp3',
    './tracks/lvl1/trombone_lvl1.mp3',
    './tracks/Infini_prod.mp3',
];

const trackNames = [
    'drums.png',
    'bass.png',
    'guitar.png',
    'keyboard.png',
    'altoSax.png',
    'trombone.png',
    'prod.png'
];

document.addEventListener('DOMContentLoaded', async () => {
    await initAudioContext();
    await preloadAllTracks(trackSources);
    createTrackControls(trackSources.length);
});

function createTrackControls(numTracks) {
    const container = document.getElementById('track-controls-container');

    for (let i = 0; i < numTracks; i++) {
        const trackControl = document.createElement('div');
        trackControl.className = 'track-control';
        trackControl.id = `track-${i}`;

        const initialLevelImage = `images/Levels/lvl${initialLevels[i]}.png`;
        const instrumentName = trackNames[i].split('.')[0];

        trackControl.innerHTML = `
        <div class="track-title">
        <img src="images/Instruments/${trackNames[i]}" alt="${instrumentName}" class="track-title-image">
        </div>
        <div class="upper-part">
          <div class="left-buttons">
            <img src="images/Solo/Solo.png" alt="Solo" class="track-button mute-button" onclick="toggleSolo(${i})" id="soloButton-${i}" style="cursor: pointer;">
            <img src="images/Mute/mute.png" alt="Mute" class="track-button mute-button" onclick="toggleMute(${i})" id="muteButton-${i}" style="cursor: pointer;">
            <img src="${initialLevelImage}" alt="Level" class="track-button level-button" onclick="switchTrackLevel(${i})" id="levelButton-${i}" style="cursor: pointer;">
            <img src="images/Download/Download.png" alt="Download" class="track-button level-button" onclick="downloadPDF('${i}', ${initialLevels[i]})" id="downloadButton-${i}">
            </div>
          <div class="volume-control">
            <input type="range" min="0" max="100" value="100" id="volume-slider-${i}" onchange="setVolume(${i}, this.value)">
          </div>
        </div>
        <div class="lower-part">
        <div class="play-pause-button">
          <img src="images/PlayPause/Play_pause_neg.png" alt="Play/Pause" onclick="handleLocalTrackPlayPause(${i})" id="playPauseButton-${i}" style="cursor: pointer;">
        </div>
      </div>
    `;
  
      container.appendChild(trackControl);
    }

        const generalTrackControl = document.createElement('div');
        generalTrackControl.className = 'general-track-control';

        generalTrackControl.innerHTML = `
        <div class="track-title">
                <img src="images/Instruments/general.png" class="track-title-image">
        </div>
      <div class="upper-part">
      <div class="left-buttons">
        <img src="images/Stop/Stop_neg.png" alt="Stop" class="track-button stop-button" onclick="stopTrack()" id="stopButton" style="cursor: pointer;">
      </div>
      <div class="volume-control">
        <input type="range" min="0" max="100" value="100" id="volume-slider-${numTracks}" onchange="setAllVolumes(this.value)">
      </div>
    </div>
    <div class="lower-part">
      <div class="play-pause-button">
        <img src="images/PlayPause/Play_pause_neg.png" alt="Play/Pause" onclick="handlePlayPause()" id="playPauseButton" style="cursor: pointer;">
      </div>
    </div>
    `;

  container.appendChild(generalTrackControl);
}

  
  window.handlePlayPause = async () => {
    await togglePlayPause();
  };
  
  window.stopTrack = () => {
    stopTracks();
  };
  
  window.toggleMute = toggleMute;
  window.setVolume = (trackIndex, volume) => {
    setVolume(trackIndex, volume);
  };
  window.setAllVolumes = (volume) => {
    for (let i = 0; i < trackSources.length; i++) {
        setVolume(i, volume);
        document.getElementById(`volume-slider-${i}`).value = volume;  // Sync individual sliders
    }
};

window.toggleSolo = (trackIndex) => {
  toggleSolo(trackIndex);
};

window.handleLocalTrackPlayPause = (trackIndex) => {
  toggleLocalTrackPlayPause(trackIndex);
}

window.switchTrackLevel = (trackIndex) => {
  switchTrackLevel(trackIndex);
}

window.downloadPDF = (instrumentName, initialLevels) => {
  downloadPDF(instrumentName, initialLevels);
}