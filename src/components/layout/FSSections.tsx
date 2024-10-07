import { ReactNode, useEffect, useState } from "react";
import { Box, Slide } from "@mui/material";
import { CustomButton } from "../buttons/CustomButton";
import { useLayout } from "../../context/layout/LayoutContext";

interface Section {
  id: string;
  title: ReactNode;
  component: ReactNode;
}

interface FSSectionsProps {
  sections: Section[];
}

export const FSSections = ({ sections }: FSSectionsProps) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const { isSmallScreen } = useLayout();

  const handleToggleSection = (id: string) => {
    setActiveSection(id);
  };

  useEffect(() => {
    setActiveSection(sections[0].id);
  }, [isSmallScreen, sections]);

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
            unmountOnExit
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
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          padding: 1,
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
