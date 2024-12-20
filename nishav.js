let endpoint = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";

let btc = document.querySelector("#BTC");
let eth = document.querySelector("#ETH");
let doge = document.querySelector("#DG");
let ecxhange = document.querySelector("#currexe");

let coindata = async() => {
    try {
    let response = await fetch(endpoint);
    console.log(response)
    let data = await response.json();
    console.log(data);
    if (endpoint.includes("inr")) {
        btc.innerText = `₹ ${data.bitcoin.inr}`;
        eth.innerText = `₹ ${data.ethereum.inr}`;
        doge.innerText = `₹ ${data.dogecoin.inr}`;
    } else {
        btc.innerText = `$ ${data.bitcoin.usd}`;
        eth.innerText = `$ ${data.ethereum.usd}`;
        doge.innerText = `$ ${data.dogecoin.usd}`;
    }
    } catch (error) {
        console.log(`error is ${error}`);
        btc.innerText = `API Limit Cross `;
        eth.innerText = `API Limit Cross`;
        doge.innerText =`API Limit Cross`;
    }
}


coindata();


ecxhange.addEventListener("click", async()=> {
    if(ecxhange.classList.contains("fa-indian-rupee-sign")){
        ecxhange.classList.remove("fa-indian-rupee-sign");
        endpoint = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=inr"
        ecxhange.classList.add("fa-dollar-sign");
        coindata();
        
    } else {
        endpoint = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd"
        ecxhange.classList.remove("fa-dollar-sign");
        ecxhange.classList.add("fa-indian-rupee-sign");
        coindata();
    }
})

//---------------------------------form submmision-----------------------------------------

let subbtn = document.querySelector("#newsbtn");
let serviceid = "service_4wqu0i8";
let templateid = "template_3vo9y9l";
let emailletter = document.querySelector("#emailletter");

function sendemail(){

    if(emailletter.value == "" ){
        subbtn.innerText = "Can't Be Empty";

        setTimeout(() => {
            subbtn.style.color = "#f0e7f8";
            subbtn.innerText = "Submit";
        },2000);
        return
    }

    if(!emailletter.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        subbtn.innerText = "Enter Full Email";

        setTimeout(() => {
            subbtn.style.color = "#f0e7f8";
            subbtn.innerText = "Submit";
        },2000);
        return ;
    }

    let parms ={
        user: emailletter.value,
        message: "Newsletter Subscription Request", 
    }

    emailjs.send(serviceid,templateid,parms).then(() => {
        subbtn.innerText = "Submitted ✔";
        subbtn.style.color = "#10042c";
        emailletter.value = "";
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
        subbtn.innerText = "Failed ❌";
        subbtn.style.color = "red";
        emailletter.value = "";
      });
}

//-------------------------------login form submmision----------------------------------

let logini = document.querySelector("#loginicon");
let inputbox = document.querySelector(".loginbox");
let loginform = document.querySelector(".loginform");
let signupform = document.querySelector(".signupform");
let createp = document.querySelector("#create");
let backp = document.querySelector("#back");

let logclose = true;

logini.addEventListener("click", () => {

    if(logclose){
        inputbox.style.display = "block";
        logclose = false;
    } else {
        inputbox.style.display = "none";
        logclose = true;
    }
})

createp.addEventListener("click" , () => {
    loginform.style.display = "none";
    signupform.style.display = "block";
})

backp.addEventListener("click" , () => {
    signupform.style.display = "none";
    loginform.style.display = "block";
})

//-------------login validation with mailjs---------------------------------------------------------

let loginemail = document.querySelector("#loginmail");
let loginpass = document.querySelector("#loginpass");
let loginbtn = document.querySelector("#login-btn");
let login_templateid = "template_nfeheoh";

let valid = {
    email : false,
    pass : false,
}

loginemail.addEventListener("keyup" , () => {
    let logval = loginemail.value;

    if(logval.length === 0){
        loginbtn.innerHTML = "input can't be empty";
        valid.email = false;
        loginemail.style.color = "white";
        return false;
    }
    if(!logval.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        loginbtn.innerHTML = "Enter Full mail";
        console.log("error");
        loginemail.style.color = "white";
        valid.email = false;
        return false;
    }

    loginbtn.innerHTML = "Now Fill Password";
    loginemail.style.color = "seagreen";
    valid.email = true;
    return true
})

loginpass.addEventListener("keyup" , () => {
    let passval = loginpass.value;

    if(passval.length <= 7){
        loginbtn.innerHTML = "Password must be 8 digit";
        loginpass.style.color = "white";
        valid.pass = false
        return false;
    }

    if(passval.length > 8){
        loginbtn.innerHTML = "Password not be > 8";
        loginpass.style.color = "white";
        valid.pass = false
        return false;
    }
    if(passval.length === 8){
        loginbtn.innerHTML = "Now Login";
        loginpass.style.color = "seagreen";
        valid.pass = true;
        return true;
    }

    loginbtn.innerHTML = "Now Submit";
    loginpass.style.color = "seagreen";
    valid.pass = true;
    return true;
})

