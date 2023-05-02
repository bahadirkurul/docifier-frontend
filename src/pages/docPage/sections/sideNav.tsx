import { useCallback, useRef, useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, List, Stack, SvgIconProps, TextField, Toolbar, Tooltip, Typography, styled, buttonClasses } from '@mui/material'
import { useAuthContext } from '../../../contexts/auth-context'
import { Logo } from '../../../components/logo'
import { Scrollbar } from '../../../components/scrollbar'
import { userTabs, documentations } from '../../../layouts/dashboard/config'
import { useLocation } from 'react-router-dom'
import { DocSideNavItem } from './side-nav-item'
import { staticDocTabs } from './config'
import { TreeItem, TreeItemProps, TreeView, treeItemClasses } from '@mui/lab'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import MailIcon from '@mui/icons-material/Mail'
import DeleteIcon from '@mui/icons-material/Delete'
import Label from '@mui/icons-material/Label'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import InfoIcon from '@mui/icons-material/Info'
import ForumIcon from '@mui/icons-material/Forum'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string
    '--tree-view-bg-color'?: string
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string
  color?: string
  labelIcon: React.ElementType<SvgIconProps>
  labelInfo?: any
  labelText: string
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      [`.hierarchyButton`]: {
        display: 'inline-block',
      }
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}))

function StyledTreeItem(props: StyledTreeItemProps) {
  const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, ...other } = props

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  )
}

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
                <TreeView
                  aria-label="gmail"
                  defaultExpanded={['3']}
                  defaultCollapseIcon={<ArrowDropDownIcon />}
                  defaultExpandIcon={<ArrowRightIcon />}
                  defaultEndIcon={<div style={{ width: 24 }} />}
                  sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'inherit' }}
                >
                  <StyledTreeItem 
                  nodeId="1" 
                  labelText="All Mail" 
                  labelIcon={MailIcon} 
                  labelInfo={
                    (
                      <Tooltip title="Add Document">
                        <Button className='hierarchyButton' sx={{display: "none"}}>asd</Button>
                      </Tooltip>
                    
                    )} />
                  <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={DeleteIcon}                   labelInfo={
                    (
                      <Tooltip title="Add Document">
                        <Button className='hierarchyButton' sx={{display: "none"}}>asd</Button>
                      </Tooltip>
                    
                    )} />
                  <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={Label} labelInfo={
                    (
                      <Tooltip title="Add Document">
                        <Button className='hierarchyButton' sx={{display: "none"}}>asd</Button>
                      </Tooltip>
                    
                    )}>
                    <StyledTreeItem nodeId="5" labelText="Social" labelIcon={SupervisorAccountIcon} color="#1a73e8" bgColor="#e8f0fe" />
                    <StyledTreeItem nodeId="6" labelText="Updates" labelIcon={InfoIcon} color="#e3742f" bgColor="#fcefe3" />
                    <StyledTreeItem nodeId="7" labelText="Forums" labelIcon={ForumIcon} color="#a250f5" bgColor="#f3e8fd" />
                    <StyledTreeItem nodeId="8" labelText="Promotions" labelIcon={LocalOfferIcon} color="#3c8039" bgColor="#e6f4ea" />
                  </StyledTreeItem>
                  <StyledTreeItem nodeId="4" labelText="History" labelIcon={Label} labelInfo={
                    (
                      <Tooltip title="Add Document">
                        <Button className='hierarchyButton' sx={{display: "none"}}>asd</Button>
                      </Tooltip>
                    
                    )}/>
                </TreeView>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Scrollbar>
  )
}
