# Reference table - FileInput
## Constructor
`new FileInput([options])`

(See Options)

### Syntax:
```javascript
var options = {type:FileInput.TYPE.FILE};
var fi = new FileInput(options);
```
### Options
```javascript
var options = {
    accept : "image/jpeg",
    fileupload : document.querySelector("input[type=file]"),
    dragndrop : document.querySelector("div"),
    onload : function (file) { console.log("File loaded",file); },
    onerror : function (e) { console.log("Some error happened: ",e.message); },
    dragndrop_hoverclass : "drophover",
    type : FileInput.TYPE.FILE
}
```
#### options.accept
The accept option is used to specify the types of files that the FileInput object should accept.

The specification will apply to the file upload element and raise an error on drop events.

The accept option can contain comma separated MIME types or file extensions.

##### Examples
```javascript
options.accept = "image/jpeg, image/png";
options.accept = ".gif, .jpeg, .png";
```

#### options.fileupload
A string for querySelector or a input DOM element. 

The type parameter is automatically set to "file".

##### Examples
```javascript
options.fileupload = "input#fileuploadid";
options.fileupload = document.querySelector("input#fileuploadid");
```

#### options.dragndrop
A string for querySelector or any DOM element (supporting the drop event).

The necessary parameter is automatically applied.

##### Examples
```javascript
options.dragndrop = "div#dropelement";
options.dragndrop = document.querySelector("div#dropelement");
```

#### options.onload
An eventhandler which is called when a file is successfull parsed.

##### Examples
```javascript
options.onload = function (file) { console.log("File loaded",file); };
```

#### options.onload
An errorhandler which is called when anything goes wrong, including when accept isn't fulfilled.


##### Examples
```javascript
options.onerror = function (e) { console.log("Some error happened: ",e.message); };
```

#### options.dragndrop_hoverclass
The class name which will appear when a user is hovering the dragndrop element with a file.

##### Examples
```javascript
options.dragndrop_hoverclass = "drophover";
options.dragndrop_hoverclass = "glow";
```

#### options.type
The type which the fileinput should return

The following types are available:

* `FileInput.TYPE.ARRAYBUFFER`
 * [ArrayBuffer](http://www.javascripture.com/ArrayBuffer)
* `FileInput.TYPE.DATAURL`
  * Data as encoded string (dataurl - base64)
* `FileInput.TYPE.TEXT`
  * Data as string
* `FileInput.TYPE.FILE`
 * [File](http://www.javascripture.com/File)

##### Examples
```javascript
options.type = FileInput.TYPE.FILE;
options.type = FileInput.TYPE.TEXT;
```