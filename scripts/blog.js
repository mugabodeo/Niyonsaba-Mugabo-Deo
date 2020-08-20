let theDiv=document.querySelector("#myTopnav");

function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            theDiv.innerHTML +='<a href="" onclick=signOut() > Log out</a>';
        } 
        else{
            theDiv.innerHTML +='<a href="../templates/login.html"> sign in</a>'
        }
    });
}


db.collection("articles").orderBy("timestamp", "asc")
    .onSnapshot(function(snapshot) {
        let allArticles=[];
        snapshot.forEach(function(doc){
            const Data=doc.data();
            const id=doc.id
            allArticles.push({id, ...Data});
        })
        if(allArticles !== null && allArticles.length>0){ //check if articles are null
            
        let highlightArticles=allArticles.slice(0,4);
        let otherArticles=allArticles.slice(4,(allArticles.length));
        const divA=document.querySelector('#a')

        //4 special cards 
        divA.innerHTML+=`
            <a id="articleCard1">
                <img src='${highlightArticles[0]['articleCover']}'>
                <div class="content">
                    <div class="contentDetails">    
                        <p class="smallTitle">${highlightArticles[0]['articleCategory']}</p>
                        <div class="title">${highlightArticles[0]['articleTitle']}</div>
                        <div class="smallDescription">${highlightArticles[0]['articleHeadline']}</div>
                        <div class="smallTitle">${highlightArticles[0]['timestamp'].toDate().toDateString()}</div>
                    </div>
                </div>
            </a>    
           
        `
        const articleCard1=document.querySelector('#articleCard1')
        articleCard1.addEventListener('click',function(e){
        document.location.href='/templates/blogArticle.html?articleId=' + highlightArticles[1]['id']
         })

        const divB=document.querySelector('#b')
        divB.innerHTML+=`
            <a href="#" id="articleCard2">
                <img src='${highlightArticles[1]['articleCover']}' >
                <div class="content">
                    <div class="contentDetails_1">
                        <p class="smallTitle">${highlightArticles[1]['articleCategory']}</p>
                        <div class="title">${highlightArticles[1]['articleTitle']}</div>
                        <div class="smallDescription">${highlightArticles[1]['articleHeadline']}</div>
                        <div class="smallTitle">${highlightArticles[1]['timestamp'].toDate().toDateString()}</div>
                    </div>
                </div> 
            </a>
        `
        const articleCard2=document.querySelector('#articleCard2')
        articleCard2.addEventListener('click',function(e){
        document.location.href='/templates/blogArticle.html?articleId=' + highlightArticles[2]['id']
         })

        const divC=document.querySelector('#c')
        divC.innerHTML+=`
            <a id='articleCard3'>
                <img src='${highlightArticles[2]['articleCover']}' >
                <div class="content">
                    <div class="contentDetails_2">
                        <p class="smallTitle">${highlightArticles[2]['articleCategory']}</p>
                        <div class="title">${highlightArticles[2]['articleTitle']}</div>
                        <div class="smallDescription">${highlightArticles[2]['articleHeadline']}</div>
                        <div class="smallTitle">${highlightArticles[2]['timestamp'].toDate().toDateString()}</div>
                    </div>
                </div> 
            </a>  
        `
        const articleCard3=document.querySelector('#articleCard3')
        articleCard3.addEventListener('click',function(e){
        document.location.href='/templates/blogArticle.html?articleId=' + highlightArticles[2]['id']
         })

        const divD=document.querySelector('#d')
        divD.innerHTML+=`
            <a id="articleCard4">
                <img src='${highlightArticles[3]['articleCover']}' >
                <div class="content">
                    <div class="contentDetails_3">
                        <p class="smallTitle">${highlightArticles[3]['articleCategory']}</p>
                        <div class="title">${highlightArticles[3]['articleTitle']}</div>
                        <div class="smallDescription">${highlightArticles[3]['articleHeadline']}</div>
                        <div class="smallTitle">${highlightArticles[3]['timestamp'].toDate().toDateString()}</div>
                    </div>
                </div> 
            </a>
        `
        const articleCard4=document.querySelector('#articleCard4')
        
        articleCard4.addEventListener('click',function(e){
        document.location.href='/templates/blogArticle.html?articleId=' + highlightArticles[3]['id']
         })
        const divInner=document.querySelector('#inner')
        const figure=document.getElementsByClassName('figureId')
        
        otherArticles.forEach(function(doc){
            divInner.innerHTML+=`
            <figure class="figureId" data-id="${doc.id}">
                <img src='${doc.articleCover}'>
                <figcaption>${doc.timestamp.toDate().toDateString()}</figcaption>
                <figcaption class="title">${doc.articleTitle}</figcaption>
                <figcaption>${doc.articleCategory}</figcaption>
                <figcaption>${doc.articleHeadline}</figcaption>
            </figure>
            ` 
            getId()
        })
        
        function  getId(){
            for(const figures of figure){
                figures.addEventListener('click',function (e){
                    e.preventDefault();
                    const id=figures.getAttribute('data-id')
                    document.location.href='/templates/blogArticle.html?articleId=' + id
                })
            }
        }

        }
 
        else{
            let errorMessage=document.querySelector('#errorMessage');
            errorMessage.innerHTML="No articles to display"
        }

    
       /* snapshot.docChanges().forEach(function(change) {
            if (change.type === "added") {
                console.log("New article: ", change.doc.data());
             
            }
            if (change.type === "modified") {
                console.log("Modified article: ", change.doc.data());
               
            }
            if (change.type === "removed") {
                console.log("Removed article: ", change.doc.data());
               
            }
        });*/
    });

    

    
