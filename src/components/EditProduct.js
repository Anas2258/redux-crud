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
import LinearProgress from '@mui/material/LinearProgress';
import { useDropzone } from 'react-dropzone'
import { editCategory, addImage } from '../redux/products/categorySlice';
// import { addImage } from '../redux/products/categorySlice';

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
export default function EditProduct() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()
  // console.log(params.id)

  // const productList = useSelector((state) => state.products)
  // const existingProduct = productList.filter(product => product.id === params.id)

  const { categories, loading } = useSelector((state) => state.categories)
  console.log(categories)

  const existingCategory = categories.filter(category => category._id === params.id)
  console.log(existingCategory, 'existingCategory')
  const { name, description, images } = existingCategory[0]
  // console.log(stockAvailable)

  const [selectedImage, setSelectedImage] = useState(null);
  // console.log(selectedImage, 'selectedImage')
  const [imageUrl, setImageUrl] = useState([]);
  const [categoryName, setCategoryName] = useState(name)
  const [categoryDesc, setCategoryDesc] = useState(description)
  const [sentImgs, setSentImgs] = useState()
  // const [stock, setStock] = useState(tru)
  // const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState([]);
  const [percentage, setPercentage] = useState(0)

  console.log(files, 'files')
  // console.log(stock, 'bool')
  console.log(percentage, 'percentage')
  // useEffect(() => {
  //   if (selectedImage) {
  //     setImageUrl(URL.createObjectURL(selectedImage));
  //   }
  // }, [selectedImage]);

  // const imgUrlList = files.map(item => item.preview)

  // console.log(imageUrl, 'imageUrl')
  // console.log(imgUrlList, 'url list')
  const handleSubmit = (e) => {
    const editData = {
      id: params.id,
      name: categoryName, description: categoryDesc, sentImgs, setPercentage
    }
    e.preventDefault();
    dispatch(editCategory(editData))
    dispatch(addImage(editData))
    console.log(imageUrl, categoryName, categoryDesc)
    // if(percentage >= 100){
      navigate('/dashboard/user')
    // }
  }

  // const handleImageUpload = () => {
  //   const addImg = {
  //     id: params.id,
  //     sentImgs
  //   }
    
  // }

  // const handleSetVisible = () => {
  //   setVisible(true);
  // };
  // const hideModal = () => {
  //   setVisible(false);
  // };
  // const onUpload = (data) => {
  //   console.log("Upload files", data);
  //   setImageUrl(data, 'dataasd')

  // };
  // const onSelect = (data) => {
  //   console.log("Select files", data);
  // };
  // const onRemove = (id) => {
  //   console.log("Remove image id", id);
  // };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open
  } = useDropzone({
    // accept: "image/*",
    noClick: true,
    onDrop: (acceptedFiles) => {
      const uploadedFile  = acceptedFiles
      console.log(uploadedFile)
      setSentImgs(uploadedFile)
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
  
  const existingThumbs = images && images.map(item => (
    <div style={thumb}>
      <div style={thumbInner}>
        <img alt="existing" src={item} style={img} />
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

  return (
    <Paper elevation={3}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Edit Product
            </Typography>

          </Grid>
          {/* <Grid item xs={4} >
            {imageUrl && selectedImage ? (
              <Box mt={2} textAlign="center">
                <div>Image Preview:</div>
                <img src={imageUrl} alt={selectedImage.name} height="100px" />
              </Box>
            ) :
              <img src={avatar} alt='imgItem' style={{ maxHeight: '100px' }} />}
          </Grid> */}
          <Grid item xs={12}>
            <div {...getRootProps({ className: "dropzone", style })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <p style={{ color: 'black', fontSize: '18px', }}>Drag 'n' drop some files to upload</p>
                  <p style={{ color: 'black', fontSize: '18px' }}>or</p>
                  <button type="button" onClick={open}
                    style={{ padding: '7px', width: '150px', color: '#4083f7', backgroundColor: "#fafafa", borderRadius: '5px', borderColor: '#4083f7' }}>
                    Select Files
                  </button>
                </>
              )}
            </div>

            

              <aside style={thumbsContainer}>{thumbs}</aside>
              <LinearProgress variant="determinate" value={percentage} />
{/*              
            <Grid item xs={12}>
              <Button variant='contained' onClick={handleImageUpload}> */}
                {/* Add Image(s)
              </Button>
            </Grid> */}

            {/* <div className="App"> */}
            {/* <button onClick={handleSetVisible}>Show Me</button> */}
            {/* <RMIUploader
                isOpen={visible}
                hideModal={hideModal}
                onSelect={onSelect}
                onUpload={onUpload}
                onRemove={onRemove}
                dataSources={imageUrl}
              /> */}
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
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              type='text'
              name="firstName"
              variant="standard"
              label='description'
              value={categoryDesc}
              onChange={(e) => setCategoryDesc(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="secondary" name="saveAddress" checked={stock} value={stock} onChange={(e) => setStock(e.target.checked)} />}
              label="Available"
            />
          </Grid> */}
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

