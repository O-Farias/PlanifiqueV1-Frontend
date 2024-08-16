import React from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  Snackbar,
  Alert,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import UserInfoForm from "../components/Perfil/UserInfoForm";

const drawerWidth = 240;
const primaryColor = "#800080";

interface UserInfo {
  name: string;
  email: string;
  profilePicture: string;
  newPassword?: string;
}

const Perfil: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleLogout = async () => {
    navigate("/login");
  };

  const initialUserInfo: UserInfo = {
    name: "Nome do Usuário",
    email: "usuario@example.com",
    profilePicture: "https://example.com/profile-picture.jpg",
  };

  const handleSubmit = (userInfo: UserInfo) => {
    console.log("Informações atualizadas:", userInfo);

    if (userInfo.newPassword) {
      console.log("Nova senha definida:", userInfo.newPassword);
    }

    setSnackbar({
      open: true,
      message: "Perfil atualizado com sucesso!",
      severity: "success",
    });
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: primaryColor,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          ...(isOpen && {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: (theme) =>
              theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isOpen && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Perfil
          </Typography>
        </Toolbar>
      </AppBar>

      <Sidebar drawerWidth={drawerWidth} onLogout={handleLogout} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          marginLeft: isOpen ? `${drawerWidth}px` : 0,
          transition: (theme) =>
            theme.transitions.create(["margin", "width"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mb: 4,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              paddingBottom: "10px",
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "2px",
                backgroundColor: primaryColor,
              },
            }}
          >
            <AccountCircleIcon
              sx={{ fontSize: 40, color: primaryColor, mr: 2 }}
            />
            <Box>
              <Typography
                variant="h4"
                component="span"
                sx={{ fontWeight: "bold" }}
              >
                Atualizar
              </Typography>
              <Typography
                variant="h4"
                component="span"
                sx={{
                  fontWeight: "light",
                  color: primaryColor,
                  ml: 1,
                }}
              >
                Perfil
              </Typography>
            </Box>
          </Box>
        </Box>
        <UserInfoForm
          initialUserInfo={initialUserInfo}
          onSubmit={handleSubmit}
        />
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Perfil;
