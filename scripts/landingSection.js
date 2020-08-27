const homeForm=document.querySelector('#homeForm');
const updateLandingSection=document.querySelector('#updateLandingSection');
let params = new URLSearchParams(location.search);
const docID= params.get('docID');
let uploader = document.querySelector('#uploader');
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
var errorMessage=document.querySelector('#errorMessage');
const imgDisplay=document.querySelector('#imgDisplay');
const checkInput=document.querySelector('#checkInput')
var checked=null;


checkInput.addEventListener('click',function(e){
    if(checkInput.checked == true){
        checked=true
    }

    else{
        checked=false
    }
})

if(docID){
    db.collection("landingPage").doc(docID)
    .onSnapshot(function(doc){
        let docData=doc.data()
        imgDisplay.innerHTML=`<img src="${docData.meImg}" height='100px' width='100px'>`
        document.querySelector('#fullName').value=docData.fullName;
        document.querySelector('#catchLine').value=docData.catchLine
        }
    )

    updateLandingSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        (checked== true)? saveFile() : updateDataWithoutFile()
        
    })
}

else{
    updateLandingSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        saveFile();
    })
}

function saveFile(){
    const meImg=homeForm['meImg'].files[0];
    const fullName=document.querySelector('#fullName').value;
    const catchLine=document.querySelector('#catchLine').value;
    if(fullName && catchLine && allowedExtensions.exec(homeForm['meImg'].value)){
        let storageRef = firebase.storage().ref('/landingPage/'+meImg.name);
     
        let uploadTask = storageRef.put(meImg);
        uploadTask.on('state_changed',function progress(snapshot){
            let percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },function error(err){
            errorMessage.innerHTML+=err.message
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                if(docID !== null){
                    updateData(downloadURL)
                }
                else {
                    saveData(downloadURL)
                }
                
              }).then((res)=>{
                uploader.value=0;
                errorMessage.innerHTML=''
                homeForm.reset()
              })
        })  
    }

    else{
        errorMessage.innerHTML+=' please fill form and only images are allowed to upload'
    }
    
}

function saveData(downloadURL){
    db.collection('landingPage').doc('landingSection').set({
        fullName:document.querySelector('#fullName').value,
        catchLine:document.querySelector('#catchLine').value,
        meImg:downloadURL,
    }).then(res=>{
        window.location.reload()
    })
}

function updateData(downloadURL){
    db.collection('landingPage').doc(docID).update({
        fullName:document.querySelector('#fullName').value,
        catchLine:document.querySelector('#catchLine').value,
        meImg:downloadURL,
    }).then(res=>{
        window.location.reload()
    })
}

function updateDataWithoutFile(){
    if(fullName && catchLine && meImg){
        db.collection('landingPage').doc(docID).update({
            fullName:document.querySelector('#fullName').value,
            catchLine:document.querySelector('#catchLine').value,
        }).then(res=>{
            window.location.reload()
        })
    }
    else{
        errorMessage.innerHTML='fill all inputs'
    } 

}