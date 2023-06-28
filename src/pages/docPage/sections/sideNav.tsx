import { useEffect, useRef, useState } from 'react'
import { Box, ButtonBase, Card, CardContent, CardHeader, Collapse, Divider, Stack, SvgIconProps, Typography, alpha, styled, useTheme } from '@mui/material'
import { Scrollbar } from '../../../components/scrollbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { DocSideNavItem } from './side-nav-item'
import { staticDocTabs } from './config'
import { TreeView, TreeItem, treeItemClasses, TreeItemProps } from '@mui/lab'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import TextSnippet from '@mui/icons-material/Description'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Tree } from 'react-arborist'
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import AutoSize from 'react-virtualized-auto-sizer'
import { useSpring, animated } from '@react-spring/web'
import { TransitionProps } from '@mui/material/transitions'

interface RenderTree {
  id: string
  name: string
  children?: readonly RenderTree[]
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  bgColorForDarkMode?: string;
  color?: string;
  colorForDarkMode?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const data: RenderTree = {
  id: 'root',
  name: 'Parent',
  children: [
    {
      id: '1',
      name: 'Child - 1',
    },
    {
      id: '3',
      name: 'Child - 3',
      children: [
        {
          id: '4',
          name: 'Child - 4',
        },
      ],
    },
  ],
}

function TransitionComponent(props: TransitionProps) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: 'translate3d(20px,0,0)',
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  })

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  )
}

const StyledTreeItem = styled((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />)(({ theme }) => ({
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
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px solid ${alpha(theme.palette.text.primary, 0.3)}`,
  },
}))

function StyledTreeItemV2(props: StyledTreeItemProps) {
  const theme = useTheme();
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props;

  const styleProps = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
      theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode,
  };

  return (
    <StyledTreeItem
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0,
          }}
        >
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      {...other}
    />
  );
}

export const DocSideNav = () => {
  const location = useLocation()
  let { documentationId, documentId } = useParams()
  const navigate = useNavigate()
  const renderTree = (nodes: RenderTree) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} 
    onClick={() => {
      if (!nodes.children || nodes.children?.length <= 0) {
        navigate(`/docs/${documentationId}/${nodes.id}`)
      }
    }}>
      {Array.isArray(nodes.children) ? nodes.children.map((node) => renderTree(node)) : null}
    </StyledTreeItem>
  )

  return (
    <Scrollbar
      sx={{
        position: 'sticky',
        top: '1.5rem',
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
            py: 0.08,
            paddingBottom: 3,
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
                {staticDocTabs(documentationId!)
                  .filter((i: any) => i!.type === 'docTab')
                  .map((item: any) => {
                    const active = item.path ? location.pathname === item.path : false

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
            <CardHeader title="Document Tree" />
            <Divider />
            <CardContent sx={{ py: 2 }}>
              <TreeView
                aria-label="customized"
                defaultExpanded={['1']}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultEndIcon={<DocumentTextIcon />}
                sx={{ height: 264, flexGrow: 1, maxWidth: 400, overflowY: 'none' }}
              >
                {renderTree(data)}
              </TreeView>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Scrollbar>
  )
}
