import React, { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface UserAvatarProps {
  onLogout: () => void;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ onLogout, size }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
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

  const handleLogout = () => {
    onLogout();
    handleClose();
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <IconButton onClick={handleClick}>
          <Avatar src={userPhoto} sx={{ width: size, height: size }} />
        </IconButton>
        <Typography variant="body1" sx={{ ml: 1 }}>
          {userName}
        </Typography>
      </Box>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleProfile}>Perfil</MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </>
  );
};

export default UserAvatar;
