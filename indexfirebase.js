// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig =
{
    apiKey: "AIzaSyAYCwRPsW8Nn-hefH297yWaP6QvNpjl0k4",
    authDomain: "findme-6df38.firebaseapp.com",
    databaseURL: "https://findme-6df38-default-rtdb.firebaseio.com",
    projectId: "findme-6df38",
    storageBucket: "findme-6df38.firebasestorage.app",
    messagingSenderId: "340747000290",
    appId: "1:340747000290:web:0743d4ca2e876c370c01bb",
    measurementId: "G-HWLT171896"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = firebase.database();

if (app === null || app === undefined) {
    console.error("Firebase app is null or undefined.");
}

if (database === null || database === undefined) {
    console.error("Firebase Realtime Database is null or undefined.");
}


// Function to write data to Realtime Database
function writeData(path, data) {
    const dbRef = database.ref(path);
    dbRef.set(data).then(() => {
        console.log("Js-leaderboard: Data saved successfully!");
    }).catch((error) => {
        console.error("Js-leaderboard: Error saving data:", error);
    });
}

// Function to read data from Realtime Database
function readData(path, callback) {
    const dbRef = database.ref(path);
    dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        console.log("Js-leaderboard: Data read:");//, data);
        if (callback) callback(data);
    });
}

// Function to check if a path exists in Realtime Database
function checkPathExists(path, callback) {
    const dbRef = database.ref(path);
    dbRef.once('value').then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Js-leaderboard: Path exists.");
            callback(true);
        } else {
            console.log("Js-leaderboard: Path does not exist.");
            callback(false);
        }
    }).catch((error) => {
        console.error("Js-leaderboard: Error checking path existence:", error);
        callback(false);  // Return false in case of error as well
    });
}

// call by unity
function UploadLeaderboard(jsonData) 
{
    let jsonLeaderboard = JSON.parse(jsonData);
    console.log("Js-leaderboard: Json value " );//+ jsonLeaderboard);

    var database = firebase.database();
    var path = "leaderboards";
    writeData(path, jsonLeaderboard);
}

// call by unity
function GetLeaderboard() 
{
    console.log("Js-leaderboard: getting data");
    checkPathExists('/leaderboards', (exists) => 
    {
        if (exists) 
        {
            GetleaderboardData();
        } else {
            InitLeaderboard();
        }
    });
   
}

function GetleaderboardData()
{
    readData("/leaderboards", (data) => 
        {
            try {
                if (data != null){
                    let jsonData = JSON.stringify(data);
                    Window.UnityGameInstance.SendMessage('Leaderboard', 'JSFunction_GetLeaderboard', jsonData);
                }
                else {
                    console.error("Js-leaderboard: data is null");
                }
            }
            catch (err) {
                console.error("Js-leaderboard: Error: " + err);
            }
        });
}

function InitLeaderboard()
{
    Window.UnityGameInstance.SendMessage('Leaderboard','JSFunction_InitLeaderboard');
}


