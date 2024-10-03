import React from "react";
import { Box, Modal, Fade, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "../buttons/CustomButton";

interface CustomModalProps {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode; // Accepts children (JSX elements)
}

export const CustomModal = ({
  open,
  title,
  onClose,
  children,
}: CustomModalProps) => {
  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "80%",
            width: { xs: "90%", sm: "70%", md: "40%" },
            backgroundColor: "background.paper",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 1,
            }}
          >
            <Typography variant="h4" fontWeight={600}>
              {title ? title : ""}
            </Typography>
            <CustomButton onClick={onClose}>
              <CloseIcon />
            </CustomButton>
          </Box>

          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
