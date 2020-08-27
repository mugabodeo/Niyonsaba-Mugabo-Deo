const serviceForm=document.querySelector('#serviceForm');
const updateServicesSection=document.querySelector('#updateServicesSection');
let params = new URLSearchParams(location.search);
let docID= params.get('docID');
let uploader = document.querySelector('#uploader');
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
var errorMessage=document.querySelector('#errorMessage');
const serviceImg=document.querySelector('#serviceImg');
const checkInput=document.querySelector('#checkInput')
var checked=null;
var cardRef=null;
var optionId=null;
const selectedElement=document.querySelector('#selectedElement');
const deleteCard=document.querySelector('#deleteCard');

checkInput.addEventListener('click',function(e){
    if(checkInput.checked == true){
        checked=true
    }

    else{
        checked=false
    }
})

if(docID){
    db.collection("landingPage").doc(docID).collection('cards')
    .onSnapshot(function(snapshot){
        const allDoc=[]
        snapshot.forEach(function(doc){
            const docData=doc.data();
            const id=doc.id
            allDoc.push({id, ...docData});
        })
        console.log(allDoc)
        allDoc.forEach(function(doc){
            selectedElement.innerHTML+=`
                <option value="${doc.id}"> ${doc.serviceTitle} card </option>
            ` 
        })

        selectedElement.addEventListener('change',function(e){
                optionId=selectedElement.options[selectedElement.selectedIndex].value
                cardRef=db.collection('landingPage').doc('servicesSection').collection('cards').doc(optionId)
                console.log(optionId)
                cardRef
                .onSnapshot(function(doc){
                    const docData=doc.data();
                    imgDisplay.innerHTML=`<img src="${docData.serviceImg}" height='100px' width='100px'>`
                    document.querySelector('#serviceTitle').value=docData.serviceTitle;
                    document.querySelector('#serviceFeatures').value=docData.serviceFeatures;
                    deleteCard.innerHTML='<a id="delete" onclick="deleteThisCard()"> Delete this card</a>'
                })
        })
        
        
    })

    function deleteThisCard(){
        console.log(optionId)
        const result = confirm("are you sure you Want to delete this document? This action can not be undone.");
        if (result) {
            db.collection('landingPage').doc('servicesSection').collection('cards').doc(optionId)
                .delete()
                .then(res=>{
                    window.location.reload()
                })
            }
    }
    
    updateServicesSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        (checked== true)? saveFile() : updateDataWithoutFile()
        
    })
}

else{
    updateServicesSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        saveFile();
    })
}

function saveFile(){
    const serviceImg=serviceForm['serviceImg'].files[0];
    const serviceTitle =document.querySelector('#serviceTitle').value;
    const serviceFeatures=document.querySelector('#serviceFeatures').value;
    if(serviceTitle && serviceFeatures && allowedExtensions.exec(serviceForm['serviceImg'].value)){
        let storageRef = firebase.storage().ref('/landingPage/'+serviceImg.name);
     
        let uploadTask = storageRef.put(serviceImg);
        uploadTask.on('state_changed',function progress(snapshot){
            let percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },function error(err){
            errorMessage.innerHTML=err.message
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                (docID!==null)?updateData(downloadURL): saveData(downloadURL)
              }).then((res)=>{
                uploader.value=0;
                errorMessage.innerHTML=''
                serviceForm.reset()
              })
        })  
    }

    else{
        errorMessage.innerHTML+=' please fill form and only images are allowed to upload'
    }
    
}

function saveData(downloadURL){
    db.collection('landingPage').doc('servicesSection').collection("cards").add({
        serviceTitle:document.querySelector('#serviceTitle').value,
        serviceFeatures:document.querySelector('#serviceFeatures').value,
        serviceImg:downloadURL,
    }).then(res=>{
        window.location.reload()
    })   
   
}

function updateData(downloadURL){
    cardRef.update({
        serviceTitle:document.querySelector('#serviceTitle').value,
        serviceFeatures:document.querySelector('#serviceFeatures').value,
        serviceImg:downloadURL,
    }).then(res=>{
        window.location.reload()
    })
    
}

function updateDataWithoutFile(){
    if(serviceTitle.value && serviceFeatures.value){
        cardRef.update({
            serviceTitle:document.querySelector('#serviceTitle').value,
            serviceFeatures:document.querySelector('#serviceFeatures').value,
        }).then(res=>{
            window.location.reload()
        }) 
    }
    else{
        errorMessage.innerHTML='fill all inputs'
    }
      

}