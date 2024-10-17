import { ReactNode, useEffect, useState } from "react";
import { Box, Slide, Tabs, Tab, Divider } from "@mui/material";
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
      component: <CenteredFlexBox>Queue Content</CenteredFlexBox>,
    },
  ];

  // Use default sections if none are provided
  const [currentSections, setCurrentSections] = useState<Section[]>(
    sections || defaultSections
  );

  // Initialize with the first section's id
  const [activeSection, setActiveSection] = useState<string>(
    currentSections[0].id
  );

  const handleToggleSection = (id: string) => {
    setActiveSection(id);
  };

  useEffect(() => {
    // Update the sections based on the screen size
    if (isSmallScreen) {
      // Add 'now playing' section on small screens
      setCurrentSections([
        {
          id: "now playing",
          title: <PlayArrowRoundedIcon />,
          component: <FSPlayer />,
        },
        ...defaultSections,
      ]);
      setActiveSection("now playing"); // Automatically set "now playing" as active section on small screens
    } else {
      // Remove 'now playing' section on larger screens
      setCurrentSections(defaultSections);

      // If the active section is 'now playing', reset to the first valid section
      if (activeSection === "now playing") {
        setActiveSection(defaultSections[0].id);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallScreen]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        height: "100%",
        width: "100%",
        borderRadius: 2,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
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
        {currentSections.map((section) => (
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
      <Divider orientation={isSmallScreen ? "horizontal" : "vertical"} flexItem>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "black",
          }}
        />
      </Divider>
      {/* Bottom Row: Toggle Buttons or Tabs */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "row" : "column",
          height: isSmallScreen ? "fit-content" : "100%",
          width: isSmallScreen ? "100%" : "fit-content",
          justifyContent: "center",
          alignItems: "center",
          padding: tabs ? 0.5 : 1,
          gap: 5,
        }}
      >
        {tabs ? (
          <Tabs
            variant={currentSections.length > 5 ? "scrollable" : "fullWidth"}
            orientation={isSmallScreen ? "horizontal" : "vertical"}
            value={activeSection}
            onChange={(_event, newValue) => handleToggleSection(newValue)}
            sx={{
              width: isSmallScreen ? "100%" : "auto",
            }}
          >
            {currentSections.map((section) => (
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
          currentSections.map((section) => (
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
