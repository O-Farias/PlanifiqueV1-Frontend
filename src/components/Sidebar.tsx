import React, { useState } from "react";
import { useSidebar } from "../contexts/SidebarContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarProps {
  drawerWidth: number;
  onLogout: () => Promise<void>;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, onLogout }) => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleOpenLogoutDialog = () => {
    setOpenLogoutDialog(true);
  };

  const handleCloseLogoutDialog = () => {
    if (!isLoggingOut) {
      setOpenLogoutDialog(false);
    }
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
      setOpenLogoutDialog(false);
    }
  };

  const menuItems = [
    {
      text: "Dashboard",
      icon: <InsertChartOutlinedIcon sx={{ color: "#1976d2" }} />,
      onClick: () => navigate("/dashboard"),
      path: "/dashboard",
    },
    {
      text: "Transações",
      icon: <AttachMoneyIcon sx={{ color: "green" }} />,
      onClick: () => navigate("/transacoes"),
      path: "/transacoes",
    },
    {
      text: "Categorias",
      icon: <ListAltIcon sx={{ color: "red" }} />,
      onClick: () => navigate("/categorias"),
      path: "/categorias",
    },

    {
      text: "Perfil",
      icon: <PersonIcon sx={{ color: "purple" }} />,
      onClick: () => navigate("/perfil"),
      path: "/perfil",
    },
    {
      text: "Sair",
      icon: <LogoutIcon sx={{ color: "gray" }} />,
      onClick: handleOpenLogoutDialog,
      path: "",
    },
  ];

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isOpen}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
          }}
        >
          <IconButton onClick={toggleSidebar}>
            <ChevronLeftIcon />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={item.onClick}
                selected={location.pathname === item.path}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseLogoutDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar saída"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja sair? Você será redirecionado para a página
            de login.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseLogoutDialog} disabled={isLoggingOut}>
            Cancelar
          </Button>
          <Button
            onClick={handleLogout}
            disabled={isLoggingOut}
            variant="contained"
          >
            {isLoggingOut ? <CircularProgress size={24} /> : "Confirmar"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Sidebar;
