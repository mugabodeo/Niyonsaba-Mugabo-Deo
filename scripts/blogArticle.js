let errorMessage=document.querySelector('#errorMessage');
let articleContent=document.querySelector('#articleContent');
let blogCover=document.querySelector('#blogCover');
let params = new URLSearchParams(location.search);
let docID= params.get('articleId') 
let navDiv=document.querySelector("#myTopnav"); 
let hiddenDiv=document.querySelector("#hiddenSection");

function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            navDiv.innerHTML +='<a href="" onclick=signOut() > Log out</a>';
            hiddenDiv.innerHTML+='<a id="editArticle" onclick="editArticle()"> <i class="fa fa-pencil-square-o" aria-hidden="true" > Edit </i> </a>&nbsp;&nbsp;&nbsp; <a id="deleteArticle" onclick="deleteArticle()"> <i class="fa fa-minus-circle" aria-hidden="true"></i>Delete </a>'
        } 
        else{
            navDiv.innerHTML +='<a href="../templates/login.html"> sign in</a>'
        }
    });
}

function deleteArticle(){
    const result = confirm("are you sure you Want to delete this document? This action can not be undone.");
    if (result) {
        db.collection("articles")
            .doc(docID)
            .delete()
            .then(res=>{
                window.location.href="/templates/blog.html"
            })
        }
}

function editArticle(){
    document.location.href='/templates/newArticle.html?articleId=' + docID  
}
    

if(docID!==null){
    db.collection("articles").doc(docID)
    .onSnapshot(function(doc){
     
        let article=doc.data()
        if(article !== null){
            articleContent.innerHTML+=`
            <div id="blogCover">
                <div class="title">${article.articleTitle}</div>
                <div class="smallTitle"><span>${article.articleCategory}</span> &nbsp; &nbsp; ${article.timestamp.toDate().toDateString()}<span ></div>
                <img src=${article.articleCover}>    
                <div class="blogSection">
                ${article.articleBody}
                </div>
            </div>`
        }
        else{
            errorMessage.innerHTML+="article can't be found"
        }

    })
    

}

else{
  
    errorMessage.innerHTML+="article can't be found";
    console.log('not found')
}

