import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    categories: [],
    loading: false
}

export const getCategories = createAsyncThunk('categories/getCategories', 
    async() => {
        try{
            const response = await axios.get('https://b6e5-2405-201-2009-c1e2-5e8f-9b62-8f91-83a5.ngrok.io/category',{headers:{
                "ngrok-skip-browser-warning": "69420",
              }})
            return response.data.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const addCategory= createAsyncThunk('categories/addCategory', 
    
    async(values) => {
        console.log(values)
        try{
            const response = await axios.post('https://b6e5-2405-201-2009-c1e2-5e8f-9b62-8f91-83a5.ngrok.io/category',{headers:{
                "ngrok-skip-browser-warning": "69420",
              }},{
                name: values.name,
                description:values.description
            }
                // name: values.name,    
                // description: values.description
                // values
            )
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
        [deleteCategory.fulfilled]: (state, action) => {
            state.loading = false;
            const {
              arg: { id },
            } = action.meta;
            if (id) {
              state.categories = state.categories.filter((item) => item.id !== id);
            }
            console.log('deleted successfully')
          },
    }
})

export const categoriesReducer = categoriesSlice.reducer
