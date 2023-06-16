import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material'
import { AuthLayout } from '../../layouts/auth/layout'
import { useAuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CustomSpinner from '../../components/CustomSpinner'

const Register = () => {
  const auth = useAuthContext() as any
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  
  const formik = useFormik({
    initialValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      confirmPassword: '',
      submit: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      name: Yup.string().max(255).required('Name is required'),
      surname: Yup.string().max(255).required('Name is required'),
      password: Yup.string()
        .max(255)
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
        .equals([Yup.ref('confirmPassword')], 'Passwords must match'),
      confirmPassword: Yup.string()
        .max(255)
        .required('Password is required')
        .equals([Yup.ref('password')], 'Passwords must match'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        setLoading(true)
        await auth.signUp(values.name, values.surname, values.email, values.password, values.confirmPassword)
        setLoading(false)
        navigate('/')
      } catch (err: any) {
        setLoading(false)
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  useEffect(() => {
    document.title = 'Docifier - Register'
  })

  return (
    <CustomSpinner spinning={loading}>
      <AuthLayout>
        <Box
          sx={{
            flex: '1 1 auto',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              maxWidth: 550,
              px: 3,
              py: '100px',
              width: '100%',
            }}
          >
            <div>
              <Stack spacing={1} sx={{ mb: 3 }}>
                <Typography variant="h4">Register</Typography>
                <Typography color="text.secondary" variant="body2">
                  Already have an account? &nbsp;
                  <Link href="/auth/login" underline="hover" variant="subtitle2">
                    Log in
                  </Link>
                </Typography>
              </Stack>
              <form noValidate onSubmit={formik.handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    error={!!(formik.touched.name && formik.errors.name)}
                    fullWidth
                    helperText={formik.touched.name && formik.errors.name}
                    label="Name"
                    name="name"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                  <TextField
                    error={!!(formik.touched.surname && formik.errors.surname)}
                    fullWidth
                    helperText={formik.touched.surname && formik.errors.surname}
                    label="Surname"
                    name="surname"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.surname}
                  />
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
                  <TextField
                    error={!!(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                    fullWidth
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    label="Confirm Password"
                    name="confirmPassword"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="password"
                    value={formik.values.confirmPassword}
                  />
                </Stack>
                {formik.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formik.errors.submit}
                  </Typography>
                )}
                <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                  Continue
                </Button>
              </form>
            </div>
          </Box>
        </Box>
      </AuthLayout>
    </CustomSpinner>
  )
}

export default Register
