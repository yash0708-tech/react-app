
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useNavigate } from 'react-router-dom';
import { signIn, signUp } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
Amplify.configure(amplifyconfig);


function Register({ signOut, user }) {
  const navigate = useNavigate();
  const services = {
    async handleSignIn(formData) {
      let { username, password } = formData;
      // custom username
      username = username.toLowerCase();
      try {
        await signIn({
          username,
          password,
        });
        
        navigate('/api'); 
      } catch (error) {
        console.log('Sign-in error:', error);
        
      }
    },
  };
  
  return (
    <>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',width:'100vw' }}>
      <Authenticator services={services} />
    </div>
    </>
  );
}

export default Register
