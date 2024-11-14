import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button,
  ListItemSecondaryAction,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AddCircleOutline,
  Edit,
  Delete,
  HomeOutlined,
  ShoppingCartOutlined,
  FastfoodOutlined,
  DirectionsCarOutlined,
  LocalHospitalOutlined,
  SchoolOutlined,
  WorkOutline,
  SportsEsportsOutlined,
  AccountBalanceOutlined,
  LocalMoviesOutlined,
} from "@mui/icons-material";
import { useSidebar } from "../contexts/SidebarContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import UserAvatar from "../components/UserAvatar";

const drawerWidth = 240;
const primaryColor = "#FF4500";

const categoryIconsList = {
  casa: {
    icon: HomeOutlined,
    label: "Casa",
  },
  compras: {
    icon: ShoppingCartOutlined,
    label: "Compras",
  },
  alimentacao: {
    icon: FastfoodOutlined,
    label: "Alimentação",
  },
  transporte: {
    icon: DirectionsCarOutlined,
    label: "Transporte",
  },
  saude: {
    icon: LocalHospitalOutlined,
    label: "Saúde",
  },
  educacao: {
    icon: SchoolOutlined,
    label: "Educação",
  },
  trabalho: {
    icon: WorkOutline,
    label: "Trabalho",
  },
  lazer: {
    icon: SportsEsportsOutlined,
    label: "Lazer",
  },
  financas: {
    icon: AccountBalanceOutlined,
    label: "Finanças",
  },
  entretenimento: {
    icon: LocalMoviesOutlined,
    label: "Entretenimento",
  },
};

interface Category {
  name: string;
  icon: keyof typeof categoryIconsList;
}

const Categorias: React.FC = () => {
  const { isOpen, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState<Category>({
    name: "",
    icon: "casa",
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleAddCategory = () => {
    if (newCategory.name.trim() === "") return;

    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = newCategory;
      setCategories(updatedCategories);
      setEditIndex(null);
    } else {
      setCategories([...categories, newCategory]);
    }
    setNewCategory({ name: "", icon: "casa" });
  };

  const handleEditCategory = (index: number) => {
    setNewCategory(categories[index]);
    setEditIndex(index);
  };

  const handleDeleteCategory = (index: number) => {
    const updatedCategories = categories.filter((_, i) => i !== index);
    setCategories(updatedCategories);
  };

  const handleLogout = async () => {
    navigate("/login");
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

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Box sx={{ maxWidth: 600, margin: "0 auto" }}>
          <TextField
            fullWidth
            margin="normal"
            label="Nome da Categoria"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Ícone</InputLabel>
            <Select
              value={newCategory.icon}
              label="Ícone"
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  icon: e.target.value as keyof typeof categoryIconsList,
                })
              }
            >
              {Object.entries(categoryIconsList).map(([key, value]) => {
                const Icon = value.icon;
                return (
                  <MenuItem key={key} value={key}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon />
                      <span>{value.label}</span>
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>

          <Button
            fullWidth
            variant="contained"
            onClick={handleAddCategory}
            startIcon={<AddCircleOutline />}
            sx={{ mt: 2 }}
          >
            {editIndex !== null ? "Editar Categoria" : "Adicionar Categoria"}
          </Button>

          <List sx={{ mt: 2 }}>
            {categories.map((category, index) => {
              const IconComponent = categoryIconsList[category.icon].icon;
              return (
                <ListItem key={index}>
                  <ListItemIcon>
                    <IconComponent />
                  </ListItemIcon>
                  <ListItemText
                    primary={category.name}
                    secondary={categoryIconsList[category.icon].label}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => handleEditCategory(index)}
                      sx={{ mr: 1 }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      edge="end"
                      onClick={() => handleDeleteCategory(index)}
                    >
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default Categorias;
