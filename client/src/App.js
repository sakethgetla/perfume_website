import React from "react";
import styled from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProvideAuth, PrivateRoute } from "./Auth";

// Pages
import Home from "./pages/Home";
//import Search from "./pages/search";
import Add from "./pages/AddPerfume";
import UserSettings from "./pages/UserSettings";
import UserChat from "./pages/Chat";
import recs from "./pages/Recommendations";
import User from "./pages/User";
import Profiles from "./pages/Profiles/components/Profiles";
import Perfume from "./pages/Perfume/components/PerfumeContainer";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

// Components
import NavigationBar from "./components/NavigationBar";
import Header from "./components/Header";
import Chat from "./pages/Chat";
import EditPerfume from "./pages/UserSettings/components/EditPerfumeForm";
import Bookmarks from "./pages/UserSettings/components/MyBookmarks";
import Likes from "./pages/UserSettings/components/MyLikes";
import Dislikes from "./pages/UserSettings/components/MyDislikes";

//styles
import { createTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc004e',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
  overrides: {
    MuiButtonGroup: {
      groupedTextPrimary: {
        borderColor: 'rgba(0, 0, 0, 0.12)',
      }
    },
    MuiButton: {
      text: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
    },
  }
});

const useStyles = makeStyles((theme) => ({

  root: {
    // display: 'flex',
    margin: theme.spacing(2),
  },
  page: {
    display: 'flex',
    marginLeft: 240,
    marginTop: 64,
  }

}))

//<<<<<<< HEAD
//      <Wrapper>
//        <MainContent>
//          <BrowserRouter>
//            <Header >
//            </Header >
//            <NavigationBar />
//            <Switch>
//              <Route exact path="/" component={Home} />
//              <Route exact path="/login" component={Login} />
//              <Route exact path="/register" component={Register} />
//              <PrivateRoute exact path="/chat" component={UserChat} />
//              <Route exact path="/perfume/:id" component={Perfume} />
//              <PrivateRoute exact path="/addPerfume" component={Add} />
//              <PrivateRoute exact path="/myrecommendations" component={recs} />
//              <PrivateRoute exact path="/userSettings" component={UserSettings} />
//              <PrivateRoute exact path="/editPerfume" component={EditPerfume} />
//              <PrivateRoute path="/user" component={Profiles} />
//              <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
//              {/*<PrivateRoute exact path="/chat" component={Chat} />*/}
//            </Switch>
//          </BrowserRouter>
//        </MainContent>
//      </Wrapper>
//=======

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <ProvideAuth>
      <div className={classes.root}>
        <BrowserRouter>
          <Header />
          <NavigationBar />
          <Box className={classes.page}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Route exact path="/user/:id" component={User} />
            <Route exact path="/perfume/:id" component={Perfume} />
            <PrivateRoute exact path="/likes" component={Likes} />
            <PrivateRoute exact path="/dislikes" component={Dislikes} />
            <PrivateRoute exact path="/addPerfume" component={Add} />
            <PrivateRoute exact path="/userSettings" component={UserSettings} />
            <PrivateRoute exact path="/editPerfume" component={EditPerfume} />
            <PrivateRoute exact path="/chat" component={UserChat} />
            <PrivateRoute exact path="/myrecommendations" component={recs} />
            <PrivateRoute path="/user" component={Profiles} />
            <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
            <PrivateRoute exact path="/chat" component={Chat} />
          </Switch>
          </Box>
        </BrowserRouter>
      </div>
    </ProvideAuth>
    </ThemeProvider>
  );
}


//=======
//          <MainContent>
//            <NavigationBar />
//            <Switch>
//              <Route exact path="/" component={Home} />
//              <Route exact path="/user/:id" component={User} />
//              <Route exact path="/perfume/:id" component={Perfume} />
//              <PrivateRoute exact path="/addPerfume" component={Add} />
//              <PrivateRoute
//                exact
//                path="/userSettings"
//                component={UserSettings}
//              />
//              <PrivateRoute exact path="/editPerfume" component={EditPerfume} />
//              <PrivateRoute exact path="/bookmarks" component={Bookmarks} />
//              <PrivateRoute exact path="/likes" component={Likes} />
//              <PrivateRoute exact path="/dislikes" component={Dislikes} />
//
//              {/* new routes from master */}
//              <Route exact path="/login" component={Login} />
//              <Route exact path="/register" component={Register} />
//              <PrivateRoute path="/user" component={Profiles} />
//            </Switch>
//          </MainContent>
//>>>>>>> merge_ts_with_backend_new
              //<Route exact path="/chat" component={UserChat} />
              //<PrivateRoute path="/chat/" component={UserChat} />
              //<Route exact path="/chat/:id" component={UserChat} />

//<<<<<<< HEAD
//              //<PrivateRoute exact path="/chat" component={Chat} />
//const Wrapper = styled.div`
//  display: flex;
//  align-items: center;
//  justify-content: center;
//  height: 100vh;
//`;
//=======
//
//
//// const Wrapper = styled.div`
////   // display: flex;
////   // align-items: center;
////   // justify-content: center;
////   // width: 100
////   // height: 100vh;
////   padding: 4em;
//// `;
//>>>>>>> styles

// const MainContent = styled.div`
//   // height: 100vh;
//   // width: 100%;
//   // position: absolute;
//   // display: flex;
//   // flex-direction: row;
//   // overflow-y: auto;
// `;

export default App;
