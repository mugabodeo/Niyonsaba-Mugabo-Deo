let theDiv=document.querySelector("#myTopnav");
let overlayNav=document.querySelector("#overlayNav");

function signInStatus(){
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            theDiv.innerHTML +='<a href="../templates/adminPanel.html"> admin panel</a> <a href="" onclick=signOut() > Log out</a>';
            overlayNav.innerHTML+='<a href="../templates/adminPanel.html" onclick=closeNav()> admin panel</a> <a href="" onclick=signOut() > Log out</a>';
        } 
        else{
            theDiv.innerHTML +='<a href="../templates/login.html"> sign in</a>';
            overlayNav.innerHTML+='<a href="../templates/login.html"> sign in</a>';
        }
    });
}


db.collection("articles").orderBy("timestamp", "asc")
    .onSnapshot(function(snapshot) {
        let allArticles=[];
        snapshot.forEach(function(doc){
            const Data=doc.data();
            const id=doc.id
            console.log(id)
            allArticles.push({id, ...Data});
        })
        if(allArticles !== null && allArticles.length>0){ //check if articles are null
            
        let highlightArticles=allArticles.slice(0,4);
        let otherArticles=allArticles.slice(4,(allArticles.length));
        const divA=document.querySelector('#a')

        //4 special cards 
        divA.innerHTML+=`
            <a href="./blogArticle.html?articleId=${highlightArticles[1]['id']}">
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
            <a href="./blogArticle.html?articleId=${highlightArticles[2]['id']}" >
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
            <a href="./blogArticle.html?articleId=${highlightArticles[2]['id']}">
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
            <a href="./blogArticle.html?articleId=${highlightArticles[3]['id']}">
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

        const divInner=document.querySelector('#inner')
        
        otherArticles.forEach(function(doc){
            divInner.innerHTML+=`
            <figure>
               
      
                     
            <a href="./blogArticle.html?articleId=${doc.id}">
            <img src='${doc.articleCover}'>
            </a>
            <figcaption><a href="./blogArticle.html?articleId=${doc.id}">${doc.timestamp.toDate().toDateString()}</a></figcaption>
            <figcaption class="title"><a href="./blogArticle.html?articleId=${doc.id}">${doc.articleTitle}</a></figcaption>
            <figcaption><a href="./blogArticle.html?articleId=${doc.id}">${doc.articleCategory}</a></figcaption>
            <figcaption><a href="./blogArticle.html?articleId=${doc.id}">${doc.articleHeadline}</a></figcaption>
            </figure>
           
            `
        })

        }
 
        else{
            let errorMessage=document.querySelector('#errorMessage');
            errorMessage.innerHTML="No articles to display"
        }

    });

    

    