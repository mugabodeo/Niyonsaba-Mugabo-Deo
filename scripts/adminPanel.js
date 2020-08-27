let theDiv=document.querySelector("#myTopnav");
function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            theDiv.innerHTML +='<a href="" onclick=signOut() > Log out</a>';
        } 
        else{
            theDiv.innerHTML +='<a href="../templates/login.html"> sign in</a>'
        }
    });
}

const selectedElement=document.querySelector('#selectedElement')

selectedElement.addEventListener('change',function(e){
    if (e.target.value == 'landingSection'){
        window.location.href="../templates/sections/landingSection.html?docID=landingSection"
    }
    else if (e.target.value == 'projectsSection'){
        window.location.href="../templates/sections/projectsSection.html?docID=projectsSection"
    }
    else if (e.target.value == 'servicesSection'){
        window.location.href="../templates/sections/servicesSection.html?docID=servicesSection"
    }
    else if (e.target.value == 'educationSection'){
        window.location.href="../templates/sections/educationSection.html?docID=educationSection"
    }
    else if (e.target.value == 'contactMeSection'){
        window.location.href="../templates/sections/contactMeSection.html?docID=contactMeSection"
    }      
})
  





 



