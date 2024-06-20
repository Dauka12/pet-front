import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { selectIsAuthenticated, selectUser } from "../../features/user/userSlice"
import Container from "../container"
import Header from "../header"
import NavBar from "../nav-bar"

const Layout = () => {
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/auth')
        }
    })
    return (
        <>
            <Header />
            <Container>
                <div className="flex-2 p-4">
                    <NavBar/>
                </div>
                <div className="flex-1 p-4">
                    <Outlet/>
                </div>
            </Container>
        </>
    )
}

export default Layout
