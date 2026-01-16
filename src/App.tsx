
import { Home } from '@/pages/home/ui/Home'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { WeatherDetail } from '@/pages/weatherDetail/ui/WeatherDetail'

function App() {
  return (
    <div className='h-screen bg-gray-50 overflow-y-auto'>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/detail/:cityName' element={<WeatherDetail />}/>
      </Routes>
    </div>
  )

}

export default App
