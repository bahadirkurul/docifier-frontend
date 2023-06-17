import PropTypes from 'prop-types'
import { Box, Typography, Unstable_Grid2 as Grid, Avatar, IconButton, Stack, SvgIcon, alpha } from '@mui/material'
import { Logo } from '../../components/logo'
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeContext } from '../../contexts/ThemeContext'

// TODO: Change subtitle text,

export const AuthLayout = (props) => {
  const { children } = props
  const { mode, toggleColorMode } = useThemeContext()

  return (
    <>
      <Box
        component="header"
        sx={{
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
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <IconButton onClick={toggleColorMode} size="large">
              {mode === 'light' ? <DarkModeIcon fontSize="medium" /> : <LightModeIcon fontSize="medium" />}
            </IconButton>
          </Stack>
        </Stack>
      </Box>
      {children}
    </>
  )
}

AuthLayout.prototypes = {
  children: PropTypes.node,
}
