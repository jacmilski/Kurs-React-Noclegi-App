import { useState, useContext, useEffect, useRef } from 'react';
import ThemeContext from '../../../context/themeContext';
import { useHistory } from 'react-router-dom';


function Searchbar(props) {
  
  const [term, setTerm] = useState('');
  const { theme } = useContext(ThemeContext);
  const inputRef = useRef(null);
  const history = useHistory();
  
  const search = () => {
    history.push(`/wyszukaj/${term}`);
  }

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      search();
    }
  }

  const focusInput = () => {
    inputRef.current.focus();
  }

  useEffect(() => {
    focusInput();
  }, [])

  return (
    <div className="d-flex">
      <input 
        ref={inputRef}
        onKeyDown={onKeyDownHandler}
        value={term}
        onChange={e => setTerm(e.target.value)}
        className="form-control search"
        type="text" 
        placeholder="Szukaj..." />
      <button
        onClick={search}
        className={`btn btn-${theme} ml-1`}>
          Szukaj
      </button>  
    </div>
  );
}

export default Searchbar;
//export default withRouter(Searchbar);