import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

const MusicNotesContainer = styled(Box)(() => ({
  display: "flex",
  width: 100,
  justifyContent: "space-between",
}));

const Note = styled(Box)(({ theme }) => ({
  width: 20,
  height: 60,
  backgroundColor: theme.palette.primary.main,
  animation: "bounce 0.5s infinite alternate",
  "@keyframes bounce": {
    "0%": { transform: "translateY(0)" },
    "100%": { transform: "translateY(-20px)" },
  },
}));

export const MusicNotes = () => (
  <MusicNotesContainer>
    {[...Array(4)].map((_, i) => (
      <Note key={i} style={{ animationDelay: `${i * 0.1}s` }} />
    ))}
  </MusicNotesContainer>
);

export default MusicNotes;
