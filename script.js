

document.addEventListener('DOMContentLoaded', function() {
    const inputBut = document.getElementById("theButton");
    const texts= document.getElementById("text")
    

    // user submission function 
    inputBut.addEventListener('click', function() {
        if(texts.value == ''){
            return;
        } else {
            addResponse();
        }
    });

    texts.addEventListener('keyup', function(e){
        if(e.key === "Enter"){
            addResponse();
        }
        if(texts.value == ''){
            document.getElementById('buttonelement').classList.remove("buttonelement");
        } else {
            console.log("added");
            document.getElementById('buttonelement').classList.add("buttonelement");
        }
    });

    texts.addEventListener('click', function(){
        texts.innerHTML = '';
    });

    async function addResponse(){
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML= `
        <div class="profile-picture">
            <img src="assets/no profile.png" alt="Profile Picture"></img>
        </div>
        <div class="message-content">
            <span class="message-sender">You<\span>
            <p>${texts.value}<\p>
        </div>`;

        const messageContainer = document.getElementById("responses");
        messageContainer.appendChild(messageElement);
        const prompt = texts.value;
        texts.value = '';

    
        const response = await aiResponse(prompt);
        displayResponse(response);
        
    }

    async function aiResponse(prompt){
        //add your API KEY HERE  
        const apiKey = '';
        const url = 'https://api.openai.com/v1/chat/completions';
        
        const options= {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: prompt}],
                max_tokens: 100


            })   
        }
        try{
            const response=await fetch(url, options)
            const responseData = await response.json();
            return responseData.choices[0].message.content;
        }catch(error){
            console.error(error)
        }


        
        
    }

    function displayResponse(response){
        const aimessage = document.createElement("div");
        aimessage.classList.add("message");
        aimessage.classList.add("aimessage");
        aimessage.innerHTML = `
        <div class="profile-picture">
            <img src="assets/logo.png" alt="AI Picture"></img>
        </div>
        <div class="message-content">
            <span class="message-sender">AJT</span>
            <p>${response}</p>
        </div>`;

        const aimessageContainer = document.getElementById("responses");
        aimessageContainer.appendChild(aimessage);
    }
});
 