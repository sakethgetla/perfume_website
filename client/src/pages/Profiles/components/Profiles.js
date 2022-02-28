import React from "react";
import {
    Switch,
    Route,
    useRouteMatch,
    Link,
} from "react-router-dom";
// import ProfilePage from "./ProfilePage"
import EditProfile from "./EditProfile"
import { useAuth } from "../../../Auth"

function Profiles() {

    let { path, url } = useRouteMatch();

    return(
    <div>
        <Switch>
            <Route path={`${path}/:id/edit`} component={EditProfile} url={url}/>
            {/* <Route path={`${path}/:id`} component={ProfilePage} url={url}/> */}
            <Route path={`${path}`}>
                <h1>Users list</h1>
                <Link to={`${path}/0`}>
                    0
                </Link>
            </Route>
        </Switch>   
    </div>
    );
}

export default Profiles;