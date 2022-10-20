import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Paper, Button, Stack } from '@mui/material';
import axios from 'axios';
import { useDropzone } from 'react-dropzone'
import { addProduct } from '../redux/products/productsSlice';
import { addCategory } from '../redux/products/categorySlice';

const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };
  
  const thumb = {
    display: "inline-flex",
    borderRadius: 10,
    border: "2px solid #dbdbdb",
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 10,
    boxSizing: "border-box",
    boxShadow: "inset 0 0 10px black",
    alignItems: 'center',
    justifyContent: 'center',
  
  };
  
  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };
  
  const img = {
    display: "block",
    width: "auto",
    height: "75%"
  };
  
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "29px",
    borderWidth: 5,
    borderRadius: 2,
    borderColor: "#dbdbdb",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };
  
  const activeStyle = {
    borderColor: "#2196f3"
  };
  
  const acceptStyle = {
    borderColor: "#00e676"
  };
  
  const rejectStyle = {
    borderColor: "#ff1744"
  };

export default function AddProduct() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [files, setFiles] = useState([]);
    // const [imgUrls, setImgUrls] = useState([])
    // const [stock, setStock] = useState(false)
    
    console.log(files, 'imgs')

    // const imgUrlList = files.map(item => item.preview)
    // console.log(imgUrlList, 'imageList')

    const handleSubmit = async (e) => {
        const addData = {
            name:productName, description:productPrice, images: files
        }
        e.preventDefault();
        try {
            await dispatch(addCategory(addData))
            navigate('/dashboard/user')
        }
        catch {
            console.log('error')
        }
        
        // console.log(productName, productPrice)
        
        // axios.post('https://admindemo.bigbyte.app/index.php/api/categories',{
        //     category_name:productName, description:productPrice
        // })
        // .then((res) => console.log(res))
        // .catch((err) => console.log(err))
    }
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open
      } = useDropzone({
        // accept: "image/*",
        noClick:true,
        onDrop: (acceptedFiles) => {
        //   setPercentage(0)
          console.log("accepted", acceptedFiles);
          setFiles(
            acceptedFiles.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        }
      });
    
    //   console.log(files, 'images')
      const style = React.useMemo(
        () => ({
          ...baseStyle,
          ...(isDragActive ? activeStyle : {}),
          ...(isDragAccept ? acceptStyle : {}),
          ...(isDragReject ? rejectStyle : {})
        }),
        [isDragActive, isDragReject, isDragAccept]
      );
      
    
      const thumbs = files.map((file) => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img alt="selected" src={file.preview} style={img} />
          </div>
        </div>
      ));
    
    
      useEffect(
        () => () => {
          // Make sure to revoke the data uris to avoid memory leaks
          files.forEach((file) => URL.revokeObjectURL(file.preview));
        },
        [files]
      );

        // useEffect(() => {
        //     files.map((file) => setImgUrls(file.preview))
        // },[])
        
    return (
        <Paper elevation={3} sx={{padding:5}}>
            {/* <Typography variant="h6" gutterBottom>
                Add Category Image
            </Typography> */}
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    {/* <Grid item xs={12}>
                    <div {...getRootProps({ className: "dropzone", style })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <p style={{color: 'black', fontSize: '18px', }}>Drag 'n' drop some files to upload</p>
                  <p style={{ color:'black', fontSize: '18px' }}>or</p>
                  <button type="button" onClick={open} 
                    style={{ padding:'7px', width:'150px', color:'#4083f7',backgroundColor: "#fafafa", borderRadius:'5px', borderColor: '#4083f7' }}>
                    Select Files
                  </button>
                </>
              )}
            </div>
            <aside style={thumbsContainer}>{thumbs}</aside>
                </Grid> */}
                <Stack sx={{marginLeft:60}}>
                <Typography variant="h6" gutterBottom>
                Add Category Stats
            </Typography>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id="name"
                            name="firstName"
                            label="Name"
                            variant="outlined"
                            margin='dense'
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
                            variant="outlined"
                            label='description'
                            margin='dense'
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' variant='contained' sx={{margin:2}}>
                            {/* <Button component={RouterLink} to='/dashboard/user' type='submit' variant='contained'> */}
                            Add
                        </Button>
                    </Grid>
                    </Stack>
                    
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
                    

                </Grid>
            </form>
        </Paper >
    );
}