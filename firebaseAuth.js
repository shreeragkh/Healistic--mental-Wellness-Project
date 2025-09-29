// firebaseAuth.js (module)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } 
    from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
  import { getFirestore, setDoc, doc } 
    from "https://www.gstatic.com/firebasejs/12.3.0/firebase-firestore.js";
    import { FIREBASE_API_KEY } from './.env.js';

  // Firebase config
  const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: "healistic-mental-wellness.firebaseapp.com",
    projectId: "healistic-mental-wellness",
    storageBucket: "healistic-mental-wellness.appspot.com", // fixed
    messagingSenderId: "547938558716",
    appId: "1:547938558716:web:46ff30c20caf019637ad79"
  };

  // Init
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const sigUp=document.getElementById("signupBtn");
  sigUp.addEventListener("click", async (event) => {
    event.preventDefault(); 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmpassword = document.getElementById("confirmPassword").value;
    if(password!==confirmpassword){
        alert("Passwords do not match");
        return;
    }
    const fullName = document.getElementById("fullName").value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
      const userData = {
          email: email,
          fullName: fullName,
          createdAt: new Date()
      };
      await setDoc(doc(db, "users", uid), userData);
  // Redirect to index.html after successful signup
  window.location.href = "index.html";
    } catch (error) {
      const errorCode = error.code;
      if(errorCode === 'auth/email-already-in-use'){
          console.log ("Email already in use");
      }
      else {
          console.log('Unable to create account. Please try again later.');
      }
      console.error("Signup error:", error);
    }
  });
  const signIn=document.getElementById("signupBtn");
    signIn.addEventListener("click", async (event) => {
        event.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            // Redirect to index.html after successful login
            const user = userCredential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = "index.html";
        }).catch((error) => {
            // alert("Sign in failed: " + error.message);
            const errorCode = error.code;
            if(errorCode === 'auth/wrong-password'){
                alert("Incorrect password. Please try again.");
            }
            else if(errorCode === "auth/wrong-password") {
    console.log("Incorrect password. Please try again.");
}
else if (errorCode === "auth/user-not-found") {
    console.log("Account does not exist. Please sign up.");
}
            else{
                console.log("Account does not exist. Please sign up.");
            }
            console.error("Signin error:", error);
        });
    });


  // Example signup
//   document.getElementById("signupBtn").addEventListener("click", async () => {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       // save extra data in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         email: user.email,
//         createdAt: new Date()
//       });

//       alert("User signed up: " + user.email);
//     } catch (err) {
//       alert(err.message);
//     }
//   });
