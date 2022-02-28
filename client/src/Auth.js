//Example Auth code from https://reactrouter.com/web/example/auth-workflow
import { useContext, createContext, useState } from "react";
import {
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import axios from 'axios';


const passportAuth = {
  isAuthenticated: false,
  user: null,

  signin(email, password, cb) {
    // var formData = new FormData();
    // formData.append('email', 'a@a');
    // formData.append('password','BZftTms3EZPX9Qc!')

    // console.log(email)
    // console.log(password)

    axios({
      method: "POST",
      url: "http://localhost:8000/user/login",
      // data: formData,
      data: `email=${email}&password=${password}`,
      // data: {
      //   email: email,
      //   password: password,
      // },
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      // withCredentials: true,
    }).then(res => {
      // console.log("LOGIN RESULT")
      // console.log(res);
      passportAuth.isAuthenticated=true;
      passportAuth.user=res.data;
      cb(res.data);

    }).catch((error) => {
      console.log(error);
    });
  },

  signout(cb) {
    axios({
      method: "DELETE",
      url: 'http://localhost:8000/user/logout',
    }).then((res)=>{
      console.log(res);
      passportAuth.isAuthenticated = false;
    }).catch((error) => {
      console.log(error);
    });

    cb();
  },

  register(firstname, lastname, email, password, admin, cb) {
    axios({
      method: "POST",
      url: 'http://localhost:8000/user/register',
      data: `first_name=${firstname}&last_name=${lastname}&email=${email}&password=${password}&admin=${admin}`,
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    }).then((res)=>{
      console.log(res);
    }).catch((error) => {
      console.log(error);
    });

    cb();
  },

}

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */
const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

/** Wrapper component for pages that require authentication. */
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const signin = (email, password, cb) => {
    return passportAuth.signin(email, password, (user) => {
      setUser(user);
      cb();
    });
  };

  const signout = cb => {
    return passportAuth.signout(() => {
      setUser(null);
      cb();
    });
  };

  const register = (firstname, lastname, email, password, admin, cb) => {
    return passportAuth.register(firstname, lastname, email, password, admin, ()=>{
      cb();
    });
  };

  return {
    user,
    signin,
    signout,
    register,
  };
}

/** Component for  */
export function Logout() {
  let history = useHistory();
  let auth = useAuth();

  return (
      <button onClick={() => {auth.signout(() => history.push("/"));}}>
        Sign out
      </button>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export function PrivateRoute({ component, ...rest }) {
  let auth = useAuth();
  let location = useLocation();

  if (auth.user) {
    return <Route {...rest} component={component} />
  } else {
    return <Redirect to={{pathname: "/login", state: { from: location }}}/>
  }
}