loginbtn.addEventListener("click", (e) => {
    e.preventDefault(); 
  
    const allValid = Object.values(valid).every((status) => status);
    if (allValid) {
        
        let logparams = {
            loguser:loginemail.value,
            logpass:loginpass.value,
            message:"Details From Login Page",
        }

        emailjs.send(serviceid,login_templateid,logparams).then(() => {
            loginbtn.innerText = "Logged in ✔";
            loginbtn.style.color = "#10042c";
            loginemail.value = "";
            loginpass.value = "";
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
            loginbtn.innerText = "Failed ❌";
            loginbtn.style.color = "red";
            loginemail.value = "";
            loginpass.value = "";
          });

    } else {
        loginbtn.innerText = " Not Submitted";
    }
  });


//------------------------------signupmail------------------------------------------------

let signiname = document.querySelector("#signinname")
let signinemail = document.querySelector("#signinmail");
let signinpass = document.querySelector("#signinpass");
let signinbtn = document.querySelector("#signinbtn");
let signin_templateid = "template_nfeheoh";

let signinvalid = {
    name:false,
    email : false,
    pass : false,
}

signiname.addEventListener("keyup" , () => {
    nameval = signiname.value;

    if(nameval.length === 0){
        signinbtn.innerHTML = "Input Can't Be Empty";
        signinvalid.name = false;
        return false;
    }

    if(!nameval.match(/^[A-Za-z]*\s{1}[A-Za-z]+$/)){
        signinbtn.innerHTML = "Enter Full Name";
        signinvalid.name = false;
        signiname.style.color = "white";
        return false;
    }

    signinbtn.innerHTML = "Now Fill Email";
    signiname.style.color = "seagreen";
    signinvalid.name = true;
    return true;

})

signinemail.addEventListener("keyup" , () => {
    emailval = signinemail.value;

    if(emailval.length === 0){
        signinbtn.innerHTML = "Input Can't Be Empty";
        signinvalid.name = false;
        return false;
    }

    if(!emailval.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)){
        signinbtn.innerHTML = "Enter Full mail";
        console.log("error");
        signinemail.style.color = "white";
        signinvalid.email = false;
        return false;
    }

    signinbtn.innerHTML = "Now Fill Password";
    signinemail.style.color = "seagreen";
    signinvalid.email = true;
    return true;
})

signinpass.addEventListener("keyup" , () => {
    pass_val = signinpass.value;

    if(pass_val.length === 0){
        signinbtn.innerHTML = "Input Can't Be Empty";
        signinpass.style.color = "white";
        signinvalid.name = false;
        return false;
    }

    if(pass_val.length < 8){
        signinbtn.innerHTML = "Paasword can't be < 8";
        signinpass.style.color = "white";
        signinvalid.pass = false;
        return false;
    } else if (pass_val.length > 8){
        signinbtn.innerHTML = "Paasword can't be > 8";
        signinpass.style.color = "white";
        signinvalid.pass = false;
        return false;
    } else {
        signinbtn.innerHTML = "Now Sign Up";
        signinpass.style.color = "seagreen";
        signinvalid.pass = true;
        return true;
    }
})


signinbtn.addEventListener("click", (e) => {
    e.preventDefault(); 
  
    const allValid = Object.values(signinvalid).every((status) => status);
    if (allValid) {
        
        let signparams = {
            name:signiname.value,
            email:signinemail.value,
            pass:signinpass.value,
            message:"Details From Signup Page",
        }

        emailjs.send(serviceid,signin_templateid,signparams).then(() => {
            signinbtn.innerText = "Sign up ✔";
            signinbtn.style.color = "#10042c";
            signiname.value = "";
            signinemail.value = "";
            signinpass.value = "";
          })
          .catch((error) => {
            console.log(`Error: ${error}`);
            signinbtn.innerText = "Failed ❌";
            signinbtn.style.color = "red";
            signiname.value = "";
            signinemail.value = "";
            signinpass.value = "";
          });

    } else {
        signinbtn.innerText = " Not Submitted";
    }
  });

//---------------mobile humburger bars-----------------------------------------------

let mobilenav = document.querySelector(".mobilebar");


  let baropen = false;
  document.getElementById("bars").addEventListener("click" , () => {
    if(!baropen){
        mobilenav.style.display = "block";
        baropen = true;
    } else {
        mobilenav.style.display = "none";
        baropen = false;
    }
  })

  document.querySelector("#cut").addEventListener("click" , () => {
    if(baropen){
        mobilenav.style.display = "none";
        baropen = false;
    } else {
        mobilenav.style.display = "block";
        baropen = true;
    }
  })

