
// Sign in with email and password
function signInWithEmailPassword(parsedEmail, parsedPassword) 
{
    if (typeof parsedEmail !== "string" || typeof parsedPassword !== "string") {
        console.error("Js-signIN: Invalid input: Email and password must be strings.");
        return;
    }
    console.log("Parsed Email:", parsedEmail);
    console.log("Parsed Password:", parsedPassword);

    return firebase.auth().signInWithEmailAndPassword(auth, parsedEmail, parsedPassword)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed in:", user);
            Window.UnityGameInstance.SendMessage('Leaderboard', 'OnSignInSuccess', JSON.stringify({
                uid: user.uid,
                email: user.email
            }));
        })
        .catch((error) => {
            console.error("Sign-in error:", error);
            Window.UnityGameInstance.SendMessage('Leaderboard', 'OnSignInFailure', error.message);
        });
}


// Sign up with email and password
function signUpWithEmailPassword(email, password) {
    if (typeof email !== "string" || typeof password !== "string") {
        console.error("Js-signIN: Invalid input: Email and password must be strings.");
        return;
    }
    return firebase.auth().createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("User signed up:", user);
            Window.UnityGameInstance.SendMessage('Leaderboard', 'OnSignUpSuccess', JSON.stringify({
                uid: user.uid,
                email: user.email
            }));
        })
        .catch((error) => {
            console.error("Sign-up error:", error);
            Window.UnityGameInstance. SendMessage('Leaderboard', 'OnSignUpFailure', error.message);
        });
}
