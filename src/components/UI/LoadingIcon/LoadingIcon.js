import React, { useContext } from 'react';
import ThemeContext from '../../../context/themeContext';

function LoadingIcon() {

    const { theme } = useContext(ThemeContext);

    return (
        <div className="d-flex justify-content-center align-items-center py-5">
            <div className={`spinner-border text-${theme}`} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadingIcon;