import { useCallback, useRef, useState } from 'react';
import {
    Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  List,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useAuthContext } from '../../../contexts/auth-context';
import { Logo } from '../../../components/logo';
import { Scrollbar } from '../../../components/scrollbar';
import { userTabs, documentations } from '../../../layouts/dashboard/config';
import { SideNavItem } from '../../../layouts/dashboard/side-nav-item';
import { useLocation } from 'react-router-dom';

export const EditDoc = () => {
  const test = useRef("")
  const auth = useAuthContext() as any;
  const location = useLocation();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const createdDoc = await auth.createDoc(test.current['value'])

    window.location.href = `/docs?id=${createdDoc.docId}`
  }

  return (

      <Card>
        <CardHeader
          subheader="Create Documentation"
          title="Documentation Info"
        />
        <Divider />
        <CardContent>
          <Stack
            spacing={3}
            sx={{ maxWidth: 400 }}
          >
            <TextField
              fullWidth
              label="Title"
              name="title"
              inputRef={test}
              type="text"
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Create
          </Button>
        </CardActions>
      </Card>
  );
};