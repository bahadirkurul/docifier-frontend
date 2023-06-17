import PropTypes from 'prop-types'
import { Box, Button, Divider, Drawer, Grid, Stack, SvgIcon, Typography, useMediaQuery } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { privateRoutes, publicRoutes } from './routes'
import { useRioSdkContext } from './contexts/RioSdkContext'
import { useEffect, useState } from 'react'
import { AuthGuard } from './guards/auth-guard'
import './app.css'
import { Header } from './layouts/Header/header'
import { SideNavigation } from './layouts/sideNav/SideNavigation'
import CustomSpinner from './components/CustomSpinner'
import { useLoadingContext } from './contexts/LoadingContext'

export const App = (props) => {
  const [openNav, setOpenNav] = useState(false)
  const { loading } = useLoadingContext()
  return (
    <>
      <Routes>
        {privateRoutes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={
              <CustomSpinner spinning={loading}>
                <Grid container height={'100%'}>
                  <Grid item lg={2.3} xl={1.5}>
                    <SideNavigation onClose={() => setOpenNav(false)} open={openNav} />
                  </Grid>

                  <Grid item xs={12} md={12} lg={9.7} xl={10.5}>
                    <Grid item>
                      <Header onNavOpen={() => setOpenNav(true)} />
                    </Grid>
                    <Grid item>
                      <AuthGuard>{route.element}</AuthGuard>
                    </Grid>
                  </Grid>
                </Grid>
              </CustomSpinner>
            }
          />
        ))}

        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={

            <CustomSpinner spinning={loading}>
              {route.element}
            </CustomSpinner>
          } />
        ))}
      </Routes>
    </>
  )
}
