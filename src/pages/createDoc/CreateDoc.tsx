import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { CreateDocInfo } from "./sections/docInfo";
import { useAuthContext } from "../../contexts/auth-context";
import { MainLayout } from "../../layouts/dashboard/layout";

const CreateDoc = () => {
  const auth = useAuthContext() as any;

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
                <CreateDocInfo />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default CreateDoc;
