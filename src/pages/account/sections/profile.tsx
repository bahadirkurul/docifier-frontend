import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography } from '@mui/material'
import { useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useUserContext } from '../../../contexts/UserContext'

export const AccountProfile = ({ auth }) => {
  const { tokenClaims } = useUserContext()
  
  const formik = useFormik({
    initialValues: {
      email: tokenClaims?.claims.email,
      name: tokenClaims?.claims.name,
      surname: tokenClaims?.claims.surname,
      submit: null,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
      password: Yup.string().max(255).required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
      } catch (err: any) {
        helpers.setStatus({ success: false })
        helpers.setErrors({ submit: err.message })
        helpers.setSubmitting(false)
      }
    },
  })

  return (
    <form noValidate onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
      <Card
        sx={{
          height: '100%',
        }}
      >
        <CardHeader subheader="Update Profile" title="Profile" />
        <Divider />
        <CardContent>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Stack spacing={3} sx={{ width: '100%' }}>
              <TextField
                error={!!(formik.touched.name && formik.errors.name)}
                fullWidth
                label="Name"
                name="name"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.name}
              />
              <TextField
                error={!!(formik.touched.surname && formik.errors.surname)}
                fullWidth
                label="Surname"
                name="surname"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.surname}
              />
              <TextField
                error={!!(formik.touched.email && formik.errors.email)}
                fullWidth
                label="Email Address"
                name="email"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="email"
                value={formik.values.email}
              />
            </Stack>
            {formik.errors.submit && (
              <Typography color="error" sx={{ mt: 3 }} variant="body2">
                {formik.errors.submit}
              </Typography>
            )}
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save Profile
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
