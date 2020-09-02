const commentForm= document.querySelector('#commentForm');
let commentList= document.querySelector('#commentList');
let commentsNumber=document.querySelector('#commentsNumber');
const pattern=/^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

db.collection("allComments").doc(`${docID}`).collection("articleComments").orderBy("createdAt", "asc")
    .onSnapshot(function(snapshot){
        let comments=[];
        snapshot.forEach(function(doc){
            comments.push(doc.data())
        })
        if(comments !==null && comments.length >0){
            //console.log(comments)
            commentsNumber.innerHTML=comments.length
            comments.forEach(function(doc){
                commentList.innerHTML+=`
                <div class="eachComment">
                    <div class="commentName"> 
                    ${doc.name} &nbsp; &nbsp;  ${doc.createdAt.toDate().toDateString()} 
                    </div>  
                    <div class="commentDescription">
                    ${doc.comment} 
                    </div>
                </div> `
            })     

        }
        else{
            commentError+="Be first to comment"
        }
    }) 

commentForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    e.stopPropagation();
    const name= commentForm['name'].value;
    const email=commentForm['email'].value;
    const comment=commentForm['comment'].value;
    const timestamp=firebase.firestore.FieldValue.serverTimestamp();
    let commentError=document.querySelector('#commentError');
    
    if(email.match(pattern)){
        db.collection("allComments").doc(`${docID}`).collection("articleComments").add({
            name:name,
            email:email,
            comment:comment,
            createdAt:timestamp
        })
        .then(function (res) {
            commentError.innerHTML="";
            commentForm.reset()
            window.location.reload()
        })
        .catch(function (err) {
            commentError.innerHTML=err.message;
        });
    }
    else{
        commentError.innerHTML="please enter valid email address";
       
    }
       
})

 