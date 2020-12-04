import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { GoogleSignin } from '@react-native-community/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userID, setUserID] = useState('');
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(-1);
  const [score3, setScore3] = useState(-1);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    async function loadUserID() {
      try {
        const id = await AsyncStorage.getItem('@PlayLogic:userid');
        setUserID(id);
      } catch (e) {
        console.log(e);
      }
    }
    loadUserID();
  }, [userID]);

  const handleScoreUpdate = useCallback(async (stage, score) => {
    let stars1 = score1;
    let stars2 = score2;
    let stars3 = score3;
    if (stage === 0) {
      setScore1(Math.max(score, score1));
      stars1 = Math.max(score, score1);
      if (score > 0 && score2 === -1) {
        setScore2(0);
        stars2 = 0;
      }
    } else if (stage === 1) {
      setScore2(Math.max(score, score2));
      stars2 = Math.max(score, score2);
      if (score > 0 && score3 === -1) {
        setScore3(0);
        stars3 = 0;
      }
    } else {
      setScore3(Math.max(score, score3));
      stars3 = Math.max(score, score3);
    }

    if (userID.length) {
      await firestore().collection('users').doc(userID).set({
        score1: stars1,
        score2: stars2,
        score3: stars3,
      })
        .then();
    }

    await AsyncStorage.setItem(
      '@PlayLogic:scores', JSON.stringify([score1, score2, score3]),
    );
  }, [score1, score2, score3, userID]);

  useEffect(() => {
    async function loadScores() {
      try {
        const storage = await AsyncStorage.getItem(
          '@PlayLogic:scores',
        );

        if (storage) {
          const parsedStorage = JSON.parse(storage);

          setScore1(parsedStorage[0]);
          setScore2(parsedStorage[1]);
          setScore3(parsedStorage[2]);
        }
      } catch (e) {
        console.log(e);
      }
    }

    loadScores();
  }, []);

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
        handleScoreUpdate,
        initializing,
        setInitializing,
        login: async (email, password) => {
          try {
            const loggedUser = await auth().signInWithEmailAndPassword(email, password);

            setUserID(loggedUser.user.uid);
            await AsyncStorage.setItem(
              '@PlayLogic:userid', loggedUser.user.uid,
            );

            if (loggedUser.additionalUserInfo.isNewUser === true) {
              await firestore().collection('users').doc(loggedUser.user.uid).set({
                score1: 0,
                score2: -1,
                score3: -1,
              })
                .then();
            } else {
              const document = await firestore().collection('users').doc(loggedUser.user.uid).get();
              setScore1(document.data().score1);
              setScore2(document.data().score2);
              setScore3(document.data().score3);
            }
          } catch (e) {
            // Error
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

            setUserID(loggedUser.user.uid);
            await AsyncStorage.setItem(
              '@PlayLogic:userid', loggedUser.user.uid,
            );

            if (loggedUser.additionalUserInfo.isNewUser === true) {
              console.log(' é um  usuário');
              await firestore().collection('users').doc(loggedUser.user.uid).set({
                score1: 0,
                score2: -1,
                score3: -1,
              })
                .then();
            } else {
              const document = await firestore().collection('users').doc(loggedUser.user.uid).get();
              setScore1(document.data().score1);
              setScore2(document.data().score2);
              setScore3(document.data().score3);
            }
          } catch (e) {
            // Error
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

            setUserID(loggedUser.user.uid);
            await AsyncStorage.setItem(
              '@PlayLogic:userid', loggedUser.user.uid,
            );

            if (loggedUser.additionalUserInfo.isNewUser === true) {
              await firestore().collection('users').doc(loggedUser.user.uid).set({
                score1: 0,
                score2: -1,
                score3: -1,
              })
                .then();
            } else {
              const document = await firestore().collection('users').doc(loggedUser.user.uid).get();

              setScore1(document.data().score1);
              setScore2(document.data().score2);
              setScore3(document.data().score3);
            }
          } catch (e) {
            // Error
          }
        },
        register: async (email, password) => {
          try {
            const loggedUser = await auth().createUserWithEmailAndPassword(email, password);

            setUserID(loggedUser.user.uid);
            await AsyncStorage.setItem(
              '@PlayLogic:userid', loggedUser.user.uid,
            );

            await firestore().collection('users').doc(loggedUser.user.uid).set({
              score1: 0,
              score2: -1,
              score3: -1,
            })
              .then();
          } catch (e) {
            // Error
          }
        },
        logout: async () => {
          try {
            await AsyncStorage.removeItem(
              '@PlayLogic:scores',
            );

            await AsyncStorage.removeItem('@PlayLogic:alreadyLaunched');

            await auth().signOut();
          } catch (e) {
            // Error
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
