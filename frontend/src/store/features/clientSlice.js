import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const login = createAsyncThunk(
    'client/login',
    async () => {
        const response = await axios.post('https://admindev.inceptia.ai/api/v1/login/', {
            "email": "reactdev@iniceptia.ai",
            "password": "4eSBbHqiCTPdBCTj",
        })
        return response.data.token;
    }
)

export const getBotList = createAsyncThunk(
    'client/botList',
    async (token) => {
        const res = await axios.get('https://admindev.inceptia.ai/api/v1/clients/', {
            headers: { "authorization": `JWT ${token}` }
        })
        return res.data;
    }
)

export const getRangeDate = createAsyncThunk(
    'client/rangeDate',
    async ( { token, url, idCliente, startDate, endDate } ) => {

        const requestURL = url === undefined ? `https://admindev.inceptia.ai/api/v1/inbound-case/?client=${idCliente !== 0 ? idCliente : '28'}&local_updated__date__gte=${startDate}&local_updated__date__lte=${endDate}`
            : url
        if (startDate !== null && endDate !== null) {
            const res = await axios.get(requestURL, {
                headers: { "authorization": `JWT ${token}` }
            })

            return {
                results: res.data.results,
                next: res.data.next,
                previous: res.data.previous
            }

        }
    }
)

export const clientSlice = createSlice({
    name: 'client',
    initialState: {
        clientID: 28,
        token: '',
        botList: [],
        search: {
            results: '',
            next: null,
            previous: null
        }
    },
    reducers: {
        setClientID: (state, action) => {
            state.clientID = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload;
        })
        builder.addCase(getBotList.fulfilled, (state, action) => {
            state.botList = action.payload;
        })
        builder.addCase(getRangeDate.fulfilled, (state, action) => {
            state.search.results = action.payload.results;
            state.search.next = action.payload.next;
            state.search.previous = action.payload.previous;
        })
    },
})

export const { setClientID } = clientSlice.actions

export default clientSlice.reducer