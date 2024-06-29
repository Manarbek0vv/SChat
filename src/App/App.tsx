import './App.global.scss'
import { FC } from 'react'
import AuthRoutes from './components/AuthRoutes'
import { BrowserRouter } from 'react-router-dom'
import { useAppSelector } from './hooks/redux'

const App: FC = () => {
  const { user } = useAppSelector(value => value.user)
  console.log(user)

  return (
    <BrowserRouter>
      <AuthRoutes />
    </BrowserRouter>
  )
}

export default App