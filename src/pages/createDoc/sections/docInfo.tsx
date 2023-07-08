import { useRef } from 'react';
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
import { useDocumentationContext } from '../../../contexts/DocumentationContext';

export const CreateDocInfo = () => {
  const alias = useRef("")
  const { createDocumentation } = useDocumentationContext()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const asd = await createDocumentation(alias.current['value'])
    console.log(asd);
    
    // window.location.href = `/docs/overview?id=${createdDoc.docId}`
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
              inputRef={alias}
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