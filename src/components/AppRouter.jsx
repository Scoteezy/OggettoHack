import { Routes,Route,Navigate } from "react-router-dom";
import { moderRoutes,publicRoutes,userRoutes } from "../routes";
import { useSelector } from "react-redux";
const AppRouter = () =>{
    const {auth,userInfo} = useSelector(store=>store.auth);
    return (
        
        auth
        ?userInfo.role=='admin'?<Routes>
           {moderRoutes.map((route,i)=>
          <Route key = {i} path = {route.path} element={<route.element/>}/>
            )}
            <Route path='/*' element={<Navigate to="/moder" replace/>}/>

        </Routes>:<Routes>
        {userRoutes.map((route,i)=>
          <Route key = {i} path = {route.path} element={<route.element/>}/>
        )}
        <Route path='/*' element={<Navigate to="/userpage" replace/>}/>

        </Routes>:<Routes>
        {publicRoutes.map((route,i)=>
          <Route key = {i} path = {route.path} element={<route.element/>}/>
        )}
        <Route path='/*' element={<Navigate to="/" replace/>}/>
        </Routes>
    )


}
export default AppRouter;