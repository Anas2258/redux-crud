import { createSlice, nanoid } from "@reduxjs/toolkit";

// const imgList = JSON.parse(localStorage.getItem('imageList'))
// const fileList = imgList && imgList.map(img => img.preview)
// console.log(fileList)

const initialState = [
    {id: '1', name: 'mobile', description:'Description for Item: mobile' ,price: 450, stockAvailable: true, avatar:["https://gravatar.com/avatar/7127e8602845d37ac47cb3198bf4612c?s=400&d=robohash&r=x"]},
    {id: '2', name: 'keyboard', description:'Description for Item: keyboard ', price: 50, stockAvailable: true,avatar: ["https://gravatar.com/avatar/7127e8602845d37ac47cb3198bf4612c?s=400&d=robohash&r=x"]},
    {id: '3', name: 'mouse', description:'Description for Item: mouse', price: 40, stockAvailable: true, avatar:["https://gravatar.com/avatar/68f8bc6aab83b11632c1ccce52f0a98a?s=400&d=robohash&r=x"]},
    {id: '4', name: 'television', description:'Description for Item: television', price: 250, stockAvailable: true,avatar:["https://gravatar.com/avatar/747b37e67e78ab71cc729040f6c73dc9?s=400&d=robohash&r=x"]}
]

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        addProduct:(state, action) => {
            console.log(action.payload)
            const product = {
                id: nanoid(),
                name: action.payload.productName,
                price: action.payload.productPrice,
                stockAvailable: action.payload.stock
        }
            console.log(product, 'new product')
            state.push(product)
        },
        editProduct:(state, action) => {
            // console.log(action.payload)
            const {id, productName, productPrice, stock, imgUrlList} = action.payload
            // console.log(ckData)
            console.log(id, productName, productPrice, stock,imgUrlList)
            const existingProduct = state.find(product => product.id === id)
           
            // console.log(imgList, 'imgList')
            // const imgs = files && files.map(img => img.preview)

            if(existingProduct){
                const existingImgList = existingProduct.avatar
                const mergeImgs = existingImgList.concat(imgUrlList)
                // console.log(mergeImgs, 'imgList')
                existingProduct.avatar = mergeImgs
                existingProduct.name = productName
                existingProduct.price = productPrice
                existingProduct.stockAvailable = stock
            }
        },
        editDesc:(state, action) => {
            const {id, ckData} = action.payload

            const existingProduct = state.find(product => product.id === id)

            if(existingProduct){
                existingProduct.description = ckData
            }
        },
        deleteProduct:(state, action) => {
            return state.filter((product) => product.id !== action.payload.id)
        },
    }
})


export const {addProduct, deleteProduct, editProduct,editDesc } = productsSlice.actions
export const productsReducer = productsSlice.reducer