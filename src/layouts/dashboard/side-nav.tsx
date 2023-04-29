import PropTypes from "prop-types";
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "../../components/logo";
import { Scrollbar } from "../../components/scrollbar";
import { documentations, userTabs } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/auth-context";
import { useLocation } from "react-router-dom";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const auth = useAuthContext() as any;
  const [docs, setDocs] = useState([]);
  const location = useLocation();
  
  useEffect(() => {
    const getDocsEffect = async () => {
      const doccs = await auth.getDocs()
      setDocs(doccs || [])
    }
    getDocsEffect()
  }, [])

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ p: 3 }}>
          <Box
            sx={{
              display: "inline-flex",
              height: 32,
              width: 32,
            }}
          >
            <Logo />
          </Box>
          Docifier
        </Box>
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="inherit" variant="subtitle1">
                Tabs
              </Typography>
            </Stack>
            {userTabs
              .filter((i: any) => i!.type === "userTab")
              .map((item: any) => {
                const active = item.path ? location.pathname === item.path : false;

                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
          </Stack>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            <Stack
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="inherit" variant="subtitle1">
                My Documentations
              </Typography>
            </Stack>
            {documentations(docs)
              .filter((i: any) => i.type === "documentation")
              .map((item: any) => {
                const queryParams = new URLSearchParams(window.location.search);
                const id = queryParams.get('id');
                const active = item.docId === id ? true : false;
                
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              })}
          </Stack>
        </Box>


      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
