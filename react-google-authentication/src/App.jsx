import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import {useState} from "react";
import axios from "axios";
import {Box, Button, IconButton, Paper, Typography} from "@mui/material";
import {CloseOutlined, Google} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {getUser, isUserLoggedIn, removeUser, setUser} from "./features/user/userSlice.js";
import toast from "react-hot-toast";

function App() {
    const dispatch = useDispatch();
    let reusableToast = null;
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const isLoggedIn = useSelector(isUserLoggedIn);
    const userInfo = useSelector(getUser);

    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {

            const userData = await axios.get(`${import.meta.env.VITE_USER_INFO_URL}${codeResponse.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${codeResponse.access_token}`,
                        Accept: 'application/json'
                    }
                });

            dispatch(setUser(userData.data));
            toast.dismiss(reusableToast);
            setIsLoggingIn(false);
        },
        onError: (error) => {
            console.log('Login Failed:', error);
            toast.dismiss(reusableToast);
            toast.error('Login Failed!');
            setIsLoggingIn(false);
        },
        onNonOAuthError: (nonOAuthError) => {
            console.log(nonOAuthError);
            toast.dismiss(reusableToast);
            toast.error('Login Failed!');
            setIsLoggingIn(false);
        }
    });

    function handleGoogleLogin() {
        setIsLoggingIn(true);
        reusableToast = toast.loading("Trying to log in...");
        login();
    }

    const logOut = () => {
        googleLogout();
        dispatch(removeUser());
    };

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100dvh",
            width: "100dvw"
        }}>
            <Paper elevation={4} sx={{
                height: "50%",
                width: "30%",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Typography variant={"h6"} textAlign={"center"}>
                    {isLoggedIn ? `Hi! ${userInfo.name}` : 'Please log in to continue'}
                </Typography>
                <Paper sx={{
                    height: "50%",
                    width: "100%",
                    padding: "1rem",
                    display: "grid",
                    gridTemplateColumns: "1fr 3fr",
                    columnGap: "1rem",
                    position: "relative"
                }}>
                    <Box>
                        <img src={isLoggedIn ? userInfo.picture : "./user/user-fallback.png"} alt={'user-image'} height={"100%"} width={"100%"}
                             style={{objectFit: "cover"}}/>
                    </Box>
                    <Box>
                        <Typography variant={"body1"}>
                            User Name: {isLoggedIn ? `${userInfo.name}` : 'User Name'}
                        </Typography>
                        <Typography variant={"body2"}>
                            Email: {isLoggedIn ? `${userInfo.email}` : 'User Email'}
                        </Typography>
                        <Typography variant={"body2"}>
                            Logged In: {isLoggedIn ? 'Yes' : 'No'}
                        </Typography>
                    </Box>
                    <IconButton sx={{
                        position: "absolute",
                        right: "0"
                    }} disabled={!isLoggedIn} onClick={logOut}>
                        <CloseOutlined/>
                    </IconButton>
                </Paper>
                <Button
                    variant="outlined"
                    startIcon={<Google/>}
                    onClick={handleGoogleLogin}
                    disabled={isLoggingIn || isLoggedIn}
                >
                    Login With Google
                </Button>
            </Paper>
        </Box>
    );
}

export default App
