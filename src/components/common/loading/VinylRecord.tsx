import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const VinylContainer = styled(Box)(() => ({
  width: 100,
  height: 100,
  borderRadius: "50%",
  background: "radial-gradient(circle, #000 40%, #333 60%)",
  position: "relative",
  animation: "spin 2s linear infinite",
  "@keyframes spin": {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" },
  },
}));

const Record = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  position: "absolute",
  top: 10,
  left: 10,
}));

const CenterHole = styled(Box)(() => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  backgroundColor: "#333",
  position: "absolute",
  top: "45%",
  left: "45%",
}));

export const VinylRecord = () => (
  <VinylContainer>
    <Record />
    <CenterHole />
  </VinylContainer>
);

export default VinylRecord;
