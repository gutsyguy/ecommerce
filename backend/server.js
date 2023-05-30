import express from 'express';
import data from './data.js';
const port = process.env.PORT || 5000;
const app = express();

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Handle GET request for /api/products
app.get('/api/products', (req, res) => {
  res.send(data.products);
});


app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find(x => x.slug == req.params.slug)
  if (product){
    res.send(product)
  }
  else{
    res.send(404).send({message: "Product not found"})
  }
  res.send(data.products);
});

app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});


app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
