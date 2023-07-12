import { useCallback, useState } from 'react'
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography } from '@mui/material'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useUserContext } from '../../../contexts/UserContext'
import { notify } from '../../..'

export const SettingsPassword = () => {
  const { changePassword } = useUserContext()

  const formik = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      submit: null,
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().max(255).required('Current password is required'),
      newPassword: Yup.string().max(255).min(8, 'Password must be at least 8 characters').required('New password is required'),
      newPasswordConfirm: Yup.string()
        .max(255)
        .required('New password confirmation is required')
        .equals([Yup.ref('newPassword')], 'Passwords must match'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        await changePassword(values.oldPassword, values.newPassword, values.newPasswordConfirm)
        notify('Password changed successfully!', 'success', 3000)
        values.oldPassword = ''
        values.newPassword = ''
        values.newPasswordConfirm = ''
      } catch (err: any) {
        helpers.setStatus({ success: false })
        notify(err.message, 'error', 3000)
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
                helperText={formik.touched.oldPassword && formik.errors.oldPassword}
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
                helperText={formik.touched.newPassword && formik.errors.newPassword}
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
                helperText={formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm}
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
          <Button variant="contained" type="submit">
            Change Password
          </Button>
        </CardActions>
      </Card>
    </form>
  )
}
