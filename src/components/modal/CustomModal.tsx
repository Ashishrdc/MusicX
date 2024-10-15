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
            width: { sm: "50%", md: "40%" },
            backgroundColor: "background.paper",
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                height: "100%",
              }}
            >
              <Typography variant="h4" fontWeight={600}>
                {title ? title : ""}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "fit-content",
                height: "100%",
              }}
            >
              <CustomButton color="error" onClick={onClose}>
                <CloseIcon />
              </CustomButton>
            </Box>
          </Box>

          {children}
        </Box>
      </Fade>
    </Modal>
  );
};
