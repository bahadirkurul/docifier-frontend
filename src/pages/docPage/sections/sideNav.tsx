import { useCallback, useRef, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, List, Stack, TextField, Typography } from '@mui/material'
import { useAuthContext } from '../../../contexts/auth-context'
import { Logo } from '../../../components/logo'
import { Scrollbar } from '../../../components/scrollbar'
import { userTabs, documentations } from '../../../layouts/dashboard/config'
import { useLocation } from 'react-router-dom'
import { DocSideNavItem } from './side-nav-item'
import { staticDocTabs } from './config'

export const DocSideNav = () => {
  const test = useRef('')
  const auth = useAuthContext() as any
  const location = useLocation()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const createdDoc = await auth.createDoc(test.current['value'])

    window.location.href = `/docs?id=${createdDoc.docId}`
  }

  return (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Card>
            <CardHeader title="Documentation Tabs" />
            <Divider />
            <CardContent>
              <Stack
                component="ul"
                spacing={0.5}
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }}
              >
                {staticDocTabs()
                  .filter((i: any) => i!.type === 'docTab')
                  .map((item: any) => {
                    const queryParams = new URLSearchParams(window.location.search)
                    const id = queryParams.get('id')
                    const active = item.path ? location.pathname + '?id=' + id === item.path : false

                    return <DocSideNavItem active={active} disabled={item.disabled} external={item.external} icon={item.icon} key={item.title} path={item.path} title={item.title} />
                  })}
              </Stack>
            </CardContent>
          </Card>
        </Box>
        <Divider />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Card>
            <CardHeader title="Hierarchy" />
            <Divider />
            <CardContent>
              <Stack
                component="ul"
                spacing={0.5}
                sx={{
                  listStyle: 'none',
                  p: 0,
                  m: 0,
                }}
              >
                {userTabs
                  .filter((i: any) => i.type === 'documentation')
                  .map((item: any) => {
                    const queryParams = new URLSearchParams(window.location.search)
                    const id = queryParams.get('id')
                    const active = item.docId === id ? true : false

                    return <DocSideNavItem active={active} disabled={item.disabled} external={item.external} icon={item.icon} key={item.title} path={item.path} title={item.title} />
                  })}
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Scrollbar>
  )
}
