import { Box, Container, Unstable_Grid2 as Grid, Stack, SvgIcon, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { DocSideNav } from './sections/sideNav'

const DocSettings = () => {
  const auth = useAuthContext() as any
  const [doc, setDocument] = useState()

  useEffect(() => {

  }, [])

  return (
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Grid container spacing={5}>
          <Grid xs={12} md={4} lg={2}>
            <DocSideNav />
          </Grid>
          <Grid xs={12} md={8} lg={10}>


          </Grid>
        </Grid>
      </Box>
  )
}

export default DocSettings
