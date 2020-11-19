import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [score3, setScore3] = useState(0);
  const { initializing, setInitializing } = useState(true);

  const onAuthStateChanged = useCallback((u) => {
    setUser(u);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [onAuthStateChanged]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        score1,
        score2,
        score3,
        initializing,
        setInitializing,
        login: async (email, password) => {
          try {
            const loggedUser = await auth().signInWithEmailAndPassword(email, password);

            if (loggedUser.additionalUserInfo.isNewUser === false) {
              await firestore().collection('users').doc(loggedUser.user.uid).set({
                score1: 0,
                score2: 0,
                score3: 0,
              })
                .then();
            } else {
              const document = await firestore().collection('users').doc(loggedUser.user.uid).get();

              setScore1(document.data.score1);
              setScore2(document.data.score2);
              setScore3(document.data.score3);
            }
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
            const loggedUser = await auth().signInWithCredential(googleCredential);

            if (loggedUser.additionalUserInfo.isNewUser === false) {
              await firestore().collection('users').doc(loggedUser.user.uid).set({
                score1: 0,
                score2: 0,
                score3: 0,
              })
                .then();
            } else {
              const document = await firestore().collection('users').doc(loggedUser.user.uid).get();

              setScore1(document.data.score1);
              setScore2(document.data.score2);
              setScore3(document.data.score3);
            }
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
            const loggedUser = auth().signInWithCredential(facebookCredential);

            if (loggedUser.additionalUserInfo.isNewUser === false) {
              await firestore().collection('users').doc(loggedUser.user.uid).set({
                score1: 0,
                score2: 0,
                score3: 0,
              })
                .then();
            } else {
              const document = await firestore().collection('users').doc(loggedUser.user.uid).get();

              setScore1(document.data.score1);
              setScore2(document.data.score2);
              setScore3(document.data.score3);
            }
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            const loggedUser = await auth().createUserWithEmailAndPassword(email, password);

            await firestore().collection('users').doc(loggedUser.user.uid).set({
              score1: 0,
              score2: 0,
              score3: 0,
            })
              .then();
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
