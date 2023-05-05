import { useCallback, useRef, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuthContext } from '../../../contexts/auth-context';

export const CreateDocInfo = () => {
  const test = useRef("")
  const auth = useAuthContext() as any;

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const createdDoc = await auth.createDoc(test.current['value'])

    window.location.href = `/docs/overview?id=${createdDoc.docId}`
  }

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};