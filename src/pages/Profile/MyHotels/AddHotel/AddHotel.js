import React from 'react';
import axios from '../../../../axios';
import { useHistory } from 'react-router-dom';
import HotelForm from '../HotelForm';
import useAuth from '../../../../hooks/useAuth';

const AddHotel = props => {

  const history = useHistory();
  const [auth] = useAuth();

  const submit =  async form => {
    await axios.post(`/hotels.json?auth=${auth.token}`, form);
  history.push('/profil/hotele');
  }

  return (
    <div className="card">
      <div className="card-header">Dodaj hotel</div>
      <div className="card-body">

        <p className="text-muted">Uzupełnij dane hotelu</p>
        <HotelForm 
          buttonText='Dodaj Hotel'
          onSubmit={(form)=> submit(form)}
        />

      </div>
    </div>
  );
}

export default AddHotel;