import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon'
import { Avatar, Box, Button, IconButton, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useThemeContext } from '../../contexts/ThemeContext'
import { usePopover } from '../../hooks/use-popover'
import { AccountPopover } from './account-popover'
import { Logo } from '../../components/logo'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useEffect, useState } from 'react'
import { RetterTokenPayload } from '@retter/sdk'
import { useRioSdkContext } from '../../contexts/RioSdkContext'

const TOP_NAV_HEIGHT = 34

export const Header = (props) => {
  const { onNavOpen } = props
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'))
  const accountPopover = usePopover()
  const { mode, toggleColorMode } = useThemeContext()
  const [user, setUser] = useState<RetterTokenPayload>()
  const { rioSDK } = useRioSdkContext()
  
  useEffect(() => {
    const getUser = async () => {
      const user = await rioSDK.getCurrentUser()
      setUser(user)
    }
    getUser()
  }, [rioSDK])

  function getInitials(firstName = "", lastName= "") {
    // Extract the first character of the first name
    const firstInitial = firstName.charAt(0);
  
    // Extract the first character of the last name
    const lastInitial = lastName.charAt(0);
  
    // Concatenate the initials together
    const initials = `${firstInitial}${lastInitial}`;
  
    return initials;
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'relative',
          width: '100%',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Box sx={{ p: 3 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  height: 32,
                  width: 32,
                }}
              >
                <Logo />
              </Box>
            </Box>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <IconButton onClick={toggleColorMode} size='large'>
                {mode === 'light' ? <DarkModeIcon fontSize='medium'/> : <LightModeIcon fontSize='medium'/>}
            </IconButton>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
                backgroundColor: '#3f51b5',
              }}
            >
              {getInitials(user?.claims?.name, user?.claims?.surname)}
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <AccountPopover anchorEl={accountPopover.anchorRef.current} open={accountPopover.open} onClose={accountPopover.handleClose} />
    </>
  )
}
