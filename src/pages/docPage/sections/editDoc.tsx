import { useCallback, useEffect, useMemo, useRef } from 'react'
import { Box, Button, Card, CardActions, CardHeader, Divider, Tab } from '@mui/material'
import { useAuthContext } from '../../../contexts/auth-context'
import { useLocation } from 'react-router-dom'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React from 'react'
import SimpleMDE from "easymde";
import "easymde/dist/easymde.min.css";
import SimpleMdeReact from 'react-simplemde-editor'
import ReactMarkdown from 'react-markdown'
import ReactDOMServer from "react-dom/server";
import remarkGfm from 'remark-gfm'
import remarkCodeTitles from "remark-flexible-code-titles";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {atomDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export const EditDoc = ({docId, sheetId}) => {
  const test = useRef('')
  const auth = useAuthContext() as any
  const location = useLocation()

  const [value, setValue] = React.useState('1')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const MyMDE = () => {
    const delay = 1000
    let mdValue = localStorage.getItem(`smde_${docId}_${sheetId}`) || "Initial value";
    console.log(mdValue);
    
    const onChange = useCallback((value: string) => {
      mdValue = value
    }, []);
    
    const options = useMemo(() => {
      
      return {
        autofocus: false,
        spellChecker: false,
        inputStyle: 'contenteditable',
        autosave: {
          enabled: true,
          uniqueId: `${docId}_${sheetId}`,
          delay,
        },
        previewRender() {
          return ReactDOMServer.renderToString(
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkCodeTitles,]}
              children={mdValue}
              components={{
                code({node, inline, className, children, ...props}) {
                  const match = /language-(\w+)/.exec(className || '')
                  console.log(children);
                  
                  return !inline && match ? (
                    <SyntaxHighlighter
                      {...props}
                      children={String(children).replace(/\n$/, '')}
                      style={atomDark}
                      language={match[1]}
                      PreTag="div"
                      showLineNumbers={true}
                    />
                  ) : (
                    <code {...props} className={className}>
                      {children}
                    </code>
                  )
                }
              }}
            />
          );
        },
      } as SimpleMDE.Options;
    }, [mdValue, delay]);

    useEffect(() => {
      const startValue = localStorage.getItem(`smde_${docId}_${sheetId}`) || "Initial value";
      mdValue = startValue
    }, [])
  
    return (
      <SimpleMdeReact
        options={options}
        value={mdValue}
        onChange={onChange}
      />
    );
  };
  

  return (
    <Card>
      <CardHeader subheader="Edit Documentation" title={'Doc Name TODO'} />
      <CardActions>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Document" value="1" />
                <Tab label="Test API" value="2" />
                <Tab label="Settings" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1">
            	<MyMDE/>

            </TabPanel>
            <TabPanel value="2">
              Test API
            </TabPanel>
            <TabPanel value="3">
              Settings
            </TabPanel>
          </TabContext>
        </Box>
      </CardActions>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="contained" type="submit">
          Create
        </Button>
      </CardActions>
    </Card>
  )
}
