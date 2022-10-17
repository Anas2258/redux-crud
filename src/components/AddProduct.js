import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Paper, Button } from '@mui/material';
import axios from 'axios';
import { addProduct } from '../redux/products/productsSlice';
import { addCategory } from '../redux/products/categorySlice';

export default function AddProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    // const [stock, setStock] = useState(false)

    const handleSubmit = (e) => {
        const addData = {
            category_name:productName, description:productPrice,
        }
        e.preventDefault();
        dispatch(addCategory(addData))
        console.log(productName, productPrice)
        navigate('/dashboard/user')
        // axios.post('https://admindemo.bigbyte.app/index.php/api/categories',{
        //     category_name:productName, description:productPrice
        // })
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err))
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
                            type='text'
                            name="firstName"
                            variant="standard"
                            label='description'
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <input
                            accept="image/*"
                            type="file"
                            id="select-image"
                            style={{ display: 'none' }}
                        />
                        <label htmlFor="select-image">
                            <Button variant="contained" color="primary" component="span">
                                Upload Image
                            </Button>
                        </label>
                    </Grid> */}
                    {/* <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox color="secondary" name="saveAddress" value={stock} onChange={(e) => setStock(e.target.checked)} />}
                            label="Available"
                        />
                    </Grid> */}
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained'>
                            {/* <Button component={RouterLink} to='/dashboard/user' type='submit' variant='contained'> */}
                            Add
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Paper >
    );
}