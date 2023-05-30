import { useContext } from "react"
import { Store } from "../Store"
import { Helmet } from "react-helmet-async"
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import MessageBox from "../components/MessageBox"
import axios from "axios"


const CartScreen = () => {
    const navigate = useNavigate()
    const {state, dispatch: ctxDispatch} = useContext(Store)
    const{
        cart: {cartItems},
    } = state; 

    const updateCartHandler = async (item:any, quantity:any) => {
        const {data} = await axios.get(`http://localhost:5000/api/products/${item._id}`)
        if (data.countInStock < quantity) {
            window.alert('Sorry. Product is out of stock');
            return;
          }
          ctxDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity},
          });
    }

    const checkoutHandler = () =>{
        navigate('/signin?redirect=/shipping')
    }

    const removeCartHandler = async (item:any) => {
        ctxDispatch({type: 'CART_REMOVE_ITEM', payload: item})
    }

  return (
    <div>
        <Helmet>
            <title>Shopping Cart</title>
        </Helmet>
        <h1>Shopping Cart</h1>
        <Row>
            <Col md={8}>
                {cartItems.length === 0 ? (
                    <MessageBox>
                        Cart is empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                ):
                (
                    <ListGroup>
                        {cartItems.map((item:any) =>(
                            <ListGroup.Item key={item._id}>
                                <Row className="align-items-center">
                                    <Col md={4}>
                                        <img className="img-fluid rounded img-thumbnail" src={item.image} alt={item.name} />{' '}
                                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={3}>
                                        <Button 
                                        variant="light" 
                                        disabled={item.quantity === 1}
                                        onClick={() => updateCartHandler(item, item.quantity - 1)}
                                        >
                                            <i className="fas fa-minus-circle"></i>
                                        </Button>{' '}
                                        <span>{item.quantity}</span>
                                        <Button 
                                        variant='light' 
                                        onClick={() => updateCartHandler(item, item.quantity + 1)}
                                        disabled={item.quantity === item.countInStock}>
                                            <i className="fas fa-plus-circle"></i>
                                        </Button>
                                    </Col>
                                    <Col md={3}>${item.price}</Col>
                                    <Col md={2}>
                                        <Button 
                                        variant="light"
                                        onClick={() => removeCartHandler(item)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )
                }
            </Col>
            <Col md={4}>
                <Card>
                    <Card.Body>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3>
                                    Subtotal ({cartItems.reduce((a:any, c:any) => a + c.quantity,0)}{' '} items):
                                    ${cartItems.reduce((a:any,c:any) => a + c.price * c.quantity, 0)}
                                </h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <div className="d-grid">
                                    <Button
                                        type="button"
                                        variant='primary'
                                        onClick={checkoutHandler}
                                        disabled={cartItems.length == 0}>
                                            Proceed to Checkout
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default CartScreen