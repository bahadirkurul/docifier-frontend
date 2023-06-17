import { useCallback, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export const SettingsPassword = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
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

  return (

    <form noValidate onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.oldPassword && formik.errors.oldPassword)}
                  fullWidth
                  label="Old Password"
                  name="oldPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.oldPassword}
                />
                <TextField
                  error={!!(formik.touched.newPassword && formik.errors.newPassword)}
                  fullWidth
                  label="New Password"
                  name="newPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.newPassword}
                />
                <TextField
                  error={!!(formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm)}
                  fullWidth
                  label="Confirm New Password"
                  name="newPasswordConfirm"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.newPasswordConfirm}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography color="error" sx={{ mt: 3 }} variant="body2">
                  {formik.errors.submit}
                </Typography>
              )}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>Change Password</Button>
        </CardActions>
      </Card>
      </form>
  )
}
