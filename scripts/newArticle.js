const newArticleForm= document.querySelector('#newArticleForm');
var errorMessage=document.querySelector('#errorMessage')
let params = new URLSearchParams(location.search);
const docID= params.get('articleId') 
let articleButton=document.querySelector('#articleButton')
let timestamp=firebase.firestore.FieldValue.serverTimestamp();  
const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
let uploader = document.querySelector('#uploader');


    
if(docID!==null){

    db.collection("articles").doc(docID)
    .onSnapshot(function(doc){
        let article=doc.data()
        document.querySelector('#articleTitle').value=article.articleTitle;
        document.querySelector('#articleCategory').value=article.articleCategory;
        document.querySelector('#articleHeadline').value=article.articleHeadline;
        document.querySelector('#articleBody').value=article.articleBody;
        articleButton.value='Edit/Update'
        }
    )
    newArticleForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        saveFile();
      })
   
}

else{
    
    newArticleForm.addEventListener('submit',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        saveFile();
    })
}

function saveFile(){
    let articleCover=newArticleForm['articleCover'].files[0];
    if(articleTitle && articleCategory && articleBody && allowedExtensions.exec(newArticleForm['articleCover'].value)){
        let storageRef = firebase.storage().ref('/articleCovers/'+articleCover.name);
     
        let uploadTask = storageRef.put(articleCover);
        uploadTask.on('state_changed',function progress(snapshot){
            let percentage=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
            uploader.value = percentage;
        },function error(err){
            errorMessage.innerHTML+=err.message
        },function complete(){
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                (docID!==null)?updateData(downloadURL): saveData(downloadURL)
              }).then((res)=>{
                uploader.value=0;
                errorMessage.innerHTML=''
                newArticleForm.reset()
              })
        })  
    }

    else{
        errorMessage.innerHTML+=' please fill form and only images are allowed to upload'
    }
    
}
    
function saveData(downloadURL){
    db.collection('articles').add({
        articleTitle:document.querySelector('#articleTitle').value,
        articleCategory:document.querySelector('#articleCategory').value,
        timestamp:timestamp,
        articleCover:downloadURL,
        articleHeadline:document.querySelector('#articleHeadline').value,
        articleBody:document.querySelector('#articleBody').value
    })
}

function updateData(downloadURL){
    db.collection('articles').doc(docID).update({
        articleTitle: document.querySelector('#articleTitle').value,
        articleCategory:document.querySelector('#articleCategory').value,
        timestamp:timestamp,
        articleCover:downloadURL,
        articleHeadline:document.querySelector('#articleHeadline').value,
        articleBody:document.querySelector('#articleBody').value
    })
}