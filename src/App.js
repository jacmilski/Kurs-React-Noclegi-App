import React, { useReducer, lazy, Suspense } from 'react';
import { /* HashRouter */ BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Searchbar from './components/UI/Searchbar/Searchbar';
import Footer from './components/Footer/Footer';
import Layout from './components/Layout/Layout';
import ThemeButton from './components/UI/ThemeButton/ThemeButton';
import ThemeContext from './context/themeContext';
import ReducerContext from './context/reducerContext';
import AuthContext from './context/authContext';
import InspiringQuote from './components/InspiringQuote/InspiringQuote';
import { reducer, initialState } from './reducer'
import Home from './pages/Home/Home';
import Hotel from './pages/Hotel/Hotel';
import Search from './pages/Search/Search';
import NotFound from './pages/404/404';
import Login from './pages/Auth/Login/Login';
import AuthenticatedRoute from './hoc/AuthenticatedRoute';
import ErrorBoundary from './hoc/ErrorBoundary';
import AddHotel from './pages/Profile/MyHotels/AddHotel/AddHotel';
import EditHotel from './pages/Profile/MyHotels/EditHotel/EditHotel';
import Register from './pages/Auth/Register/Register';

const Profile = lazy(() => import('./pages/Profile/Profile'));

//const lodash = require('lodash');


const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState); //drugi parametr to wartość domyślna state'a

    const header = (
      <Header>
        <InspiringQuote />
        <Searchbar />
        <ThemeButton />
      </Header>
    );
    const menu = (<Menu />);
    const content = (
      <Suspense fallback={<p>...Ładowanie</p>}>
        <Switch>
          <AuthenticatedRoute path='/profil/hotele/edytuj/:id' component={EditHotel} />
          <AuthenticatedRoute path='/profil/hotele/dodaj' component={AddHotel} />
          <AuthenticatedRoute 
            path='/profil' 
            /* isAuthenticated={state.isAuthenticated} */
            component={Profile}
          />
          <Route path='/wyszukaj/:term?' component={Search} />
          <Route path='/hotele/:id' component={Hotel} />
          {/* <Route path='/profil'>
            {state.isAuthenticated ? <Profile /> : <Redirect to='/Zaloguj' />}
          </Route> */}
          <Route path='/zaloguj' component={Login}/>
          <Route path='/rejestracja' component={Register}/>
          <Route exact path='/' component={Home} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    );
    const footer = (<Footer />);

    return (
      <Router /* basename="/v1" */>
        <AuthContext.Provider value={{
          user: state.user,
          login: (user) => dispatch({ type: 'login', user }),
          logout: () => dispatch({ type: 'logout' }),
        }}>
          <ThemeContext.Provider value={{
            theme: state.theme,
            changeTheme: () => dispatch({ type: 'set-theme' }),
          }}>
            <ReducerContext.Provider value={{
              state,
              dispatch,
            }}>
              <ErrorBoundary>
                <Layout
                  header={header}
                  menu={menu}
                  content={content}
                  footer={footer}
                />
              </ErrorBoundary>
            </ReducerContext.Provider>
          </ThemeContext.Provider>
        </AuthContext.Provider>
      </Router>
    );
}

export default App;

