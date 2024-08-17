import React, { useState, useRef, useEffect } from "react";
import { TextField, Button, Avatar, Box, IconButton } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";

interface UserInfo {
  name: string;
  email: string;
  profilePicture: string;
  newPassword?: string;
}

interface UserInfoFormProps {
  initialUserInfo: UserInfo;
  onSubmit: (userInfo: UserInfo) => void;
  isEditable?: boolean;
}

const UserInfoForm: React.FC<UserInfoFormProps> = ({
  initialUserInfo,
  onSubmit,
  isEditable = true,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(initialUserInfo);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Carrega a imagem do localStorage quando o componente é montado
    const savedImage = localStorage.getItem("userProfilePicture");
    if (savedImage) {
      setUserInfo((prevInfo) => ({ ...prevInfo, profilePicture: savedImage }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(userInfo);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          profilePicture: result,
        }));
        // Salva a imagem no localStorage
        localStorage.setItem("userProfilePicture", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleCameraClick = () => {
    cameraInputRef.current?.click();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        alignSelf: "flex-start",
        marginLeft: "-15px",
        marginTop: "30px",
        marginRight: "50px",
      }}
    >
      <Box sx={{ position: "relative", marginBottom: "30px" }}>
        <Avatar
          src={userInfo.profilePicture}
          sx={{ width: 100, height: 100, margin: "20px auto" }}
        />
        {isEditable && (
          <Box
            sx={{
              position: "absolute",
              bottom: "-30px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
            }}
          >
            <IconButton
              onClick={handlePhotoClick}
              size="small"
              sx={{ bgcolor: "background.paper" }}
            >
              <PhotoLibraryIcon />
            </IconButton>
            <IconButton
              onClick={handleCameraClick}
              size="small"
              sx={{ bgcolor: "background.paper" }}
            >
              <CameraAltIcon />
            </IconButton>
          </Box>
        )}
      </Box>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="user"
        style={{ display: "none" }}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Nome"
        name="name"
        value={userInfo.name}
        onChange={handleChange}
        disabled={!isEditable}
      />
      <TextField
        fullWidth
        margin="normal"
        label="E-mail"
        name="email"
        type="email"
        value={userInfo.email}
        onChange={handleChange}
        disabled={!isEditable}
      />
      {isEditable && (
        <TextField
          fullWidth
          margin="normal"
          label="Nova Senha"
          name="newPassword"
          type="password"
          value={userInfo.newPassword || ""}
          onChange={handleChange}
        />
      )}
      {isEditable && (
        <Button
          type="submit"
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            backgroundColor: "#800080",
            "&:hover": {
              backgroundColor: "#6a006a",
            },
          }}
        >
          Salvar Alterações
        </Button>
      )}
    </Box>
  );
};
export default UserInfoForm;
