import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Paper, Button, Box } from '@mui/material';
import { RMIUploader } from "react-multiple-image-uploader";
import { editProduct } from '../redux/products/productsSlice';



export default function EditProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  // console.log(params.id)

  const productList = useSelector((state) => state.products)
  const existingProduct = productList.filter(product => product.id === params.id)
  // console.log(productList )
  console.log(existingProduct, 'existing')
  const { avatar, name, price, stockAvailable } = existingProduct[0]
  console.log(stockAvailable)

  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage, 'selectedImage')
  const [imageUrl, setImageUrl] = useState([]);
  const [productName, setProductName] = useState(name)
  const [productPrice, setProductPrice] = useState(price)
  const [stock, setStock] = useState(stockAvailable)
  const [visible, setVisible] = useState(false);
  // console.log(stock, 'bool')

  // useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //   }
  // }, [selectedImage]);

  const imgUrlList = imageUrl.map(item => item.dataURL)
  console.log(imageUrl, 'imageUrl')
  console.log(imgUrlList, 'url list')
  const handleSubmit = (e) => {
    const editData = {
      id: params.id,
      imgUrlList,
      productName, productPrice, stock
    }
    e.preventDefault();
    dispatch(editProduct(editData))
    console.log(imageUrl, productName, productPrice, stock)
    navigate('/dashboard/user')
  }

  const handleSetVisible = () => {
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };
  const onUpload = (data) => {
    console.log("Upload files", data);
    setImageUrl(data, 'dataasd')
    
  };
  const onSelect = (data) => {
    console.log("Select files", data);
  };
  const onRemove = (id) => {
    console.log("Remove image id", id);
  };

  return (
    <Paper elevation={3} style={{backgroundColor: 'cream'}} >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3} marginLeft={5}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Add Product
            </Typography>

          </Grid>
          <Grid item xs={12} >
            {imageUrl && selectedImage ? (
              <Box mt={2} textAlign="center">
                {/* <div>Image Preview:</div> */}
                <img src={imageUrl} alt={selectedImage.name} height="100px" />
              </Box>
            ) :
              <img src={avatar} alt='imgItem' style={{ maxHeight: '100px' }} />}
          </Grid>
          <Grid item xs={4}>
            {/* <div className="App"> */}
              {/* <button onClick={handleSetVisible}>Show Me</button> */}
              <RMIUploader
                isOpen={visible}
                hideModal={hideModal}
                onSelect={onSelect}
                onUpload={onUpload}
                onRemove={onRemove}
                dataSources={imageUrl}
              />
            {/* </div> */}
          </Grid>
          {/* <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              id="select-image"
              style={{ display: 'none' }}
              onChange={e => setSelectedImage(e.target.files[0])}
            />
            <label htmlFor="select-image">
              <Button variant="contained" color="primary" component="span">
                Upload Image
              </Button>
            </label>
          </Grid> */}
          <Grid item xs={12}>
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
            <Button type='submit' variant='contained'>
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

