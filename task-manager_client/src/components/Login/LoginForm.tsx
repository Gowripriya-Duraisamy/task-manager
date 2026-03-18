import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import {
  TextField,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
  Link,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  PageContainer,
  LoginCard,
  GradientButton,
  OutlineButton,
} from "./Login.styles";

import illustration from "../../assets/task_background.svg";

const LoginForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      captcha: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      captcha: Yup.boolean().oneOf([true], "Please verify captcha"),
    }),
    onSubmit: (values) => {
      if (!captchaValue) {
        alert("Please verify captcha");
        return;
      }

      console.log("Form Data:", values);
    },
  });

  return (
    <Box>
      <Box
        sx={{
          width: "100%",
          px: { xs: 2, md: 6 },
          py: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          // 🔥 MATCHING YOUR PAGE GRADIENT
          background: "linear-gradient(90deg, #5f2c82, #49a09d)",

          boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
        }}
      >
        {/* LEFT SECTION */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <TaskAltIcon sx={{ fontSize: 34, color: "#fff" }} />

          <Typography
            sx={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.5px",
            }}
          >
            TaskNova
          </Typography>
        </Box>

        {/* RIGHT SECTION (optional future use) */}
        <Box>{/* keep empty or add buttons later */}</Box>
      </Box>
      <PageContainer>
        {/* LEFT SIDE */}
        <Box
          flex={1}
          display={{ xs: "none", md: "flex" }}
          flexDirection="column"
          justifyContent="space-between"
          p={6}
          color="white"
        >
          {/* 🔥 ILLUSTRATION */}
          <Box
            component="img"
            src={illustration}
            alt="Task Illustration"
            sx={{
              width: "60%",
              maxWidth: "420px",
              alignSelf: "center",
              mt: -4, // 👈 moves slightly up
            }}
          />
        </Box>

        {/* RIGHT SIDE */}
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          pr={6} // 👈 FIX: space from right edge
        >
          <LoginCard elevation={6}>
            <form onSubmit={formik.handleSubmit}>
              <Typography variant="h5" align="center" fontWeight="bold">
                Login
              </Typography>

              {/* Email */}
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...formik.getFieldProps("email")}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? "text" : "password"}
                margin="dense"
                {...formik.getFieldProps("password")}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {/* Password */}
              <Box display="flex" justifyContent="flex-end">
                <Link href="#" fontSize="12px">
                  Forgot Password?
                </Link>
              </Box>
              <Box
                mt={2}
                display="flex"
                justifyContent="center"
                sx={{ transform: "scale(0.9)" }}
              >
                <ReCAPTCHA
                  sitekey="YOUR_SITE_KEY_HERE"
                  onChange={(value: React.SetStateAction<string | null>) =>
                    setCaptchaValue(value)
                  }
                />
              </Box>

              {formik.touched.captcha && formik.errors.captcha && (
                <Typography color="error" variant="caption">
                  {formik.errors.captcha}
                </Typography>
              )}

              {/* Buttons */}
              <GradientButton fullWidth type="submit">
                Login
              </GradientButton>

              <OutlineButton fullWidth variant="outlined">
                Cancel
              </OutlineButton>

              <Divider sx={{ my: 2 }}>OR</Divider>

              <OutlineButton fullWidth startIcon={<GoogleIcon />}>
                Sign in with Google
              </OutlineButton>

              <OutlineButton fullWidth startIcon={<LinkedInIcon />}>
                Sign in with LinkedIn
              </OutlineButton>
            </form>
          </LoginCard>
        </Box>
      </PageContainer>
    </Box>
  );
};

export default LoginForm;
