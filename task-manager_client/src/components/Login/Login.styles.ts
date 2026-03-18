import { styled } from "@mui/material/styles";
import { Box, Paper, Button } from "@mui/material";

export const PageContainer = styled(Box)({
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #6d28d9, #3b82f6)",
});

export const LoginCard = styled(Paper)({
  padding: "2rem",
  width: "360px",
  borderRadius: "16px",
});

export const GradientButton = styled(Button)({
  marginTop: "10px",
  borderRadius: "10px",
  background: "linear-gradient(90deg, #7c3aed, #2563eb)",
  fontWeight: "bold",
  color: "#fff",
});

export const OutlineButton = styled(Button)({
  marginTop: "10px",
  borderRadius: "10px",
});
