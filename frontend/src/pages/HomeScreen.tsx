import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import logger from 'use-reducer-logger'

interface Product {
  slug: string;
  name: string;
  image: string;
  prices: number;
}

interface State {
  products: Product[];
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
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const initialState: State = {
  products: [],
  loading: true,
  error: null,
};

const HomeScreen = () => {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), initialState);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get<Product[]>('http://localhost:5000/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Featured Products</h1>
      <div className='products'>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <div className='product' key={product.slug}>
              <Link to={`/product/${product.slug}`}>
                <img src={product.image} alt={product.name} />
              </Link>
              <div className='product-info'>
                <Link to={`/product/${product.slug}`}>
                  <p>{product.name}</p>
                </Link>
                <p>
                  <strong>{product.prices}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
