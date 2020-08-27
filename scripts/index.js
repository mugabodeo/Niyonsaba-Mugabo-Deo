let fName=document.querySelector('#fName');
let projectCard__wrapper=document.querySelector('#projectCard__wrapper');
let contactEmail=document.querySelector('#contactEmail');
let contactNumber=document.querySelector('#contactNumber')
let meImg=document.querySelector('#meImg');
let catchLineDescription=document.querySelector('#catchLineDescription');
let serviceCard__wrapper=document.querySelector('#serviceCard__wrapper');
let servicefeatures=document.querySelector('#servicefeatures');
let educationCardWrapper=document.querySelector('#educationCardWrapper')


//Get your location
function getLocation(showPosition) {
    getLandingSectionData();
    getContactMeSectionData();
    getProjectsSectionData();
    getServicesSectionData();
    getEducationSectionSectionData();
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position =>{
            let latitude=position.coords.latitude;
            let longitude=position.coords.longitude;
            console.log(` this is lat : ${latitude} and long is : ${longitude}`)
        })
    }
   
 }


function getLandingSectionData(){
    db.collection("landingPage").doc("landingSection").onSnapshot(function(doc){
        let landingSectionData=doc.data()
        let getfName=landingSectionData.fullName;
        let dividefName=getfName.split(" ");
        let catchLine=landingSectionData.catchLine;
        let dividecatchLine=catchLine.split(" "); 
        fName.innerHTML=`${dividefName[0]} <br> ${dividefName[1]} ${dividefName[2]}<br>` 
        meImg.innerHTML=`<img class="me" src="${landingSectionData.meImg}">`
        catchLineDescription.innerHTML=`<span class="fullStck">${dividecatchLine[0]} ${dividecatchLine[1]}</span><br>  ${dividecatchLine[2]}  <span class="dev">${dividecatchLine[3]} </span>`
    })
}

function getProjectsSectionData(){
    db.collection("landingPage").doc("projectsSection").collection('cards').onSnapshot(function(snapshot){
        getAllDoc=[]
        snapshot.forEach(function(doc){
            docData=doc.data()
            getAllDoc.push(docData)
        })
       getAllDoc.forEach(function(doc){
        projectCard__wrapper.innerHTML+=`
        <div class="projectCard">
            <div class="innerProjectCard" >
                <div class="frontInnerProjectCard">
                    <div> <img id="projectImg"src="${doc.projectImg}"> </div>  
                    <div id="projectTitle" class="title">${doc.projectTitle}</div>
                </div>
                <div class="backInnerProjectCard">
                    <div id="projectBody" class="small_title">${doc.projectBody}</div>
                </div>
            </div>
        </div>
        
        `
       })
    })
}

function getServicesSectionData(){
    db.collection("landingPage").doc("servicesSection").collection('cards').onSnapshot(function(snapshot){
        getAllDoc=[]
        snapshot.forEach(function(doc){
            docData=doc.data()
            getAllDoc.push(docData)
        })
       getAllDoc.forEach(function(doc){
            serviceCard__wrapper.innerHTML+=`
                <div class="card">
                    <div id="serviceTitle" class="title">${doc.serviceTitle}</div>         
                    <div class="icon">
                        <img id="serviceImg" src="${doc.serviceImg}"/>
                    </div><!--/icon-->  
                    <div id="servicefeatures">
                        <span>${doc.serviceFeatures}</span><br>
                    </div><!--/features-->         
                </div><!--/card-->
            `                       
       })
    })
}

function getEducationSectionSectionData(){
    db.collection("landingPage").doc("educationSection").collection('cards').onSnapshot(function(snapshot){
        getAllDoc=[]
        snapshot.forEach(function(doc){
            docData=doc.data()
            getAllDoc.push(docData)
        })
       getAllDoc.forEach(function(doc){
            educationCardWrapper.innerHTML+=`
            <div class="educationCard">        
            <div class="educationCardImg">
              <img id="educationImg" src="${doc.educationImg}"/>
            </div>
            <div class="projectCard__data">
              <div><span id="educationTitle">${doc.educationPeriod}</span><br>
              <span id="educationPeriod">${doc.educationTitle}</span></div> 
              <div class="educationLine"></div> 
              <div id="educationBody"> <p> ${doc.educationBody}</p></div>  
            </div>       
          </div>
            `                       
       })
    })

}

function getContactMeSectionData(){
    db.collection("landingPage").doc("contactMeSection").onSnapshot(function(doc){
        let contactMeSectionData=doc.data()
        contactEmail.innerHTML=`${contactMeSectionData.contactEmail}`
        contactNumber.innerHTML=`${contactMeSectionData.contactNumber}`
    }) 
}

//lazy loading
const fullBody=document.querySelector('#fullBody')
function callback(mutationList, observer) {
    mutationList.forEach( (mutation) => {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("#fullBody").style.display = "block";
    });
  }

const observerOptions = {
    childList: true,
    attributes: true,
    
    // Omit (or set to false) to observe only changes to the parent node
    subtree: true 
  }
const observer = new MutationObserver(callback);
observer.observe(fullBody, observerOptions);