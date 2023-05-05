import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { AuthLayout } from "../../layouts/auth/layout";
import { useAuthContext } from "../../contexts/auth-context";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useAuthContext() as any;
  const navigate = useNavigate();
  
  const formik = useFormik({
    initialValues: {
      email: "b.kurullll@outlook.com",
      password: "Kurul12345",
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        navigate("/")
      } catch (err: any) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    document.title = 'Docifier - Login';
  })

  return (
    <AuthLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>

            <form noValidate onSubmit={formik.handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <Typography color="text.secondary" variant="body2">
                  Forgot your password ? &nbsp;
                  <Link
                    href="/auth/reset"
                    underline="hover"
                    variant="subtitle2"
                  >
                    Reset Password
                  </Link>
                </Typography>
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}

              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Log In
              </Button>
              <Alert color={"info"} severity="info" sx={{ mt: 3 }}>
                <div>
                  You can use <b>demo@devias.io</b> and password <b>Password123!</b>
                </div>
              </Alert>
            </form>
          </div>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Login;
