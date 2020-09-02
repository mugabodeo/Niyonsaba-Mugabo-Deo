const educationForm=document.querySelector('#educationForm');
const updateEducationSection=document.querySelector('#updateEducationSection');
let params = new URLSearchParams(location.search);
let docID= params.get('docID');
let uploader = document.querySelector('#uploader');
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
var errorMessage=document.querySelector('#errorMessage');
const educationImg=document.querySelector('#educationImg');
const checkInput=document.querySelector('#checkInput')
var checked=null;
var cardRef=null;
var optionId=null;
const selectedElement=document.querySelector('#selectedElement');
const deleteCard=document.querySelector('#deleteCard');
const selectdiv=document.querySelector('#selectdiv');
const imageCheck=document.querySelector('#imageCheck');
const actionTitle=document.querySelector('#actionTitle')
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
                <option value="${doc.id}"> ${doc.educationTitle} card </option>
            ` 
        })

        selectedElement.addEventListener('change',function(e){
                optionId=selectedElement.options[selectedElement.selectedIndex].value;
                if(optionId=='DefaultSelect'){
                    window.location.reload()
                }
                cardRef=db.collection('landingPage').doc('educationSection').collection('cards').doc(optionId)
                console.log(optionId)
                cardRef
                .onSnapshot(function(doc){
                    const docData=doc.data();
                    imgDisplay.innerHTML=`<img src="${docData.educationImg}" height='100px' width='100px'>`
                    document.querySelector('#educationTitle').value=docData.educationTitle;
                    document.querySelector('#educationPeriod').value=docData.educationPeriod;
                    document.querySelector('#educationBody').value=docData.educationBody;
                    deleteCard.innerHTML='<a id="delete" onclick="deleteThisCard()"> Delete this card</a>'
                })
        })
        
        
    })
    
    function deleteThisCard(){
        console.log(optionId)
        const result = confirm("are you sure you Want to delete this document? This action can not be undone.");
        if (result) {
            db.collection('landingPage').doc('educationSection').collection('cards').doc(optionId)
                .delete()
                .then(res=>{
                    alert('card has been succesfully deleted');
                    window.location.reload()
                })
            }
    }
    updateEducationSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        (checked== true)? saveFile() : updateDataWithoutFile()
        
    })
}

else{
    actionTitle.innerHTML="add a card on education section"
    selectdiv.innerHTML="";
    imageCheck.innerHTML="";
    updateEducationSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        saveFile();
    })
}

function saveFile(){
    const educationImg=educationForm['educationImg'].files[0];
    const educationTitle =document.querySelector('#educationTitle').value;
    const educationPeriod=document.querySelector('#educationPeriod').value;
    const educationBody=document.querySelector('#educationBody').value;

    if(educationTitle && educationPeriod && educationBody && allowedExtensions.exec(educationForm['educationImg'].value)){
        let storageRef = firebase.storage().ref('/landingPage/'+educationImg.name);
     
        let uploadTask = storageRef.put(educationImg);
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
                educationForm.reset()
              })
        })  
    }

    else{
        errorMessage.innerHTML+=' please fill form and only images are allowed to upload'
    }
    
}

function saveData(downloadURL){
    db.collection('landingPage').doc('educationSection').collection("cards").add({
        educationTitle:document.querySelector('#educationTitle').value,
        educationPeriod:document.querySelector('#educationPeriod').value,
        educationBody:document.querySelector('#educationBody').value,
        educationImg:downloadURL,
    }).then(res=>{
        alert('card has been succesfully added');
        window.location.reload()
    })   
   
}

function updateData(downloadURL){
    cardRef.update({
        educationTitle:document.querySelector('#educationTitle').value,
        educationPeriod:document.querySelector('#educationPeriod').value,
        educationBody:document.querySelector('#educationBody').value,
        educationImg:downloadURL,
    }).then(res=>{
        alert('card has been succesfully updated');
        window.location.reload()
    })
    
}

function updateDataWithoutFile(){
    
    if(educationTitle.value && educationPeriod.value && educationBody.value){
        cardRef.update({
            educationTitle:document.querySelector('#educationTitle').value,
            educationPeriod:document.querySelector('#educationPeriod').value,
            educationBody:document.querySelector('#educationBody').value,
        }).then(res=>{
            alert('card has been succesfully updated');
            window.location.reload()
        }) 
    }
    else{
        errorMessage.innerHTML='fill all inputs'
    }
      

}