import { useParams } from "react-router-dom"
import { useEffect, useReducer } from "react";
import axios from "axios";
import { Row, Col, ListGroup, Card, Badge, Button } from "react-bootstrap";


//components
import Rating from "../components/Rating";
import { Helmet } from "react-helmet-async";

interface Product {
    slug: string;
    name: string;
    image: string;
    prices: number;
  }
  
  interface State {
    product: any;
    loading: boolean;
    error: any;
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, product: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  const initialState: State = {
    product: [],
    loading: true,
    error: null,
  };
  

const ProductScreen = () =>{
    const params = useParams()
    const {slug} =  params

    const [{ loading, error, product }, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get<Product[]>(`http://localhost:5000/api/products/slug/${slug}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, [slug]);   


    return (
        loading? <div>...loading</div>
        : error?  <div>{error}</div>
        :
        <div>
            <Row>
                <Col md={6}>
                    <img className="img-large" src={product.image} alt={product.name} />
                </Col>
                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Helmet>
                                <title>{product.name}</title>
                            </Helmet>
                            <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating rating={product.rating} numReview = {product.numReviews}/>
                        </ListGroup.Item>
                        <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                        <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>${product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>
                                            {product.countInStock > 0?
                                            <Badge bg='success'>In Stock</Badge>
                                            :
                                            <Badge bg='danger'>Unavailible</Badge>
                                            }
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className="d-grid">
                                            <Button variant='primary'>
                                                Add to cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen