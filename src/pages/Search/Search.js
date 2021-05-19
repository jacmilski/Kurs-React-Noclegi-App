import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { objectsToArrayWithId } from '../../helpers/objects';
import Hotels from '../../components/Hotels/Hotels';

const Search = (props) => {
  const { term } = useParams();
  console.log(useParams())
  const [hotels, setHotels] = useState([]);

  const searchHandler = async () => {
    
    try {
      const res = await axios.get('/hotels.json');
      const newHotel = objectsToArrayWithId(res.data)
              .filter(hotel => hotel.name.includes(term));
      setHotels(newHotel);
    } catch (ex) {
      console.log(ex.response);
    }
    //debugger;
  };

  useEffect(() => {
    searchHandler();
  }, [term]);

    return(
      <div>
        <h2>Wyniki dla frazy: "{term}"</h2>
        <Hotels hotels={hotels} />
      </div>)
};

export default Search;