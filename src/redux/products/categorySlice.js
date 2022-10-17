import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    categories: [],
    loading: false
}

export const getCategories = createAsyncThunk('categories/getCategories', 
    async() => {
        try{
            const response = await axios.get('https://admindemo.bigbyte.app/index.php/api/categories')
            return response.data.categories
        } catch (err) {
            console.log(err)
        }
    }
)

export const addCategory= createAsyncThunk('categories/addCategory', 
    async(values) => {
        console.log(values)
        try{
            const response = await axios.post('https://admindemo.bigbyte.app/index.php/api/categories', {
                category_name: values.category_name,    
                description: values.description
            })
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const deleteCategory= createAsyncThunk('categories/deleteCategory', 
    async(id) => {
        console.log(id)
        try{
            const response = await axios.delete(`https://admindemo.bigbyte.app/index.php/api/categories/${id}`)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)


export const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state) => {
            state.loading = true
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false
            console.log(action.payload)
            state.categories = action.payload
        },
        [getCategories.rejected]: (state) => {
            state.loading = false
        },
        [addCategory.fulfilled]: (state, action) => {
            console.log(action.payload)
            state.categories.push(action.payload)
        },
        [addCategory.rejected]: (state, action) => {
            console.log('errrorrr')
        },
        [deleteCategory.fulfilled]: (state) => {
            console.log('deleted succefully')
        }
    }
})

export const categoriesReducer = categoriesSlice.reducer
