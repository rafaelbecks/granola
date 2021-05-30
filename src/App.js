import { useEffect } from 'react'

import './App.css'
import Layout from './ui/Layout'

function App () {
  useEffect(async () => {
    console.log('init engines')
  }, [])

  return (
    <div className='App'>
      <Layout />
    </div>
  )
}

export default App
