import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rio from '@retter/sdk'

const rio = Rio.getInstance({
  projectId: '7cgkuj6cl',
  url: 'api.pinar.retter.io',
})

export const AuthGuard = (props) => {
  const { children } = props;
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (ignore.current) {
      return
    } else {
      setChecked(true)
    }

    ignore.current = true

    rio.authStatus.subscribe((authStatus) => {
      if (authStatus.authStatus !== 'SIGNED_IN') {
        console.log('Not authenticated, redirecting')
        navigate('/auth/login')
      }
    })
  }, [navigate])

  if (!checked) {
    return null;
  }

  return children
}
