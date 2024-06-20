import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginPage from "../frontend/login";
import MainComponent from "../frontend/mainComponent";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path= "/" element={<Navigate to ={"/login"}/>}/>
            <Route path ="login" element ={<LoginPage/>}/>
            
            <Route path="main">
            <Route path = "MainComponent" element={<MainComponent/>}/>
            </Route>
            
            
        </Route>
    ),
);

export default routes