// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyA0zIiLBXHcUVbbQD5ZYUYd-p1R-kDOhM0",
    authDomain: "registration-form-638f1.firebaseapp.com",
    databaseURL: "https://registration-form-638f1.firebaseio.com",
    projectId: "registration-form-638f1",
    storageBucket: "registration-form-638f1.appspot.com",
    messagingSenderId: "249811829978",
    appId: "1:249811829978:web:d7342b0a70860d832c11e3",
    measurementId: "G-FWWKCFTQVG"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  firebase.auth.Auth.Persistence.LOCAL;


  $("#btn-login").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();

      if(email != ""  &&  password != "")
      {
          var result = firebase.auth().signInWithEmailAndPassword(email, password);

          result.catch(function(error)
          {
              var errorCode = error.code;
              var errorMessage = error.message;

              console.log(errorCode);
              console.log(errorMessage);
              window.alert("Message : " + errorMessage);
              
              
          });
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });




  $("#btn-signup").click(function()
  {
      var email = $("#email").val();
      var password = $("#password").val();
      var cPassword = $("#confirmpassword").val();

      if(email != ""  &&  password != ""  &&  cPassword != "")
      {
          if(password == cPassword)
          {
            var result = firebase.auth().createUserWithEmailAndPassword(email, password);

            result.catch(function(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
  
                console.log(errorCode);
                console.log(errorMessage);

                window.alert("Message : " + errorMessage);
            });
          }
          else
          {
            window.alert("Password do not match with the Confirm Password");
          }
      }
      else
      {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });



  $("#btn-resetPassword").click(function()
  {
     var auth = firebase.auth();
     var email = $("#email").val();

     
     if(email != "")
     {
         auth.sendPasswordResetEmail(email).then(function()
         {
            window.alert("Email has been sent to you, Please check and verify.");
         })
         .catch(function(error)
         {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorCode);
            console.log(errorMessage);

            window.alert("Message : " + errorMessage);
         });
     }
     else
     {
        window.alert("Please write your email first.");
     }
  });



  $("#btn-logout").click(function()
  {
      firebase.auth().signOut();
  });




  $("#btn-update").click(function()
  {
    var fName = $("#firstName").val();
    var lName = $("#lastName").val();
    

    var rootRef = firebase.database().ref().child("Users");
    var userID = firebase.auth().currentUser.uid;
    var usersRef = rootRef.child(userID);

    if(fName!="" && lName!="" )
    {
        var userData =
        {
            "firstName": fName,
            "lastName": lName,
            
        };

        usersRef.set(userData, function(error)
        {
            if(error)
            {
                var errorCode = error.code;
                var errorMessage = error.message;
    
                console.log(errorCode);
                console.log(errorMessage);
    
                window.alert("Message : " + errorMessage); 
            }
            else
            {
                window.location.href = "home.html"
            }
        });
    }
    else
    {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
  });