import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon'
import Cog8ToothIcon from '@heroicons/react/24/solid/Cog8ToothIcon'
import DocumentMagnifyingGlassIcon from '@heroicons/react/24/solid/DocumentMagnifyingGlassIcon'
import DocumentPlusIcon from '@heroicons/react/24/solid/DocumentPlusIcon'
import { SvgIcon } from '@mui/material'
import { useLocation } from 'react-router-dom'



export const documentations = (docs: any[]) => {
  return docs.map((doc) => ({
      type: 'documentation',
      docId: doc.docId,
      title: doc.alias,
      path: `/docs?id=${doc.docId}`,
      icon: (
        <SvgIcon fontSize="small">
          <DocumentTextIcon />
        </SvgIcon>
      ),
    }))
  
}

export const staticDocTabs = () => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  const id = params.get('id')
  return [
    {
      type: 'docTab',
      title: 'Overview',
      path: `/docs/overview?id=${id}`,
      icon: (
        <SvgIcon fontSize="small">
          <DocumentMagnifyingGlassIcon />
        </SvgIcon>
      ),
    },
    {
      type: 'docTab',
      title: 'Settings',
      path: `/docs/settings?id=${id}`,
      icon: (
        <SvgIcon fontSize="small">
          <Cog8ToothIcon />
        </SvgIcon>
      ),
    },
  ]
  
}
