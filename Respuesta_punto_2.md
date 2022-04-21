<h1>Ejercicio 2:</h1>
<a href='https://github.com/Master-Victor/ChallengeReactJSDev/tree/ReduxStoreRouter' >Link a la rama donde estan implementados los cambios</a>
<h2> 2.1) ¿Cómo implementarías las acciones del frontend utilizando redux? (por
ejemplo autenticación, solicitud de clientes activos para el usuario y
solicitud de casos por cliente)
</h2>

<h4>1) Lo primero que haria es instalar <a href='https://reactrouter.com/docs/en/v6/getting-started/installation' >react-redux</a> utilizando npm install @reduxjs/toolkit react-redux </h4>
<h4>2) defino un redux store</h4>

        import { configureStore } from '@reduxjs/toolkit';
        import clientReducer from './features/clientSlice';

        export default configureStore({
            reducer: {
                client: clientReducer
            },
        });

<h4>3) envuelvo el componente que contenga la app con el Provider y paso como parametro el store definido anteriormente</h4>

        import { Provider } from 'react-redux';
        import store from './store/store';
        ReactDOM.render(
        <Provider store={store} >
            <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
                <Route path="*" element={<Page404 />} />
            </Routes>
            </BrowserRouter>
        </Provider>,
        document.getElementById("root")
        );

<h4>4) defino el slice con las acciones </h4>

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
                console.log(token, url, idCliente, startDate, endDate)
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

<h2>
2.2) Si quisiéramos agregar una ruta nueva a la app, ¿cómo reestructurarías
el index.js?
</h2>
<h4>1) Lo primero que haria es instalar <a href='https://reactrouter.com/docs/en/v6/getting-started/installation' >react-router-dom</a></h4>
<h4>2) envolveria con la etiqueta BrowserRouter a las rutas y definiria como index a App.jsx</h4>

       <BrowserRouter>
            <Routes>
                <Route index element={<App />} />
            </Routes>
        </BrowserRouter>

<h4>3) Definiria las rutas de la siguiente manera </h4>

        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route index element={<App />} />
                <Route path="*" element={<Page404 />} />
                <Route path='example' element={ <Example /> } />
            </Routes>
        </BrowserRouter>

    

    
