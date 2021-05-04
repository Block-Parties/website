import firebase from "firebase/app"
import "firebase/auth"

export module Auth {
    let initialized = false
    let user: firebase.User

    export function init() {
        firebase.initializeApp({
            apiKey: "AIzaSyC0bmtQdbPeEpvDvmRuiSnOKmCxkiynuUM",
            authDomain: "blockparties.firebaseapp.com",
            projectId: "blockparties",
            storageBucket: "blockparties.appspot.com",
            messagingSenderId: "503886506514",
            appId: "1:503886506514:web:42940ca3502da52ca8c6cb",
            measurementId: "G-ZNVX3S1Y5M",
        })

        firebase.auth().onAuthStateChanged((u) => {
            user = u
            console.log(user)
        })

        initialized = true
    }

    export async function signIn() {
        if (!initialized) init()

        const provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope("email")

        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result)

        // TODO: ERROR HANDLING

        user = result.user
    }

    export async function getToken(): Promise<string> {
        console.log(user)
        if (user == null) await signIn()
        if (!initialized) return null

        return user.getIdToken()
    }

    export function getId(): string | undefined {
        return user.uid
    }
}

export default Auth
