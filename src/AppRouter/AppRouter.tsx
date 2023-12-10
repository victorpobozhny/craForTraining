import {NavLink, Route, Routes, useNavigate, useParams, useSearchParams} from "react-router-dom";
import {useEffect} from "react";


const Profile = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    console.log(searchParams.get('name'))
    console.log(Object.fromEntries(searchParams))
    useEffect(()=>{

    }, [searchParams])




    const navigate = useNavigate()
    // useEffect(() => {             // если мы не залогинены (указать условие), то перенести на логин это для первого рендеринга
    //     if (true) {
    //         navigate('/login')
    //     }
    // }, [])

    return (
        <div>

            profile
            <button onClick={() => {
                navigate('/login')
                setSearchParams({age: '32'})
            }}>logout</button>
        </div>
    )
}

export const AppRouter = () => {
    const params = useParams<'*'>()
    console.log(params["*"])

    return (
        <div>
            <NavLink to={'/'}>--main--</NavLink> {/*//чтобы могли переходить по соответствующим путям Path*/}
            <NavLink style={(params) => {
                return {
                    color: params.isActive ? 'lime' : 'grey',
                    border: params.isPending ? 'solid 1px black' : 'solid 1px red'
                }  // колбэк для стилей, в который автоматически поставляется изАктив, + еще 2 параметра
            }}
                     to={'/login'}>--login--</NavLink>
            <NavLink to={'/profile'}>--profile--</NavLink>
            <NavLink to={'/profile/settings'}>--settings--</NavLink>


            <Routes>
                <Route path={'/*'} element={<div>page 404</div>}/> {/* если что-то, чего у нас нет, то ошибку */}
                <Route path={'/'} element={<div>main</div>}/> {/*можно ставить компоненты вместо div*/}
                <Route path={'/login/*'} element={
                    <div>login</div>}/> {/*  все, что идет после слэша будет под параметром звездочка `*`  */}
                <Route path={'/profile/*'} element={     // обязательна звездочка для того, чтобы отрисовывались вложенные дети
                    <div>
                        <Profile/>
                        <Routes>
                            <Route path={'/settings'}
                                   element={<div>settings</div>}/> {/*вложенность . для нее в пути не нужна профайл*/}
                        </Routes>
                    </div>
                }/>

            </Routes>
        </div>
    )
}