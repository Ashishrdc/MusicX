import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeadphonesContainer = styled(Box)(() => ({
  width: 100,
  height: 60,
  position: "relative",
}));

const Earcup = styled(Box)(({ theme }) => ({
  width: 30,
  height: 30,
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  position: "absolute",
  top: 0,
  animation: "bounce 1s infinite alternate",
  "@keyframes bounce": {
    "0%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(-10px)" },
  },
}));

const LeftEarcup = styled(Earcup)({
  left: 10,
});

const RightEarcup = styled(Earcup)({
  right: 10,
});

const Headband = styled(Box)(({ theme }) => ({
  width: 60,
  height: 10,
  backgroundColor: theme.palette.primary.main,
  position: "absolute",
  top: 30,
  left: 20,
}));

export const Headphones = () => (
  <HeadphonesContainer>
    <LeftEarcup />
    <RightEarcup />
    <Headband />
  </HeadphonesContainer>
);

export default Headphones;
