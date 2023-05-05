import { useEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Card, CardContent, CardHeader, Divider, Stack } from '@mui/material'
import { useAuthContext } from '../../../contexts/auth-context'
import { Scrollbar } from '../../../components/scrollbar'
import { useLocation, useNavigate } from 'react-router-dom'
import { DocSideNavItem } from './side-nav-item'
import { staticDocTabs } from './config'
import { TreeView, TreeItem } from '@mui/lab'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TextSnippet from '@mui/icons-material/Description'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Tree } from 'react-arborist'
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import AutoSize from 'react-virtualized-auto-sizer'

const items = [
  {
    title: 'Getting Started',
    id: 'getting-started',
    children: [],
    order: 1,
    type: 'document',
  },
  {
    title: 'Authentication',
    id: 'authentication',
    type: 'folder',
    children: [
      {
        title: 'Login',
        id: 'login',
        type: 'document',
        children: [],
        order: 1,
      },
    ],
    order: 2,
  },
  {
    title: 'Getting Started',
    id: 'getting-started',
    children: [],
    order: 3,
    type: 'document',
  },
]

const data = [
  { id: '1', name: 'Unread' },
  { id: '2', name: 'Threads' },
  {
    id: '3',
    name: 'Chat Rooms',
    children: [
      {
        id: 'c1',
        name: 'General',
        children: [
          { id: 'c12', name: 'General' },
          { id: 'c22', name: 'Random' },
          { id: 'c32', name: 'Open Source Projects' },
        ],
      },
      { id: 'c2', name: 'Random' },
      { id: 'c3', name: 'Open Source Projects' },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    children: [
      { id: 'd1', name: 'Alice' },
      { id: 'd2', name: 'Bob' },
      { id: 'd3', name: 'Charlie' },
    ],
  },
]

export const DocSideNav = () => {
  const test = useRef('')
  const auth = useAuthContext() as any
  const location = useLocation()
  const navigate = useNavigate();


  function Node({ node, style, dragHandle }) {
    /* This node instance can do many things. See the API reference. */
    const queryParams = new URLSearchParams(window.location.search)
    const id = queryParams.get('id')

    return (
      <ButtonBase
        style={style}
        ref={dragHandle}
        onClick={() => {
          if (node.isLeaf) {
            navigate(`/docs?id=${id}&sheet=${node.data.id}`)
          }
          node.toggle()
        }}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(node.isSelected && {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          }),
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        }}
      >
        <Box
          component="span"
          sx={{
            alignItems: 'center',
            color: 'neutral.400',
            display: 'inline-flex',
            justifyContent: 'center',
            mr: 2,
            ...(node.isSelected &&
              !node.isInternal && {
                color: 'primary.main',
              }),
          }}
        >
          {node.isInternal && node.isOpen && <ArrowDropDownIcon />}
          {node.isInternal && !node.isOpen && <ArrowRightIcon />}
          {node.isLeaf && <TextSnippet fontSize="small" />}
        </Box>
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(node.isSelected &&
              !node.isInternal && {
                color: 'primary.main',
              }),
          }}
        >
          {node.data.name}
        </Box>
      </ButtonBase>
    )
  }

  return (
    <Scrollbar
      sx={{
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
                  <Tree initialData={data} openByDefault={false} width={275} height={600}  indent={24} rowHeight={36} overscanCount={1} paddingTop={30} paddingBottom={10} padding={25 /* sets both */}>
                    {Node as any}
                  </Tree>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Scrollbar>
  )
}
