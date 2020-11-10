import React, { createContext, useContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { initializing, setInitializing } = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        initializing,
        setInitializing,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        googleLogin: async () => {
          try {
            // Get the user ID Token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log(e);
          }
        },
        facebookLogin: async () => {
          try {
            // Attempt login with permissions
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

            if (result.isCancelled) {
              throw new Error('User cancelled the login process');
            }

            // Once signed in, get the users AccesToken
            const data = await AccessToken.getCurrentAccessToken();

            if (!data) {
              throw new Error('Something went wrong obtaining access token');
            }

            // Create a Firebase credential with the AccessToken
            const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

            // Sign-in the user with the credential
            return auth().signInWithCredential(facebookCredential);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { useAuth, AuthProvider };
