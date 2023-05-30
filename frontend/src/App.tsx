import {BrowserRouter, Route, Routes, NavLink} from 'react-router-dom'
import {Navbar, Container, Nav, Badge} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'


//pages
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen'
import { Store } from './Store'
import CartScreen from './pages/CartScreen'

const App = () => {
  const {state} = useContext<any>(Store)
  const {cart} = state;
  return (
    <BrowserRouter>
      <div className='d-flex flex-column site-container'>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to='/'>Omozon</Navbar.Brand>
                <Nav className="me-auto">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {cart.cartItems.length > 0 &&(
                      <Badge pill bg='danger'>
                        {cart.cartItems.reduce((a:any, c:any) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Link>
                </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className='mt-3'>
            <Routes>
              <Route path="/product/:slug" element={<ProductScreen/>}/>
              <Route path="/cart" element={<CartScreen/>}/>
              <Route path="/" element={<HomeScreen/>}/>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
