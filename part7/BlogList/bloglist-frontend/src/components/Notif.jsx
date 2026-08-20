import { useNotificationValue } from "../contexts/NotificationContexts";
import { Typography, Box } from "@mui/material";

const Notification = () => {
  const notification = useNotificationValue();

  if (!notification) return null;

  return (
    <Box
      sx={{
        mt: 1,
        p: 3,
        maxWidth: 480,
        border: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Typography>{notification}</Typography>
    </Box>
  );
};

export default Notification;
