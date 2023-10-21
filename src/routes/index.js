
import MainPage from "../pages/MainPage/MainPage";
import ModeratorPage from "../pages/ModeratorPage/ModeratorPage";
import UserPage from "../pages/UserPage/UserPage";
import Registration from "../pages/Registration/RegistrationPage";
import Login from "../pages/Registration/Login";

export const moderRoutes = [
    {path: '/', element: MainPage},
    {path: '/moder', element: ModeratorPage},
    {path: '/userpage',element: UserPage  },
    

]
export const publicRoutes = [
    {path: '/', element: MainPage},
    {path: '/registration', element: Registration},
    {path: '/login', element: Login}
]
export const userRoutes = [
    {path: '/', element: MainPage},
    {path: '/userpage',element: UserPage  }
]