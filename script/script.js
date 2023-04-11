function getURL() {
    return location.href;
}
  
function getTitle() {
    return document.title;
}

function copy2clipboard(form) {
    if (!navigator.clipboard) {
        alert("このブラウザは対応していません");
        return;
    }
    navigator.clipboard.writeText(form).then(
        () => {
            alert("文章をコピーしました。");
        },
        () => {
            alert("コピーに失敗しました。");
        }
    );
  }
  
function Process() {
    var url = getURL();
    var title = getTitle();
  
    var share_form = title + "\n" + url;
    document.getElementById("output").innerHTML = share_form;
  
    copy2clipboard(share_form);
}
  
document.getElementById("run").addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: Process,
    });
});