import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Link, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useRioSdkContext } from '../../../contexts/RioSdkContext'
import { RetterTokenPayload } from '@retter/sdk'
import * as Yup from 'yup'
import { Form, useFormik } from 'formik'

const avatarStyle = {
  backgroundColor: '#3f51b5',
  height: 56,
  width: 56,
}

const courseListStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '8px',
  margin: '16px 0',
}

export const AccountProfile = ({ auth }) => {
  const [user, setUser] = useState<RetterTokenPayload>()
  const { rioSDK } = useRioSdkContext()

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      surname: '',
      submit: null,
    },
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

  useEffect(() => {
    const getUser = async () => {
      const user = await rioSDK.getCurrentUser()
      setUser(user)
    }
    getUser()

    formik.values.email = user?.claims?.email
    formik.values.name = user?.claims?.name
    formik.values.surname = user?.claims?.surname
  }, [rioSDK, user?.claims?.email, user?.claims?.name, user?.claims?.surname])

  function getInitials(firstName = '', lastName = '') {
    // Extract the first character of the first name
    const firstInitial = firstName.charAt(0)

    // Extract the first character of the last name
    const lastInitial = lastName.charAt(0)

    // Concatenate the initials together
    const initials = `${firstInitial}${lastInitial}`

    return initials
  }

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
