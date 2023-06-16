import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import { useAuthContext } from "../../contexts/AuthContext";
import { AccountProfile } from "./sections/profile";
import { SettingsPassword } from "./sections/setPassword";
import { useEffect } from "react";

const Account = () => {
  const auth = useAuthContext() as any;

  useEffect(() => {
    document.title = 'Docifier - Account';
  })

  return (
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
  );
};

export default Account;
