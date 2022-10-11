import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {id: '1', name: 'mobile', price: 450, stockAvailable: true},
    {id: '2', name: 'keyboard', price: 50, stockAvailable: true},
    {id: '3', name: 'mouse', price: 40, stockAvailable: true},
    {id: '4', name: 'television', price: 250, stockAvailable: true}
]

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers:{
        addProduct:(state, action) => {
            console.log(action.payload)
            const product = {
                id: action.payload.id,
                name: action.payload.productName,
                price: action.payload.productPrice,
                stockAvailable: action.payload.stock
            }
            console.log(product, 'new product')
            state.push(product)
        }
    }
})


export const {addProduct} = productsSlice.actions
export default productsSlice.reducer