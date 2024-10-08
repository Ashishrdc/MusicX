import { ReactNode, useEffect, useState } from "react";
import { Box, Slide, useTheme } from "@mui/material";
import { CustomButton } from "../buttons/CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";
import { createGradient } from "../../util/helperFunctions";
import { CenteredFlexBox } from "../common/box/CenteredFlexBox";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";
import { Lyrics } from "../player/Lyrics";
import { FSPlayer } from "../player/FSPlayer";
interface Section {
  id: string;
  title: ReactNode;
  component: ReactNode;
}

interface FSSectionsProps {
  sections?: Section[];
}

export const FSSections = ({ sections }: FSSectionsProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const { isSmallScreen } = useLayout();
  const theme = useTheme();

  const defaultSections = [
    {
      id: "lyrics",
      title: <LyricsRoundedIcon />,
      component: <Lyrics />,
    },
    {
      id: "section3",
      title: <QueueMusicRoundedIcon />,
      component: <CenteredFlexBox>Section 3</CenteredFlexBox>,
    },
  ];

  if (!sections) {
    sections = defaultSections;
  }

  if (isSmallScreen)
    sections.unshift({
      id: "player",
      title: <PlayArrowRoundedIcon />,
      component: <FSPlayer />,
    });

  const handleToggleSection = (id: string) => {
    setActiveSection(id);
  };

  useEffect(() => {
    setActiveSection(sections[0].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallScreen]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        height: "100%",
        width: "100%",
      }}
    >
      {/* Top Row: Content */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {sections.map((section) => (
          <Slide
            key={section.id}
            direction={!isSmallScreen ? "up" : "left"}
            in={activeSection === section.id}
            mountOnEnter
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                position:
                  activeSection === section.id ? "relative" : "absolute",
              }}
            >
              {section.component}
            </Box>
          </Slide>
        ))}
      </Box>

      {/* Bottom Row: Toggle Buttons */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          height: isSmallScreen ? "fit-content" : "100%",
          width: isSmallScreen ? "100%" : "fit-content",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: createGradient(theme.palette.secondary.main),
          padding: 1,
          gap: 5,
        }}
      >
        {sections.map((section) => (
          <CustomButton
            key={section.id}
            borderRadius={25}
            variant={activeSection === section.id ? "contained" : "outlined"}
            onClick={() => handleToggleSection(section.id)}
          >
            {section.title}
          </CustomButton>
        ))}
      </Box>
    </Box>
  );
};
