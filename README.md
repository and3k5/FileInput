![Start](https://img.shields.io/github/stars/and3k5/FileInput.svg)
![Start](https://img.shields.io/github/release/and3k5/FileInput.svg)
# FileInput
Slim, simple and time-saving wrapper for reading files with input[type="file"] and drag n drop
## Why?
So save time when i need user to submit a file somehow.
## How?
You can [watch the demo](http://and3k5.github.io/FileInput/example/) or read the [reference table](REF.md)
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
var fi = new FileInput({type: FileInput.TYPE.ARRAYBUFFER});
fi.onload= function (data) {
    // Do whatever you want with the data variable
};
fi.createDragDrop(document.querySelector("div#droparea"));
fi.createFileUpload(document.querySelector("input#file"));`
```
## Halp?
Feel free to contribute by making pull requests, issues or whatever.

Work is in progress (Watch my [TODO List](TODO.md))

[Check out the unit test](http://and3k5.github.io/FileInput/test/FileInputTest.html)
