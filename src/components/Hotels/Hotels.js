import React, { useMemo } from 'react';
import Hotel from './Hotel/Hotel';
import styles from './hotels.module.css';
import PropTypes from 'prop-types';

const propTypes = {
  hotels: PropTypes.array,
}
const slowFunction = (count) => {
  for (let i = 0; i < 15000000; i++);
  return count
}

function Hotels(props) {
 
  const count = useMemo(() => {
    return slowFunction(props.hotels.length)
  },[props.hotels.length]);

  return (
    <div className={styles.container}>
      {/* <img src={process.env.PUBLIC_URL + '/logo192.png'}/> */}
      <h2 className={styles.title}>Oferty ({ count }):</h2>
      {
        props.hotels.map(hotel => (
          <Hotel 
            {...hotel}
            onOpen={props.onOpen} 
            key={hotel.id}
          />
        ))
      }
    </div>
  );
}

Hotels.propTypes = propTypes;

export default Hotels; 
