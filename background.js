const URL = "https://docs.google.com/presentation/d/e/2PACX-1vSG6GxxICjTBy2GFwE6rNlir958QFeJqiasuPMKc-PIOINoaS_16xfo3uLqHBiVjmYc3FTB-uCyrDWX/pub?"

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.ready) {
        console.log("ready to refresh this tab");
        console.log(request);
    }

    if(request.loaded){
        sendResponse(`${sender} connected to background.js`);
        console.log("Connected");
    }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    console.log("INFO: " + tabId + ", " + tab.Id);

    if(changeInfo && changeInfo.url){
        var changedURL = changeInfo.url;
        if(changedURL.includes(URL)){
            let slideId = changedURL.substring(changedURL.indexOf("slide=")+6)

            console.log(slideId);
            if(slideId == "id.p"){
                refresh(tabId)
                    .then(console.log)
                    .catch(console.error);
            }
        }
    }
});

var refresh = (tabId) => new Promise((resolves, rejects)=>{
    chrome.tabs.sendMessage(tabId,{refresh:true},function(response){
        resolves(response);
    });
    setTimeout(()=>rejects("Took too long to hear back from tab"),10000);
});


