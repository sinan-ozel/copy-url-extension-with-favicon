browser.contextMenus.create({
  title: "Copy Markdown link with favicon",
  contexts: ["page", "tab"],
  onclick: (info, tab) => {
    copyText(`[${tab.title}](${tab.url})`);
  }
});

browser.pageAction.onClicked.addListener((tab) => {
  copyText(formatBookMarkDown(tab));
});

let input = document.createElement("input");
input.setAttribute("type", "text");
document.body.appendChild(input);

function copyText(text) {
  input.value = text;
  input.focus();
  input.select();
  document.execCommand("copy");
}

function formatBookMarkDown(tab){
  if (tab.favIconUrl === undefined){
    return `[${tab.title}](${tab.url})`
  }
  else{
    return `<img src="${tab.favIconUrl}" width="12"> [${tab.title}](${tab.url})`
  }
}