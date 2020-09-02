const contactMeForm=document.querySelector('#contactMeForm');
const updateContactMeSection=document.querySelector('#updateContactMeSection');
let params = new URLSearchParams(location.search);
const docID= params.get('docID');
var errorMessage=document.querySelector('#errorMessage');
const emailPattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const phonePattern=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

if(docID){
    db.collection("landingPage").doc(docID)
    .onSnapshot(function(doc){
        let docData=doc.data()
        document.querySelector('#contactEmail').value=docData.contactEmail;
        document.querySelector('#contactNumber').value=docData.contactNumber
        }
    )

    updateContactMeSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        updateDataWithoutFile()
        
    })
}

else{
    updateContactMeSection.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        if(contactEmail.value.match(emailPattern) && contactNumber.value.match(phonePattern)){
            saveData()
        }
        else{
            errorMessage.innerHTML='email or phonenumber is badly formatted'
        }
        
        
    })
}



function saveData(){
    db.collection('landingPage').doc('contactMeSection').set({
        contactEmail:document.querySelector('#contactEmail').value,
        contactNumber:document.querySelector('#contactNumber').value,
    }).then(res=>{
        window.location.reload()
    })
}


function updateDataWithoutFile(){
    
    if(contactEmail.value && contactNumber.value){
        if(contactEmail.value.match(emailPattern) && contactNumber.value.match(phonePattern)){
            db.collection('landingPage').doc(docID).update({
                contactEmail:document.querySelector('#contactEmail').value,
                contactNumber:document.querySelector('#contactNumber').value,
            }).then(res=>{
                window.location.reload()
            })
        }
        else{
            errorMessage.innerHTML='email or phonenumber is badly formatted'
        } 
     
    }
    else{
        errorMessage.innerHTML='fill all inputs'
    } 

}