import './App.global.scss'
import { FC } from 'react'
import AuthRoutes from './components/AuthRoutes'
import { BrowserRouter } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'
import Main from './components/Main/Main'

const App: FC = () => {
  const { user } = useAppSelector(value => value.user)

  return (
    <BrowserRouter>
      {!user && <AuthRoutes />}
      {user && <Main />}
    </BrowserRouter>
  )
}

export default App