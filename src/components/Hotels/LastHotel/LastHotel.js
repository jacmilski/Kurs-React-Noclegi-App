import React from 'react';
import { Link } from 'react-router-dom';


function LastHotel(props) {

    return(
        <div className={`card bg-light mb-2`}>
            <h5 className="card-header">
                Ostatnio oglądaleś ten hotel. Wciąż zainteresowany ?!
            </h5>
            <div className="card-body">
                <div className="d-flex justify-content-between">
                    <h5 className="card-title">{props.name}</h5> 
                    <h3 className="">{props.city}</h3>
                </div>
                <div 
                    style={{width: 117}}
                    className="d-flex justify-content-between ml-auto">
                    <Link to={`/hotele/${props.id}`} className="btn btn-sm btn-dark">Tak!</Link>
                    <button  
                        className="btn btn-sm btn-dark"
                        onClick={props.onRemove}
                    >
                        Nie!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LastHotel;