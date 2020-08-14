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


db.collection("articles")
    .onSnapshot(function(snapshot) {
        var allArticles=[];
        let x
        snapshot.forEach(function(doc){
            allArticles.push(doc.data());
        })

        let highlightArticles=allArticles.slice(0,4);
        let otherArticles=allArticles.slice(3,(allArticles.length -1));
        const divA=document.querySelector('#a')
        divA.innerHTML+=`
            <a href="./blogArticle.html">
                <img src='${highlightArticles[0]['articleCover']}'>
                <div class="content">
                    <div class="contentDetails">    
                        <p class="smallTitle">${highlightArticles[0]['articleCategory']}</p>
                        <div class="title">${highlightArticles[0]['articleTitle']}</div>
                        <div class="smallTitle">${highlightArticles[0]['timestamp'].toDate()}</div>
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
                        <span class="title">${highlightArticles[1]['articleTitle']}</span>
                        <p> onsequuntur dolore aperiam eveniet recusandae accusantium.</p>
                        <span class="smallTitle">${highlightArticles[1]['timestamp'].toDate()}</span>
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
                        <span class="title">${highlightArticles[2]['articleTitle']}</span>
                        <p> onsequuntur dolore aperiam eveniet recusandae accusantium.</p>
                        <span class="smallTitle">${highlightArticles[2]['timestamp'].toDate()}</span>
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
                        <span class="title">${highlightArticles[3]['articleTitle']}</span>
                        <p> onsequuntur dolore aperiam eveniet recusandae accusantium.</p>
                        <span class="smallTitle">${highlightArticles[3]['timestamp'].toDate()}</span>
                    </div>
                </div> 
            </a>
        `

        otherArticles.forEach(function(doc){
            const divInner=document.querySelector('#inner')
            divInner.innerHTML+=` 
            <figure>
                <img src='${doc.articleCover}'>
                <figcaption class="title">${doc.articleTitle}</figcaption>
                <figcaption>${doc.articleCategory}</figcaption>
                <figcaption>${doc.timestamp.toDate()}</figcaption>
                <figcaption>${doc.articleBody}</figcaption>
          </figure>`
        
        })

    
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