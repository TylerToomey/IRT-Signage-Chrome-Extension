console.log("Loaded")
chrome.runtime.sendMessage({loaded:true},(response)=>{
    console.log(response);
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if(request.refresh){
          refresh(1);
          console.log("Refreshing");
      }
      return true;
    });

var refresh = (seconds) => new Promise((resolves,rejects)=>{
    if(seconds <= 0) rejects("Delay must be greater than 0 seconds");
    setTimeout(()=>{
        chrome.runtime.sendMessage({ready:true}, (response)=>{
            location.reload();
            console.log("Refreshed");

            resolves(response);
        });
    },seconds*1000);
});
