import React, { useState } from "react";
import {
  Avatar,
  Box,
  Menu,
  MenuItem,
  Typography,
  ListItemIcon,
  Divider,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface UserAvatarProps {
  onLogout: () => Promise<void>;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ onLogout, size }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { userPhoto, userName } = useUser();
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/perfil");
    handleClose();
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await onLogout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setIsLoggingOut(false);
      handleClose();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          "&:hover": {
            opacity: 0.8,
          },
        }}
        onClick={handleClick}
      >
        <Avatar src={userPhoto} sx={{ width: size, height: size }} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {userName}
        </Typography>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 64, left: window.innerWidth }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            width: "200px",
            "& .MuiMenuItem-root": {
              py: 2.5,
            },
          },
        }}
      >
        <MenuItem onClick={handleProfile}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Perfil</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} disabled={isLoggingOut}>
          <ListItemIcon>
            {isLoggingOut ? (
              <CircularProgress size={20} />
            ) : (
              <LogoutIcon fontSize="small" />
            )}
          </ListItemIcon>
          <Typography variant="inherit">
            {isLoggingOut ? "Saindo..." : "Sair"}
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
