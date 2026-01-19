
import { Home } from '@/pages/home/ui/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { WeatherDetail } from '@/pages/weatherDetail/ui/WeatherDetail'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className='h-screen bg-gray-50 overflow-y-auto'>
      <Toaster
        position='top-center'
        toastOptions={{
          className: 'font-bold text-sm',
          style: {
            borderRadius: '24px'
          }
        }}
       />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detail/:cityName' element={<WeatherDetail />}/>
      </Routes>
    </div>
  )

}

export default App
