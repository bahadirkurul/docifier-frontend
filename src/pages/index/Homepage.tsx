import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material'
// import { OverviewLatestOrders } from '../sections/overview/documentations';
import { useEffect, useState } from 'react'
import { OverviewLatestOrders } from './sections/documentations'
import { useDocumentationContext } from '../../contexts/DocumentationContext'

const Homepage = () => {
  const [docs, setDocs] = useState([])
  const { getDocumentations } = useDocumentationContext()
  useEffect(() => {
    const getDocs = async () => {
      const documentations = await getDocumentations()
      setDocs(documentations)
    }
    getDocs()
  }, [getDocumentations])

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

export default Homepage
