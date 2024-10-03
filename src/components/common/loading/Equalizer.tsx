import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const EqualizerContainer = styled(Box)(() => ({
  display: "flex",
  width: 100,
  height: 30,
  alignItems: "flex-end",
  justifyContent: "center",
}));

const Bar = styled(Box)(({ theme }) => ({
  width: 10,
  height: 20,
  margin: "0 1px",
  backgroundColor: theme.palette.primary.main,
  animation: "equalizer 1s infinite ease-in-out",
  "@keyframes equalizer": {
    "0%": { height: 10 },
    "50%": { height: 30 },
    "100%": { height: 10 },
  },
}));

export const Equalizer = () => (
  <EqualizerContainer>
    {[...Array(5)].map((_, i) => (
      <Bar key={i} style={{ animationDelay: `${i * 0.1}s` }} />
    ))}
  </EqualizerContainer>
);

export default Equalizer;
