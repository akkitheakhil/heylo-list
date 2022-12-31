// Infrastructure
import { ANDROID_CLIENT_ID, EXPO_CLIENT_ID } from '@env';
import { isDataNotEmpty } from '@shared/util/CommonUtils';
import * as Google from 'expo-auth-session/providers/google';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import { Auth, AuthError, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, OAuthCredential, sendEmailVerification, signInWithCredential, signInWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { sha256 } from 'js-sha256';
import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { AuthenticatedUserContext } from '../context/AuthContext';
import { FirebaseAuth } from './FirebaseConfig';


const isRunningInExpoGo = Constants.appOwnership === 'expo'

WebBrowser.maybeCompleteAuthSession();

export const useSignInWithGoogle = () => {

    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<AuthError | null>(null);


    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            androidClientId: ANDROID_CLIENT_ID,
            expoClientId: EXPO_CLIENT_ID,
            clientId: EXPO_CLIENT_ID,
        },
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            logUser(FirebaseAuth, credential);
        }
    }, [response]);

    async function logUser(auth: Auth, credential: OAuthCredential) {
        try {
            const result = await signInWithCredential(auth, credential);
            const user = result.user;
            setUser(user);
        } catch (err: any) {
            setError(err);
        }
    }

    const callSignInWithGoogle = () => {
        promptAsync({ useProxy: isRunningInExpoGo, showInRecents: true });
    }

    return { user, error, callSignInWithGoogle };

}

export const useSignInWithEmailAndPassword = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    useEffect(() => {
        if (isDataNotEmpty(email) && isDataNotEmpty(password)) {
            setLoading(true);
            signInWithEmailAndPassword(FirebaseAuth, email, password).then((result) => {
                const user = result.user;
                setUser(user);
                sendEmailVerification(user);
                setLoading(false);
            }).catch((err) => {
                setError(err);
                setLoading(false);
            });
        }
    }, [email, password]);


    const callSignWithEmailPassword = (email: string, password: string) => {
        setEmail(email);
        setPassword(sha256(password));
    }

    return { user, loading, error, callSignWithEmailPassword };
}

export const useCreateUserWithEmailAndPassword = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<AuthError | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [displayName, setDisplayName] = useState<string>('');

    useEffect(() => {
        if (isDataNotEmpty(email) && isDataNotEmpty(password)) {
            setLoading(true);
            createUserWithEmailAndPassword(FirebaseAuth, email, password).then((result) => {
                const user = result.user;
                updateProfile(user, {
                    displayName
                }).then(() => {
                    setUser(user);
                }).catch((err) => {
                    setError(err);
                });

                setLoading(false);
            }).catch((err) => {
                setLoading(false);
                setError(err);
            });
        }
    }, [email, password]);


    const callCreateUserWithEmailPassword = (email: string, password: string, displayName: string) => {
        setEmail(email);
        setPassword(sha256(password));
        setDisplayName(displayName)
    }

    return { user, loading, error, callCreateUserWithEmailPassword };
}

export const useSignOutUser = () => {
    const [error, setError] = useState<unknown>();
    const [canSignOut, setCanSignOut] = useState<boolean>(false);
    const { setFirstTimeUser, setMfaSkip } = useContext(AuthenticatedUserContext)

    useEffect(() => {
        if (canSignOut) {
            signOutUser();
        }

    }, [canSignOut])

    const callSignOut = () => {
        setCanSignOut(true)
    }

    async function signOutUser() {
        await FirebaseAuth.signOut();
        setFirstTimeUser(true);
        setMfaSkip(false);
    }

    return { error, callSignOut };
}


export const DEFAULT_AUTH_ERROR = `Sorry, some error occurred. Please try again later`;
export const AUTH_ERRORS: { [key in string]: string } = {
    'auth/email-already-exists': `Sorry, that email address is already in use. Please try a different email address or login if you already have an account with us.`,
    'auth/email-already-in-use': `Sorry, that email address is already in use. Please try a different email address or login if you already have an account with us.`,
    'auth/claims-too-large': DEFAULT_AUTH_ERROR,
    'auth/id-token-expired': 'Sorry, your current session is expired. Please login again to continue',
    'auth/internal-error': DEFAULT_AUTH_ERROR
}

export const useResendEmail = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);

    const callEmailVerification = () => {
        if (user && !user.emailVerified) {
            sendEmailVerification(user).then(() => {
                Alert.alert(
                    "Email send",
                    "A new email has been send to verify your email address.",
                    [
                        { text: "OK", style: "default" }
                    ]
                );

            });
        }
    }

    const checkCanUserContinue = () => {
        if (!FirebaseAuth.currentUser) {
            return;
        }
        FirebaseAuth.currentUser?.reload().then(() => {
            const _user = FirebaseAuth.currentUser;
            FirebaseAuth.updateCurrentUser(_user);
        });

    }

    return { callEmailVerification, checkCanUserContinue };
}

export const useMFA = () => {
    const { setMfaSkip } = useContext(AuthenticatedUserContext);
    const [user, setUser] = useState(FirebaseAuth.currentUser);
    const [hasMfaAuth, setHasMfaAuth] = useState(false);

    useEffect(() => {
        if (!user?.email) {
            return;
        }
        const mfa = fetchSignInMethodsForEmail(FirebaseAuth, user.email).then((methods) => {
            setHasMfaAuth(methods.length !== 1);
        })

    }, [user])

    const skipMFA = () => {
        setMfaSkip(true)
    }


    return { hasMfaAuth, skipMFA }
}
