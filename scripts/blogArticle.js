let errorMessage=document.querySelector('#errorMessage');
let articleContent=document.querySelector('#articleContent')
db.collection("articles").doc('8STCWGYdCPfJHfUHv2QR')
    .onSnapshot(function(doc){
        let article=doc.data()
       console.log(article)
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