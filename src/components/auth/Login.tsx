import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(""); // Limpa o erro

    if (!email || !senha) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    // Valida o e-mail
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Por favor, insira um e-mail válido.");
      return;
    }

    console.log("Tentativa de login com:", email, senha);
    // Simula o processo de login
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Aqui você colocaria a lógica real de autenticação
      navigate("/dashboard");
    }, 3000); // 3 segundos de carregamento
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background:
          "linear-gradient(-45deg, #e0e0e0, #b0bec5, #78909c, #546e7a)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
        "@keyframes gradientBG": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!error && !email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              error={!!error && !senha}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Entrar"}
            </Button>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="body2">
                Ainda não possui cadastro?{" "}
                <Link component={RouterLink} to="/cadastro">
                  Cadastre-se aqui
                </Link>
              </Typography>
              <Typography variant="body2">
                <Link component={RouterLink} to="/recuperar-senha">
                  Esqueceu sua senha?
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
