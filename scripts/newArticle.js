const newArticleForm= document.querySelector('#newArticleForm');
var errorMessage=document.querySelector('#errorMessage')


newArticleForm.addEventListener('submit',(e) =>{
    e.preventDefault();
    e.stopPropagation();
    const articleTitle=newArticleForm['articleTitle'].value;
    const articleCategory=newArticleForm['articleCategory'].value;
    const articleCover=newArticleForm['articleCover'].files[0];
    const articleBody=newArticleForm['articleBody'].value;
    const timestamp=firebase.firestore.FieldValue.serverTimestamp();
    const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    let uploader = document.querySelector('#uploader');
    let storageRef = firebase.storage().ref('/articleCovers/'+articleCover.name);
    let uploadTask = storageRef.put(articleCover);

    if(articleTitle && articleCategory && articleBody && allowedExtensions.exec(newArticleForm['articleCover'].value)){
       
        uploadTask.on('state_changed',function progress(snapshot){
            let percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },function error(err){
            errorMessage.innerHTML+=err.message
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                db.collection('articles').add({
                    articleTitle:articleTitle,
                    articleCategory:articleCategory,
                    timestamp:timestamp,
                    articleCover:downloadURL,
                    articleBody:articleBody
                })
                
              }).then((res)=>{
                uploader.value=0;
                errorMessage.innerHTML=''
                newArticleForm.reset()
              })
        })

        
    }

    else{
        errorMessage.innerHTML+='please fill form and only images are allowed to upload'
    }
    
})
