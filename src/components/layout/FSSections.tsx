import { ReactNode, useEffect, useState } from "react";
import { Box, Slide, Tabs, Tab } from "@mui/material";
import { CustomButton } from "../buttons/CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";
import { CenteredFlexBox } from "../common/box/CenteredFlexBox";
import { Lyrics } from "../player/Lyrics";
import { FSPlayer } from "../player/FSPlayer";

import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import LyricsRoundedIcon from "@mui/icons-material/LyricsRounded";
import QueueMusicRoundedIcon from "@mui/icons-material/QueueMusicRounded";

interface Section {
  id: string;
  title: ReactNode | string;
  component: ReactNode;
}

interface FSSectionsProps {
  sections?: Section[];
  tabs?: boolean; // New prop to control rendering of buttons or tabs
}

export const FSSections = ({ sections, tabs = false }: FSSectionsProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const { isSmallScreen } = useLayout();

  const defaultSections = [
    {
      id: "lyrics",
      title: <LyricsRoundedIcon />,
      component: <Lyrics />,
    },
    {
      id: "queue",
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
                padding: 1,
                position:
                  activeSection === section.id ? "relative" : "absolute",
              }}
            >
              {section.component}
            </Box>
          </Slide>
        ))}
      </Box>

      {/* Bottom Row: Toggle Buttons or Tabs */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          height: isSmallScreen ? "fit-content" : "100%",
          width: isSmallScreen ? "100%" : "fit-content",
          justifyContent: "center",
          alignItems: "center",
          padding: tabs ? 0 : 1,
          gap: 5,
        }}
      >
        {tabs ? (
          <Tabs
            variant={sections.length > 5 ? "scrollable" : "fullWidth"}
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            value={activeSection}
            onChange={(_event, newValue) => handleToggleSection(newValue)}
            sx={{
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            {sections.map((section) => (
              <Tab
                key={section.id}
                value={section.id}
                label={section.title}
                sx={{ flexGrow: 1, minWidth: 0 }}
              />
            ))}
          </Tabs>
        ) : (
          // Render Buttons by default
          sections.map((section) => (
            <CustomButton
              key={section.id}
              borderRadius={25}
              variant={activeSection === section.id ? "contained" : "outlined"}
              onClick={() => handleToggleSection(section.id)}
            >
              {section.title}
            </CustomButton>
          ))
        )}
      </Box>
    </Box>
  );
};
