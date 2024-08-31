import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/SidebarContext";
import UserAvatar from "../components/UserAvatar";
import { ChromePicker } from "react-color";

interface Category {
  name: string;
  color: string;
}

const drawerWidth = 240;
const primaryColor = "#FF0000";

const Categorias: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([
    { name: "Aluguel", color: "#FF5733" },
    { name: "Alimentação", color: "#33FF57" },
    { name: "Transporte", color: "#3357FF" },
    { name: "Lazer", color: "#F033FF" },
    { name: "Outros", color: "#33FFF0" },
  ]);
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    color: "#000000",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleLogout = async () => {
    // lógica para limpar o estado de autenticação
    navigate("/login");
  };

  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") {
      setSnackbarMessage("Por favor, insira um nome para a categoria.");
      setOpenSnackbar(true);
      return;
    }

    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
      setEditIndex(null);
      setSnackbarMessage("Categoria editada com sucesso!");
    } else {
      setCategories([...categories, newCategory]);
      setSnackbarMessage("Nova categoria adicionada com sucesso!");
    }
    setNewCategory({ name: "", color: "#000000" });
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleEditCategory = (index: number) => {
    setNewCategory(categories[index]);
    setEditIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    const deletedCategory = categories[index].name;
    setCategories(categories.filter((_, i) => i !== index));
    setSnackbarMessage(`Categoria "${deletedCategory}" removida com sucesso!`);
    setOpenSnackbar(true);
  };

  const handleColorButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleColorPickerClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "color-popover" : undefined;

  const handleColorChange = (color: any) => {
    setNewCategory({ ...newCategory, color: color.hex });
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
            Categorias
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              marginRight: 5,
            }}
          >
            <UserAvatar onLogout={handleLogout} size={50} />
          </Box>
        </Toolbar>
      </AppBar>

      <Sidebar drawerWidth={drawerWidth} onLogout={handleLogout} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: "auto" }}>
        <Toolbar />
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 5,
            padding: 3,
            marginBottom: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            Gerenciar Categorias
          </Typography>
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
            <TextField
              label="Nova Categoria"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              margin="normal"
              sx={{ width: "200px" }}
              InputProps={{
                sx: {
                  height: "40px",
                  "& .MuiInputBase-input": {
                    height: "100%",
                    padding: "10px",
                    boxSizing: "border-box",
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  lineHeight: "13px",
                },
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddCategory();
                }
              }}
            />
            <Button
              aria-describedby={id}
              onClick={handleColorButtonClick}
              sx={{
                width: 40,
                height: 40,
                minWidth: 40,
                backgroundColor: newCategory.color,
                marginTop: "16px",
                "&:hover": {
                  backgroundColor: newCategory.color,
                },
              }}
              title="Selecionar cor"
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleColorPickerClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <ChromePicker
                color={newCategory.color}
                onChange={handleColorChange}
                disableAlpha={true}
              />
            </Popover>
            <Button
              variant="contained"
              sx={{
                backgroundColor: primaryColor,
                color: "#fff",
                height: "40px",
                marginTop: "16px",
                "&:hover": {
                  backgroundColor: "#FF4500",
                },
              }}
              onClick={handleAddCategory}
            >
              {editIndex !== null ? "Editar Categoria" : "Adicionar Categoria"}
            </Button>
          </Box>
        </Box>
        <Box sx={{ maxHeight: 300, overflowY: "auto" }}>
          <List sx={{ padding: 0 }}>
            {categories.map((category, index) => (
              <ListItem key={index} sx={{ borderBottom: "1px solid #ccc" }}>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: category.color,
                    marginRight: 2,
                  }}
                />
                <ListItemText primary={category.name} />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEditCategory(index)}
                    sx={{ color: "blue" }}
                    title="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDeleteCategory(index)}
                    sx={{ color: "red" }}
                    title="Excluir"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        sx={{
          top: { xs: 72, sm: 80 },
          right: { xs: 16, sm: 24 },
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={
            snackbarMessage.includes("Por favor")
              ? "error"
              : snackbarMessage.includes("removida")
              ? "info"
              : "success"
          }
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Categorias;
