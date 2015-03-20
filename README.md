# FileInput
Slim, simple and time-saving wrapper for reading files with input[type="file"] and drag n drop

![Start](https://img.shields.io/github/stars/and3k5/FileInput.svg)

![Start](https://img.shields.io/github/release/and3k5/FileInput.svg)
<iframe src="https://ghbtns.com/github-btn.html?user=and3k5&repo=FileInput&type=fork&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
<iframe src="https://ghbtns.com/github-btn.html?user=and3k5&repo=FileInput&type=star&count=true" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
## Why?
So save time when i need user to submit a file somehow.
## How?
### index.html
```html
<script src="js/FileInput.js"></script>
<div id="drop" style="width:100px;height:100px;background-color:grey">
    Drop here
</div>
<input id="fileupload">
```
### file.js
```javascript
var fi = new FileInput({type: FileInput.ARRAYBUFFER});
fi.onload= function (data) {
    // Do whatever you want with the data variable
};
fi.createDragDrop(document.querySelector("div#droparea"));
fi.createFileUpload(document.querySelector("input#file"));`
```
## Halp?
Feel free to contribute by making pull requests, issues or whatever.