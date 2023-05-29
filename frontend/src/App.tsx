import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'

//pages
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'

const App = () => {

  return (
    <BrowserRouter>
      <div>
        <header>
          <Link href="/"> Omozon </Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:slug" element={<ProductScreen/>}/>
            <Route path="/" element={<HomeScreen/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
