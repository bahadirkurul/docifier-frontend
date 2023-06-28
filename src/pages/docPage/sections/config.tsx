import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import Cog8ToothIcon from '@heroicons/react/24/solid/Cog8ToothIcon'
import DocumentMagnifyingGlassIcon from '@heroicons/react/24/solid/DocumentMagnifyingGlassIcon'
import DocumentPlusIcon from '@heroicons/react/24/solid/DocumentPlusIcon'
import { SvgIcon } from '@mui/material'
import { useLocation, useParams } from 'react-router-dom'


export const staticDocTabs = (documentationId: string) => {
  const search = window.location.search

  return [
    {
      type: 'docTab',
      title: 'Overview',
      path: `/docs/overview/${documentationId}`,
      icon: (
        <SvgIcon fontSize="small">
          <DocumentMagnifyingGlassIcon />
        </SvgIcon>
      ),
    },
    {
      type: 'docTab',
      title: 'Settings',
      path: `/docs/settings/${documentationId}`,
      icon: (
        <SvgIcon fontSize="small">
          <Cog8ToothIcon />
        </SvgIcon>
      ),
    },
  ]
  
}
