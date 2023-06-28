import { Box, Container, Unstable_Grid2 as Grid, Stack, SvgIcon, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import { DocSideNav } from './sections/sideNav'
import { EditDoc } from './sections/editDoc'

const DocDetails = () => {
  const auth = useAuthContext() as any
  const [docId, setDocId] = useState("")
  const [docSheetId, setDocSheetId] = useState("")

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
          <Grid xs={12} md={4} lg={3} xl={2} 
          sx={{
            position: 'sticky',
          }}
          >

            <DocSideNav />
          </Grid>
          <Grid xs={12} md={8} lg={9} xl={10}>

           <EditDoc docId={docId} sheetId={docSheetId}/>
          </Grid>
        </Grid>
      </Box>
  )
}

export default DocDetails
