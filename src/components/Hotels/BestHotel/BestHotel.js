import React, { useContext, useState, useEffect } from 'react';
import themeContext  from '../../../context/themeContext';
import moment from 'moment';
import { Link } from 'react-router-dom';


function BestHotels(props) {

    const { theme } = useContext(themeContext);

    const endTime = moment().add(30, 'minutes').add(23, 'seconds');
    const [time, setTime] = useState();
    const [min, setMin] = useState(null);
    
    
    const hotel = props.getHotel();

    useEffect(() => {
        let interval = setInterval(() => {
            const leftTime = -moment().diff(endTime) / 1000;
            const minutes = leftTime / 60;
            const seconds = leftTime % 60;
            setTime(`${(minutes).toFixed(0)} min. ${(seconds).toFixed(0)} sec.`);
            setMin(minutes);
            //if (minutes < 0) {
            //    setTime(0)
            //}
        }, 1000);

        return () => clearInterval(interval);

    }, []);
    

    //if (!hotel) return  null

    return (
        <div className={`card bg-${theme} text-white text-left`}>
            <h4 className="card-header">
                Najlepsza oferta!
            </h4>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{hotel.name}</h5> 
                    <p>Ocena: {hotel.rating}</p>
                </div>
                {min > 0 
                    ? <p>Do końca oferty pozostało: {time}</p> 
                    : <p>Oferta upłynęła: {time} temu</p>}
                <Link to={`/hotele/${hotel.id}`} 
                   className="btn btn-sm btn-light"
                >Pokaż</Link>
            </div>
        </div>
    );
};

export default BestHotels;