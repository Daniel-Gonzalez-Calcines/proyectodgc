import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { RootState} from '../store/index'
import { authActions } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Home() {

    const userData = useSelector((state: RootState) => state.authenticator)
    console.log(userData)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleonclick = (e: any) => {
        e.preventDefault()
        dispatch(authActions.logout())
        navigate('/')
    }

    return (
        <>
            <Typography>
                Página Home de {userData.userName} con el rol {userData.userRol}
            </Typography>

            <Button variant='contained' fullWidth onClick={handleonclick}>Logout</Button>

        </>
    )
}

export default Home;