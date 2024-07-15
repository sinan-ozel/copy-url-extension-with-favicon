browser.contextMenus.create({
  title: "Copy Markdown link with favicon",
  contexts: ["page", "tab"],
  onclick: (info, tab) => {
    copyBookMarkDown(tab);
  }
});

browser.pageAction.onClicked.addListener((tab) => {
  copyBookMarkDown(tab);
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

function copyBookMarkDown(tab){
  if (tab.favIconUrl === undefined){
    copyText(`[${tab.title}](${tab.url})`)
  }
  else{
    resizeBase64Img(tab.favIconUrl, 12, 12).then((result)=>{
      copyText(`<img src="${result}" width="12"> [${tab.title}](${tab.url})`)
    });
  }
}

// https://stackoverflow.com/questions/20379027/javascript-reduce-the-size-and-quality-of-image-with-based64-encoded-code
function resizeBase64Img(base64, newWidth, newHeight) {
  return new Promise((resolve, reject)=>{
      const canvas = document.createElement("canvas");
      canvas.width = newWidth;
      canvas.height = newHeight;
      let context = canvas.getContext("2d");
      let img = document.createElement("img");
      img.src = base64;
      img.onload = function () {
          context.scale(newWidth/img.width,  newHeight/img.height);
          context.drawImage(img, 0, 0);
          resolve(canvas.toDataURL());
      }
  });
}
