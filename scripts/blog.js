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
            allArticles.push(doc.data());
        })
        
        if(allArticles !== null && allArticles.length>0){ //check if articles are null
            
        let highlightArticles=allArticles.slice(0,4);
        let otherArticles=allArticles.slice(4,(allArticles.length));
        const divA=document.querySelector('#a')
        divA.innerHTML+=`
            <a href="./blogArticle.html">
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
        const divB=document.querySelector('#b')
        divB.innerHTML+=`
            <a href="#">
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
        const divC=document.querySelector('#c')
        divC.innerHTML+=`
            <a href="#">
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
        const divD=document.querySelector('#d')
        divD.innerHTML+=`
            <a href="#">
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

        otherArticles.forEach(function(doc){
            const divInner=document.querySelector('#inner')
            divInner.innerHTML+=` 
            <figure>
                <img src='${doc.articleCover}'>
                <figcaption>${doc.timestamp.toDate().toDateString()}</figcaption>
                <figcaption class="title">${doc.articleTitle}</figcaption>
                <figcaption>${doc.articleCategory}</figcaption>
                <figcaption>${doc.articleHeadline}</figcaption>
          </figure>`
        
        })
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