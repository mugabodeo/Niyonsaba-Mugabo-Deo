let errorMessage=document.querySelector('#errorMessage');
let articleContent=document.querySelector('#articleContent')
let params = new URLSearchParams(location.search);
const docID= params.get('articleId') 
let navDiv=document.querySelector("#myTopnav"); 
let hiddenDiv=document.querySelector("#hiddenSection");



function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            navDiv.innerHTML +='<a href="" onclick=signOut() > Log out</a>';
            hiddenDiv.innerHTML+='<a id="editArticle"> <i class="fa fa-pencil-square-o" aria-hidden="true" > Edit </i> </a>&nbsp;&nbsp;&nbsp; <a id="deleteArticle"> <i class="fa fa-minus-circle" aria-hidden="true"></i>Delete </a>'
            const editArticle=document.querySelector("#editArticle");
            const deleteArticle=document.querySelector("#deleteArticle")
            deleteArticle.addEventListener('click',function(e){
                const result = confirm("are you sure you Want to delete this document? This action can not be undone.");
                if (result) {
                    event.stopPropagation();
                    db.collection("articles")
                        .doc(docID)
                        .delete()
                        .then(res=>{
                            window.location.href="/templates/blog.html"
                        })
                }
            })
            editArticle.addEventListener('click',function(e){
            document.location.href='/templates/newArticle.html?articleId=' + docID  
            })
        } 
        else{
            navDiv.innerHTML +='<a href="../templates/login.html"> sign in</a>'
        }
    });
}


db.collection("articles").doc(docID)
    .onSnapshot(function(doc){
        let article=doc.data()
        if(article !== null){
            articleContent.innerHTML+=`
            <div class="blogCover">
                <div class="title">Html & CSS ${article.articleTitle}</div>
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
