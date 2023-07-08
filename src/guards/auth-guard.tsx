import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Rio from '@retter/sdk'
import { useFirebaseContext } from '../contexts/FirebaseContext';

const rio = Rio.getInstance({
  projectId: '7cgkuj6cl',
  url: 'api.pinar.retter.io',
})

export const AuthGuard = (props) => {
  const { children } = props;
  const ignore = useRef(false);
  const [checked, setChecked] = useState(false);
  const { firebaseAuth } = useFirebaseContext();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (ignore.current) {
      return
    } else {
      setChecked(true)
    }

    ignore.current = true

    firebaseAuth.onAuthStateChanged(async (user) => {
       if (!user) {
        console.log('Not authenticated, redirecting')
        navigate('/auth/login')
      }
    })
    
  }, [firebaseAuth, navigate])

  if (!checked) {
    return null;
  }

  return children
}
