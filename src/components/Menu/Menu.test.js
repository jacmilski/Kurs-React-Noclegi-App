import { render, screen } from '@testing-library/react';
import Menu from './Menu';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthContext from '../../context/authContext';

describe('Menu components', () => {
    test('renders Zaloguj if user is null', () => {
        render(<Router><Menu /></Router>);
        const link = screen.getByText(/Zaloguj/i);
        expect(link).toBeInTheDocument();
    });
    test('renders Wyloguj if user exists', () => {
        render(<AuthContext.Provider value={{
            user: true,
            login: () => {},
            logout: () => {},
        }}>
                <Router>
                    <Menu />
                </Router>
            </AuthContext.Provider>);
        const link = screen.getByText(/wyloguj/i);
        expect(link).toBeInTheDocument();
    });
})
