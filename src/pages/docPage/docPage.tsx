import { Box, Container, Unstable_Grid2 as Grid, Stack, SvgIcon, Typography } from '@mui/material'
import { useEffect } from 'react'
import { useAuthContext } from '../../contexts/auth-context'
import { MainLayout } from '../../layouts/dashboard/layout'


const DocDetails = () => {
  const auth = useAuthContext() as any

  const getDoc = async () => {
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    const docs = ((await auth.getDocs()) as any[]) || []
    const isDocExist = docs.find((doc) => doc.docId === id)

    if (!isDocExist) {
      window.location.href = '/'
    }
  }

  useEffect(() => {
    getDoc()
  }, [])

  return (
    <MainLayout>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <Typography variant="h4">Create Documentation</Typography>

            <Grid container spacing={3}>
              <Grid xs={12} md={12} lg={12}>
                s
                {/* <CreateDocInfo /> */}
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </MainLayout>

  );
}

export default DocDetails
