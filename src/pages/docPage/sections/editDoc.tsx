import { useEffect, useRef, useState } from 'react'
import { Box, Button, Card, CardActions, CardHeader, Divider, Tab } from '@mui/material'
import { useAuthContext } from '../../../contexts/auth-context'
import { useLocation } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React from 'react'
import 'easymde/dist/easymde.min.css'

import { CKEditor } from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build-goodmantr194'
import 'prismjs/themes/prism.css'
import Prism from 'prismjs'

export const EditDoc = ({ docId, sheetId }) => {
  const auth = useAuthContext() as any
  const [editorData, setEditorData] = useState("")
  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const handleEditorChange = (event, editor) => {
    console.log((editor as any).getData())
    setEditorData((editor as any).getData())
  }

  const handleSave = async (e) => {
    await auth.saveDocSheet(docId, sheetId, editorData)
  }

  const editorConfiguration = {
    placeholder: 'Type the content here!',
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const docId = queryParams.get('id');
    const sheetId = queryParams.get('sheet');

    const getDocSheetEffect = async () => {
      const data = await auth.getDocSheet(docId, sheetId)
      setEditorData(data.data || "")
    }
    getDocSheetEffect()
  }, [])

  return (
    <Card>
      <CardHeader subheader="Edit Documentation" title={'Doc Name TODO'} />
      <CardActions>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Document" value="1" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={editorData}
                onChange={handleEditorChange}
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log('Editor is ready to use!', editor)
                }}
                onBlur={(event, editor) => {
                  console.log('Blur.', editor)
                }}
                onFocus={(event, editor) => {
                  console.log('Focus.', editor)
                }}
              />
            </TabPanel>
          </TabContext>
        </Box>
      </CardActions>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" type="submit" onClick={handleSave}>
          Save
        </Button>
      </CardActions>
    </Card>
  )
}
