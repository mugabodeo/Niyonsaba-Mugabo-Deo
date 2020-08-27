const projectForm=document.querySelector('#projectForm');
const updateProjectsSection=document.querySelector('#updateProjectsSection');
let params = new URLSearchParams(location.search);
let docID= params.get('docID');
let uploader = document.querySelector('#uploader');
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
var errorMessage=document.querySelector('#errorMessage');
const projectImg=document.querySelector('#projectImg');
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
                <option value="${doc.id}"> ${doc.projectTitle} card </option>
            ` 
        })

        selectedElement.addEventListener('change',function(e){
                optionId=selectedElement.options[selectedElement.selectedIndex].value
                cardRef=db.collection('landingPage').doc('projectsSection').collection('cards').doc(optionId)
                console.log(optionId)
                cardRef
                .onSnapshot(function(doc){
                    const docData=doc.data();
                    imgDisplay.innerHTML=`<img src="${docData.projectImg}" height='100px' width='100px'>`
                    document.querySelector('#projectTitle').value=docData.projectTitle;
                    document.querySelector('#projectBody').value=docData.projectBody;
                    deleteCard.innerHTML='<a id="delete" onclick="deleteThisCard()"> Delete this card</a>'
                })
        })
        
    })
    
    function deleteThisCard(){
        console.log(optionId)
        const result = confirm("are you sure you Want to delete this document? This action can not be undone.");
        if (result) {
            db.collection('landingPage').doc('projectsSection').collection('cards').doc(optionId)
                .delete()
                .then(res=>{
                    window.location.reload()
                })
            }
    }
   
    updateProjectsSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        (checked== true)? saveFile() : updateDataWithoutFile()
        
    })
}

else{
    updateProjectsSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        saveFile();
    })
}

function saveFile(){
    const projectImg=projectForm['projectImg'].files[0];
    const projectTitle =document.querySelector('#projectTitle').value;
    const projectBody=document.querySelector('#projectBody').value;
    document.querySelector('#projectBody').value
    if(projectTitle && projectBody && allowedExtensions.exec(projectForm['projectImg'].value)){
        let storageRef = firebase.storage().ref('/landingPage/'+projectImg.name);
     
        let uploadTask = storageRef.put(projectImg);
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
                projectForm.reset()
              })
        })  
    }

    else{
        errorMessage.innerHTML+=' please fill form and only images are allowed to upload'
    }
    
}

function saveData(downloadURL){
    db.collection('landingPage').doc('projectsSection').collection("cards").add({
        projectTitle:document.querySelector('#projectTitle').value,
        projectBody:document.querySelector('#projectBody').value,
        projectImg:downloadURL,
    }).then(res=>{
        window.location.reload()
    })   
   
}

function updateData(downloadURL){
    cardRef.update({
        projectTitle:document.querySelector('#projectTitle').value,
        projectBody:document.querySelector('#projectBody').value,
        projectImg:downloadURL,
    })
    window.location.reload()
}

function updateDataWithoutFile(){
    
    if(projectTitle.value && projectBody.value){
        cardRef.update({
            projectTitle:document.querySelector('#projectTitle').value,
            projectBody:document.querySelector('#projectBody').value,
        }).then(res=>{
            window.location.reload()
        }) 
    }
    else{
        errorMessage.innerHTML='fill all inputs'
    }
      

}