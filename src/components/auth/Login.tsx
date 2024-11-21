import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginImage from "/src/public/assets/images/login.png";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    console.log("Tentativa de login com:", email, senha);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      navigate("/dashboard");
    }, 3000);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Seção da esquerda - Formulário */}
      <Box
        sx={{
          width: "40%",
          padding: 4,
          backgroundColor: "#111",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
            Planifique
          </Typography>
          <Typography variant="h6">Faça seu login</Typography>
        </Box>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ width: "100%", maxWidth: 360 }}
        >
          {/* Texto acima do campo E-mail */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              mb: 0.5, 
              fontSize: "16px", 
            }}
          >
            E-mail:
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            sx={{
              input: {
                color: "#fff",
                background: "linear-gradient(90deg, #09352D, #136B5A)",
                borderRadius: "20px",
                padding: "10px",
                "&::placeholder": {
                  color: "#bbb",
                  transform: "translateY(-3px)",
                  fontSize: "14px",
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#fff" },
              },
            }}
          />
          {/* Texto acima do campo Senha */}
          <Typography
            sx={{
              color: "#fff",
              fontWeight: "bold",
              mt: 1.5, 
              mb: 0.5, 
              fontSize: "16px", 
            }}
          >
            Senha:
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            name="senha"
            type="password"
            id="senha"
            autoComplete="current-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            sx={{
              input: {
                color: "#fff",
                background: "linear-gradient(90deg, #09352D, #136B5A)",
                borderRadius: "20px",
                padding: "10px",
                "&::placeholder": {
                  color: "#bbb",
                  transform: "translateY(-3px)",
                  fontSize: "14px",
                },
              },
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
                "& fieldset": { borderColor: "#ddd" },
                "&:hover fieldset": { borderColor: "#fff" },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#00bfa5",
              "&:hover": { backgroundColor: "#008c7a" },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Acessar"
            )}
          </Button>
          <Typography
            sx={{
              textAlign: "center",
              color: "#ddd",
              mt: 2,
              "& a": { color: "#00bfa5", textDecoration: "none" },
            }}
          >
            Ainda não tenho uma conta.{" "}
            <Link component={RouterLink} to="/cadastro">
              Crie uma!
            </Link>
          </Typography>
        </Box>
      </Box>

      {/* Seção da direita - Imagem */}
      <Box
        sx={{
          width: "60%",
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></Box>
    </Box>
  );
};

export default Login;
