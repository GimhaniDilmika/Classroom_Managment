import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import API from "../api/api";


const AuthContext = createContext();


export const useAuth = () => useContext(AuthContext);



export function AuthProvider({ children }) {


  const [currentUser, setCurrentUser] = useState(null);

  const [userProfile, setUserProfile] = useState(null);

  const [loading, setLoading] = useState(true);



  // LOGIN
  async function login(email, password) {

    try {

      const response = await API.post(
        "/auth/login",
        {
          email,
          password
        }
      );


      const {
        token,
        user
      } = response.data;



      // Save token
      localStorage.setItem(
        "token",
        token
      );


      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );



      setCurrentUser(user);

      setUserProfile(user);



      return response.data;



    } catch (error) {

      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      throw error;

    }

  }





  // REGISTER
  async function register(
    name,
    email,
    password,
    role = "student"
  ) {


    try {


      const response = await API.post(
        "/auth/register",
        {
          name,
          email,
          password,
          role: role.toLowerCase()
        }
      );


      return response.data;



    } catch(error) {


      console.log(
        "Register Error:",
        error.response?.data || error.message
      );


      throw error;

    }

  }





  // LOGOUT
  function logout() {


    localStorage.removeItem(
      "token"
    );


    localStorage.removeItem(
      "user"
    );


    setCurrentUser(null);

    setUserProfile(null);


  }





  // CHECK LOGIN WHEN PAGE LOADS
  useEffect(() => {


    const token =
      localStorage.getItem("token");


    const user =
      JSON.parse(
        localStorage.getItem("user")
      );



    if(token && user) {

      setCurrentUser(user);

      setUserProfile(user);

    }



    setLoading(false);



  }, []);







  const value = useMemo(() => ({



    currentUser,


    userProfile,



    userName:
      userProfile?.name || "",



    userEmail:
      userProfile?.email || "",



    userRole:
      userProfile?.role?.toLowerCase() || "",



    isAdmin:
      userProfile?.role?.toLowerCase() === "admin",



    isTeacher:
      userProfile?.role?.toLowerCase() === "teacher",



    isStudent:
      userProfile?.role?.toLowerCase() === "student",



    login,

    register,

    logout,

    loading



  }), [

    currentUser,

    userProfile,

    loading

  ]);






  return (

    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>

  );


}