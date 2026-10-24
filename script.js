```javascript
// =====================================
// Instagraim AI Prompt Improver
// script.js
// =====================================

const improveBtn = document.getElementById("improveBtn");
const promptBox = document.getElementById("prompt");
const result = document.getElementById("result");

improveBtn.addEventListener("click", improvePrompt);

function improvePrompt(){

let prompt = promptBox.value.trim();

if(prompt===""){
result.innerHTML="<span style='color:#ff4d4d;'>Please enter a prompt.</span>";
return;
}

// Loading

result.innerHTML="⏳ Improving your prompt...";

setTimeout(()=>{

const improvedPrompt=`You are an expert AI assistant.

Your task is to complete the following request professionally.

Instructions:

• Understand the user's intent.

• Improve clarity and grammar.

• Expand the prompt with useful details.

• Make the response accurate.

• Use step-by-step explanations whenever possible.

• Provide examples if needed.

• Keep the response well structured.

User Prompt:

"${prompt}"

Generate the best possible answer.`;

result.textContent=improvedPrompt;

},1200);

}



// Copy Function

const copyBtn=document.createElement("button");

copyBtn.innerHTML="📋 Copy Prompt";

copyBtn.style.marginTop="20px";

result.after(copyBtn);

copyBtn.addEventListener("click",()=>{

if(result.innerText==""){
return;
}

navigator.clipboard.writeText(result.innerText);

copyBtn.innerHTML="✅ Copied";

setTimeout(()=>{

copyBtn.innerHTML="📋 Copy Prompt";

},2000);

});



// Character Counter

const counter=document.createElement("p");

counter.style.marginTop="15px";

counter.style.color="#94a3b8";

promptBox.after(counter);

promptBox.addEventListener("input",()=>{

counter.innerHTML=`Characters : ${promptBox.value.length}`;

});



// Auto Resize

promptBox.addEventListener("input",()=>{

promptBox.style.height="auto";

promptBox.style.height=promptBox.scrollHeight+"px";

});



// Keyboard Shortcut

promptBox.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key==="Enter"){

improvePrompt();

}

});



// Welcome Message

window.onload=()=>{

console.log("Instagraim AI Prompt Improver Loaded Successfully.");

};
```
