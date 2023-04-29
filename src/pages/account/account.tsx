import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { MainLayout } from "../../layouts/dashboard/layout";
import { useAuthContext } from "../../contexts/auth-context";
import { AccountProfile } from "./sections/profile";
import { SettingsPassword } from "./sections/setPassword";

const Account = () => {
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
            <Typography variant="h4">Account</Typography>

            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <AccountProfile auth={auth} />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <SettingsPassword />
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </MainLayout>
  );
};

export default Account;
