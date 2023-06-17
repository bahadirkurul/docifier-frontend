import { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material'
import { useAuthContext } from '../../contexts/AuthContext'
import { RetterTokenPayload } from '@retter/sdk'
import { useRioSdkContext } from '../../contexts/RioSdkContext'
import { useLoadingContext } from '../../contexts/LoadingContext'

export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props
  const auth = useAuthContext() as any
  const { rioSDK } = useRioSdkContext()
  const [user, setUser] = useState<RetterTokenPayload>()
  const { setLoadingStatus } = useLoadingContext()

  useEffect(() => {
    const getUser = async () => {
      setLoadingStatus(true)
      const user = await rioSDK.getCurrentUser()
      setLoadingStatus(false)
      setUser(user)
    }
    getUser()
  }, [rioSDK, setLoadingStatus])

  const handleSignOut = useCallback(async () => {
    onClose?.()
    await auth.signOut()
  }, [onClose, auth])

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          {user?.claims?.name + ' ' + user?.claims?.surname}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: '8px',
          '& > *': {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  )
}

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
}
