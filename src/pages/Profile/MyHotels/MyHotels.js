import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import axios from '../../../axios';
import { objectsToArrayWithId } from '../../../helpers/objects';
import useAuth from '../../../hooks/useAuth';
import LoadingIcon from '../../../components/UI/LoadingIcon/LoadingIcon';

const MyHotels = () => {
const { url } = useRouteMatch();
const [auth] = useAuth();
const [hotels, setHotels] = useState([]);
const [loading, setloading] = useState(false);

const fetchHotels = async () => {
    setloading(true);
    try {
        const res = await axios.get('/hotels.json');
        const newHotel = objectsToArrayWithId(res.data).filter(hotel => hotel.user_id === auth.userId);
        setHotels(newHotel);
    } catch (ex) {
        console.log(ex.response);
    }
    setloading(false);
}

const deleteHandler = async (id) => {

    setloading(true);
    try {
        await axios.delete(`/hotels/${id}.json`);
        setHotels(hotels.filter(hotel => hotel.id !== id))
        //fetchHotels();
    } catch (ex) {
        console.log(ex.response);
    }
    setloading(false);
}

useEffect(() => {
    fetchHotels();
}, [])


    return(
        !loading ? (
        <div>
            {hotels.length !== 0 ? (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nazwa</th>
                            <th>Status</th>
                            <th>Opcje</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hotels.map(hotel => (
                        <tr key={hotel.name}>
                            <td>{hotel.name}</td>
                            <td>
                                {hotel.status == 1
                                ? <span className='badge badge-success text-light'>Aktywny</span>
                                : <span className='badge badge-secondary text-light'>Ukryty</span>}
                            </td>
                            <td>
                                <Link 
                                    to={`/profil/hotele/edytuj/${hotel.id}`} 
                                    className='btn btn-sm btn-warning'>
                                        Edytuj
                                </Link>
                                <button 
                                    className='btn btn-sm btn-danger ml-2'
                                    onClick={()=> deleteHandler(hotel.id)}
                                >
                                    Usuń
                                </button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='alert alert-danger'>Nie masz jeszcze żadnego hotelu</div>
            )}
             <hr />
            <Link to={`${url}/dodaj`} className='btn btn-primary'>Dodaj hotel!</Link>
        </div> ) : (
            <LoadingIcon />
        )
    );
};

export default MyHotels;