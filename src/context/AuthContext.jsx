import { createContext, useContext } from 'react';
import { useReducer } from 'react';

const AuthContext = createContext();

const types = {
  login:  '[Auth] Login',
  logout: '[Auth] Logout',
}

const authReducer = ( state = {}, action ) => {

    switch ( action.type ) {

        case types.login:
            return {
                ...state,
                logged: true,
            };

        case types.logout:
            return {
                ...state, 
                logged: false,
            };
    
        default:
            return state;
    }
}

const init = ( ) => {

    const isLogged = JSON.parse( localStorage.getItem('logged') );

    return {
      logged: !!isLogged
    }
}

export const AuthProvider = ({ children }) => {

  const [ authState, dispatch ] = useReducer( authReducer, { logged: false }, init );

  const login = ( ) => {
    const action = { type: types.login  }
    localStorage.setItem('logged', JSON.stringify( true ) );
    dispatch(action);
  }

  const logout = () => {
    const action = { type: types.logout };
    localStorage.setItem('logged', JSON.stringify( false ) );
    dispatch(action);
  }

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      logout
    }}>
        { children }
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);