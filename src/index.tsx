import ReactDOM from 'react-dom/client'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { UserContextProvider } from './contexts/UserContext'
import { App } from './app'
import { CssBaseline } from '@mui/material'
import { LoadingContextProvider } from './contexts/LoadingContext'
import { FirebaseContextProvider } from './contexts/FirebaseContext'
import { DocumentationContextProvider } from './contexts/DocumentationContext'
import { SnackbarProvider, VariantType, enqueueSnackbar } from 'notistack'

export const notify = (message: string, alertVariant: VariantType, hideDuration: number) => {
  enqueueSnackbar(message, {
    variant: alertVariant,
    autoHideDuration: hideDuration,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'right',
    },
  })
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <ThemeContextProvider>
    <CssBaseline />
    <SnackbarProvider maxSnack={3}>
      <FirebaseContextProvider>
        <AuthProvider>
          <LoadingContextProvider>
            <UserContextProvider>
              <DocumentationContextProvider>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </DocumentationContextProvider>
            </UserContextProvider>
          </LoadingContextProvider>
        </AuthProvider>
      </FirebaseContextProvider>
    </SnackbarProvider>
  </ThemeContextProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
