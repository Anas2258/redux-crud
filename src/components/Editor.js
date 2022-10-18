import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter'
import { editDesc } from '../redux/products/productsSlice';
import { getCategories } from '../redux/products/categorySlice';



const Editor = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()
    // const paramId = Number(params.id)
    // const products = useSelector((state) => state.products)
    // console.log(products)
    // const existingProduct = products.filter(product => product.id === params.id)
    // console.log(existingProduct, 'existing')

    useEffect(() => {
        dispatch(getCategories())
      }, [dispatch] )
    
    const {categories, loading}  = useSelector((state) => state.categories)
    // console.log(cater)
    
    const existingCategory = categories.filter(category => category.id === parseInt(params.id, 10))
      
    // const { description } = existingCategory[0]
    // console.log(description)
    
    // console.log(existingCategory)
    // const { avatar, name, price, stockAvailable, description } = existingProduct[0]
    

    
    const [ckData, setCkData] = useState('description')
    const handleClick = () => {
        const editData = {
            id: params.id,
            ckData
          }
        console.log(editData)
        dispatch(editDesc(editData))
        navigate('/dashboard/user')
    }

//     {!categories &&
         
//             <CircularProgress />
//     :
// }    
    return (
        <>
        {!categories ? <CircularProgress />
        :
        <Container sx={{ marginTop: 10 }} >
            <Button variant='contained' onClick={handleClick} sx={{ mb: 5 }}>
                Click me
            </Button>
            <CKEditor
                editor={ClassicEditor
                    // .create( document.querySelector( '#editor' ), {
                    //     plugins: [ Base64UploadAdapter],
                    //     // toolbar: [ ... ]
                    // } )
                    // .then(res => console.log(res))
                    // .catch( (err) => console.log(err))
                }
                // data={description}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    // console.log(data)
                    setCkData(data)
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />

        </Container>
    }
        </>
        
    )
}

export default Editor