import React, { useState, useLayoutEffect, useEffect } from 'react';

const quotes = [
    'Podróże to jedyna rzecz na którą wydajemy pieniądze, a stajemy się bogatsi.” – Anonim',
    'Podróżowanie uczy skromności. Widzisz, jak niewiele miejsca zajmujesz w świecie.” –  Gustave Flaubert',
    'Życie daje każdemu tyle, ile sam ma odwagę sobie wziąć, a ja nie zamierzam zrezygnować z niczego, co mi się należy.” – Jacek Pałkiewicz',
    'Nie czekaj. Pora nigdy nie będzie idealna.” – Napoleon Hill',
    'Uwielbiam poczucie bycia anonimowym w mieście, w którym nigdy wcześniej nie byłem.” – Bill Bryson',
    'Jeśli myślisz, że przygody bywają niebezpieczne, spróbuj rutyny. Ona jest śmiercionośna.”  – Paulo Coelho',
    'Jeśli naszym przeznaczeniem byłoby być w jednym miejscu, mielibyśmy korzenie zamiast stóp.” – Rachel Wolchin',
  ];

const styles = {
    position: 'absolute',
    padding: 10,
    top: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 18,
}

const InspiringQuote = (props) => {

    const [quote, setQuote] = useState('Wczytywanie cytatu...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //... wczytywanie
        setQuote(quote)
        setLoading(false);
    },[]);

    useLayoutEffect(() => {
        const result =  Math.floor(Math.random() * quotes.length);
        setQuote(quotes[result])
    }, [loading])

    return (
        <p style={styles}>{quote}</p>
    )
};

export default InspiringQuote;