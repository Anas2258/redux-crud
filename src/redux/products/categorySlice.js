import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    categories: [],
    loading: false
}

export const getCategories = createAsyncThunk('categories/getCategories',
    async () => {
        try {
            const response = await axios.get(process.env.REACT_APP_BASE_URL, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                }
            })
            return response.data.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const addCategory = createAsyncThunk('categories/addCategory',

    async (values) => {
        try {
            const response = await axios.post(process.env.REACT_APP_BASE_URL, {
                name: values.name,
                description: values.description
            }
            )
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const deleteCategory = createAsyncThunk('categories/deleteCategory',
    async (id) => {
        console.log(id)
        console.log(process.env.REACT_APP_BASE_URL, '/', id)
        try {
            const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/${id}`)
            return response.data
        } catch (err) {
            console.log(err)
        }
    }
)

export const editCategory = createAsyncThunk('categories/editCategory',
    async (values) => {
        console.log(values)
        try {
            const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/${values.id}`, {
                name: values.name,
                description: values.description
            })
            return response.data
        }
        catch (err) {
            console.log(err)
        }
    }
)

export const addImage = createAsyncThunk('categories/addImage',
    async (images) => {
        const { id, sentImgs, setPercentage } = images
        const formData = new FormData()
        sentImgs.forEach(item => {
            formData.append('images', item)
        })
        let percent = 0
        const config = {
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent
                percent = Math.floor((loaded * 100) / total)
                console.log(`${loaded}kb of ${total}kb | ${percent}%`) // just to see whats

                if (percent <= 100) {
                    setPercentage(percent) // hook to set the value of current level that needs to be passed to the progressbar
                }
            },
            headers: { "Content-Type": "multipart/form-data" }
        }
        // formData.append('category', images.id)

        console.log(Object.fromEntries(formData))
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_IMG_URL}/${id}`,
                formData, config)
            setPercentage(percent)
            setTimeout(() => {
                setPercentage(0)
            },1000)
            //     method:'post',
            //     url:`${process.env.REACT_APP_IMG_URL}/${images.id}`,
            //     data:formData,
            //     headers: {"Content-Type": "multipart/form-data"}
            // })
            console.log(response, 'response')
            return response
        }
        catch (err) {
            console.log(err, 'err image add')
        }
    }
)

export const categoriesSlice = createSlice({
    name: 'categories',
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
        [addImage.fulfilled]: (state, action) => {
            // console.log(action.meta)
            // state.categories.images.concat(action.payload.data.data)
            console.log(action.payload)
        },
        [addImage.rejected]: (state, action) => {
            console.log('errrorrr')
        },
    }
})

export const categoriesReducer = categoriesSlice.reducer
