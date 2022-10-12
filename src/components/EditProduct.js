import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Paper, Button } from '@mui/material';
import { editProduct } from '../redux/products/productsSlice';


export default function EditProduct(){
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams() 
  // console.log(params.id)

  const productList = useSelector((state) => state.products)
  const existingProduct = productList.filter(product => product.id === params.id)
  // console.log(productList )
  console.log(existingProduct, 'existing')  
  const { name, price, stockAvailable } = existingProduct[0]
  console.log(stockAvailable)

  const [productName, setProductName] = useState(name)
  const [productPrice, setProductPrice] = useState(price)
  const [stock, setStock] = useState(stockAvailable )
  // console.log(stock, 'bool')

  const handleSubmit = (e) => {
      const editData = {
        id: params.id,
        productName,productPrice,stock
      }
      e.preventDefault();
      dispatch(editProduct(editData))
      console.log(productName, productPrice, stock)
      navigate('/dashboard/user')
    }
  return (
    <Paper elevation={3}>
            <Typography variant="h6" gutterBottom>
                Add Product
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="firstName"
                            label="Name"
                            variant="standard"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="price"
                            type='number'
                            name="firstName"
                            variant="standard"
                            label='price'
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" checked={stock} value={stock} onChange={(e) => setStock(e.target.checked)} />}
                            label="Available"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button  type='submit' variant='contained'>
                        {/* <Button component={RouterLink} to='/dashboard/user' type='submit' variant='contained'> */}
                            edit
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper >
    // <div>Hello</div>
  )
}

