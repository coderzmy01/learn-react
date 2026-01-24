import { createContext, useContext, useReducer } from "react";
import { FAKE_USER } from "../constant";
const AuthContext = createContext();
const useAuth = () => {
  if (!useContext(AuthContext)) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(AuthContext);
};
const initialState = {
  user: null,
  isLoggedIn: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case "logout":
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
  }
};
const AuthProvider = ({ children }) => {
  const [{ user, isLoggedIn }, dispatch] = useReducer(reducer, initialState);
  const login = ({ email, password }) => {
    if (email === "jack@example.com" && password === "qwerty") {
      dispatch({
        type: "login",
        payload: FAKE_USER,
      });
      return true;
    }
    return false;
  };
  const logout = () => {
    dispatch({
      type: "logout",
    });
  };
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
