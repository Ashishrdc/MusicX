import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const WaveformContainer = styled(Box)(() => ({
  display: "flex",
  width: 100,
  alignItems: "flex-end",
}));

const Wave = styled(Box)(({ theme }) => ({
  width: 8,
  height: "100%",
  backgroundColor: theme.palette.primary.main,
  margin: "0 2px",
  animation: "wave 0.8s infinite ease-in-out",
  "@keyframes wave": {
    "0%": { height: 20 },
    "50%": { height: 40 },
    "100%": { height: 20 },
  },
}));

export const Waveform = () => (
  <WaveformContainer>
    {[...Array(10)].map((_, i) => (
      <Wave key={i} style={{ animationDelay: `${i * 0.05}s` }} />
    ))}
  </WaveformContainer>
);

export default Waveform;
