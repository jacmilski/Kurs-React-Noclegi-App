import React, { useContext } from 'react';
import styles from './hotel.module.css';
//import hotelImg from '../../../assets/images/hotel.jpg';
import PropTypes from 'prop-types';
import ThemeContext from '../../../context/themeContext';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';
//import ReducerContext from '../../../context/reducerContext';
/* zdjęcia w formacie uri: React w przypadku zdjęcia poniżej 10tyś bajtów przesyła dane, 
  a powyżej tego limitu przesyła link do zdjęcia */


  const propTypes = {
    name: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    //missing: PropTypes.string,
  }

  //const defaultProps = {
  //  missing: 'to jest text domyślny',
  //}

function Hotel(props) {

  const { theme } = useContext(ThemeContext);
  const [auth] = useAuth();

  const openHotelHandler = (e) => {
    if (props.onOpen) {
      props.onOpen(props);
    }
  }

  return (
    <div className={`card ${styles.hotel}`}>
      <div className="card-body">
        <div className="row">

          <div className="col-4">
            <img src={`https://placeimg.com/220/18${Math.floor(Math.random() * 10)}/arch`}
                alt=""
                className="img-fluid img-thumbnail"
            />
          </div>

          <div className="col-8">
            <div className="row">
              <div className="col">
                <p className={styles.title}>{props.name}</p>
                <span className="badge badge-info">{props.city}</span>
              </div>
              <div className="col text-right">
                <h5>Ocena: {props.rating ?? 0}</h5>
                <Link 
                  to={`/hotele/${props.id}`} 
                  onClick={openHotelHandler}
                  className={`btn btn-${theme} btn-sm mt-2 float-right px-5`}
                >
                  Pokaż
                </Link>
              </div>
            </div>
          </div>

          <div className="col-12">
            <p className={styles.description}>
              {props.description} 
            </p>
            {auth
              ? <p className='mt-2 text-left'>Dostepność: {props.rooms} pokoje</p>
              : <p className='mt-2 text-left'>Dostępność: zaloguj</p>
            }
          </div>

        </div>
      </div>
    </div>
  );
}

Hotel.propTypes = propTypes;
//Hotel.defaultProps = defaultProps;

export default Hotel;