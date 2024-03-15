import React, { useEffect, useState } from 'react';
import { fetchAuthSession } from 'aws-amplify/auth';
import { getCurrentUser } from 'aws-amplify/auth';
import { signOut } from 'aws-amplify/auth';
import { Outlet, useNavigate } from "react-router-dom";
const Home = () => {

  const navigate = useNavigate();
async function handleSignOut() {
  try {
    await signOut();
    setIsLoggedIn(false)
    setuserName("")
    navigate('/')
  } catch (error) {
    console.log('error signing out: ', error);
  }
}
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName,setuserName ]=useState("")

  useEffect(() => {
    
      currentAuthenticatedUser();
      if(userName!==""){
        currentSession()
      }
    
  }, );
  

async function currentAuthenticatedUser() {
  try {
    const { username} = await getCurrentUser();
    setuserName(username)
  } catch (err) {
    console.log(err);
  }
}
const currentSession = async () => {
  try {
    const session = await fetchAuthSession();
    if (session && session.tokens) {
      const { accessToken, idToken } = session.tokens;
      if (accessToken && idToken) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  } catch (err) {
    console.log(err);
    setIsLoggedIn(false);
  }
};

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">Student Management</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <a className="nav-link" href="/">Home</a>
            </li>
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/">{userName}</a>
                </li>
                <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={handleSignOut}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">Authenticate Yourself</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
    <Outlet/>
    </>
  );
};

export default Home;
