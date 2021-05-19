import React from 'react';
import { Route, Switch, NavLink, useRouteMatch } from 'react-router-dom';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import MyHotels from './MyHotels/MyHotels';
import NotFound from '../404/404';

const Profile = () => {

    const { path, url} = useRouteMatch();
    //throw new Error('problem z internetem')

    return(
        <div className='card text-left'>
            <div className='card-header'>
                <h2>Mój profil</h2>
            </div>
            <div className='card-body'>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink exact to={`${url}`} className='nav-link'>Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={`${url}/hotele`} className='nav-link'>Hotele</NavLink>
                    </li>
                </ul>
                <div className='pt-4'>
                <Switch>
                  <Route exact path={`${path}`} component={ProfileDetails} />
                  <Route path={`${path}/hotele`} component={MyHotels} />
                  {/* <Route path='/profil'><p>Wybierz opcję</p></Route> */}
                  {/*.. lub tak jak poniżej */}
                  {/* <Route to='/profil' render={() => <p>Wybierz opcję </p>}/> */}
                  {/* ...lub bez tego domyślnie ustawić na /profil */}
                  <Route component={NotFound}/>
                </Switch>
                </div>
                <p>...</p>
            </div>
        </div>
    );
};

export default Profile;