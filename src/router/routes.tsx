import { Navigate, Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import LoginPage from "../frontend/login";
import NavbarSimple from "../frontend/NavbarSimple";
import { HtmlValidator } from "../frontend/htmlvalidator";

const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path= "/" element={<Navigate to ={"/login"}/>}/>
            <Route path ="login" element ={<LoginPage/>}/>
            
            <Route path="main">
            <Route path = "NavbarSimple" element={<NavbarSimple/>}/>
            </Route>
            
            <Route path="validator">
            <Route path = "html-val" element={<HtmlValidator/>}/>
            </Route>
            
        </Route>
    ),
);

export default routes