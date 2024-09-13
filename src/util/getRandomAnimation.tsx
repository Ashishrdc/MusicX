import {
  Equalizer,
  Headphones,
  MusicNotes,
  VinylRecord,
  Waveform,
} from "../components/common/loading";

export const getRandomAnimation = () => {
  const animations = [
    <Equalizer key="equalizer" />,
    <Headphones key="pulseCircle" />,
    <MusicNotes key="musicNoteWave" />,
    <VinylRecord key="spinningVinyl" />,
    <Waveform key="spectrumBars" />,
  ];

  // Return a random animation component
  return animations[Math.floor(Math.random() * animations.length)];
};
