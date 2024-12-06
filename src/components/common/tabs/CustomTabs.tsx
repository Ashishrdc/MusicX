import { Box, Tab, Tabs } from "@mui/material";
import { ReactNode, useState } from "react";

interface TabData {
  label: string;
  content: ReactNode;
}

interface CustomTabsProps {
  tabs: TabData[];
  tabStyles?: React.CSSProperties;
  containerStyles?: React.CSSProperties;
}

export const CustomTabs = ({
  tabs,
  tabStyles,
  containerStyles,
}: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box style={containerStyles}>
      <Tabs
        value={activeTab}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} style={tabStyles} />
        ))}
      </Tabs>
      <Box sx={{ marginTop: 2 }}>{tabs[activeTab].content}</Box>
    </Box>
  );
};
