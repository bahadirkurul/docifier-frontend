import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
// import { OverviewLatestOrders } from '../sections/overview/documentations';
import { useEffect, useState } from 'react';
import { useAuthContext } from '../../contexts/AuthContext';
import { OverviewLatestOrders } from './sections/documentations';

const now = new Date();

const Homepage = () => {
  const auth = useAuthContext() as any
  const [docs, setDocs] = useState([])

  const getDocs = async () => {
    const gotDocs = await auth.getDocs()
    setDocs(gotDocs)
  }

  useEffect(() => {
    document.title = 'Docifier - Homepage'
    getDocs()
  }, [])

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} md={12} lg={12}>
            <OverviewLatestOrders docs={docs} sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}


export default Homepage;
