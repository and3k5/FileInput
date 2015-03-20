"use strict";

/*
options {
    accept: "" | "image/*" | ".jpg",                // like the input[type="file"] attribute accept
    fileupload: null | "#elementid" | elementobj,
    dragndrop: null | "#elementid" | elementobj,
    onload: empty function | function () {....},
    onerror: empty function | function () {....},
    dragndrop_hoverclass: "" | "classname",
    fileupload_hoverclass: "" | "classname",
    type: FileInput.ARRAYBUFFER | FileInput.DATAURL | FileInput.TEXT
}
*/

var FileInput = (function () {
    function FileInput() {
        var _data;
        var _file;
        Object.defineProperty(this, 'data', {
            get: function () {
                return _data;
            }
            ,
            set: function (v) {
                _data = v;
                this.onload(_data,_file);
            }
        }
        );
        var options;
        if ((options=arguments[0]) instanceof Object) {
            var value, key;
            for (key in options) {
                switch ((value=options[key],key)) {
                    case "accept": this.accept = value;
                    break;
                    case "fileupload": this.createFileUpload(value);
                    break;
                    case "dragndrop": this.createDragDrop(value);
                    break;
                    case "onload": this.onload = value;
                    break;
                    case "onerror": this.onerror = value;
                    break;
                    case "dragndrop_hoverclass": this.dragndrop_hoverclass = value;
                    break;
                    case "fileupload_hoverclass": this.fileupload_hoverclass = value;
                    break;
                    case "type": this.type = value;
                    break;
                }
            }
        }
        else {
            console.log("NOT OBJ");
        }
    }
    FileInput.TYPE = {
        ARRAYBUFFER: 0, DATAURL: 1, TEXT: 2, FILE:3
    }
    ;
    FileInput.prototype.accept = "";
    FileInput.prototype.fileupload_hoverclass = "";
    FileInput.prototype.dragndrop_hoverclass = "";
    FileInput.prototype.type=FileInput.TYPE.ARRAYBUFFER;
    function readFile(file) {
        var fileInputObj  = this;
        if (file != undefined) {
            var reader = new FileReader();
            reader.onload = function (event) {
                fileInputObj.data = event.target.result;
            }
            ;
            switch (this.type) {
                case FileInput.TYPE.ARRAYBUFFER: reader.readAsArrayBuffer(file);
                break;
                case FileInput.TYPE.DATAURL: reader.readAsDataURL(file);
                break;
                case FileInput.TYPE.TEXT: reader.readAsText(file);
                break;
                case FileInput.TYPE.FILE: fileInputObj.data = file;
                break;
                default: throw "Unknown type";
            }
        }
    }
    FileInput.prototype.createFileUpload = function (element) {
        var fileInputObj = this;
        element.type = "file";
        element.onchange = function (e) {
            e.stopPropagation();
            e.preventDefault();
            var file = e.target.files[0];
            readFile.call(fileInputObj, file);
            return false;
        }
        ;
    }
    ;
    FileInput.prototype.createDragDrop = function (element) {
        var fileInputObj = this;
        element.draggable = false;
        element.ondragover = function (e) {
            e.preventDefault();
            return false;
        }
        ;
        element.ondragleave = element.ondragend = function (e) {
            return false;
        }
        ;
        element.ondrop = function (e) {
            e.preventDefault();
            var file = e.dataTransfer.files[0];
            readFile.call(fileInputObj, file);
            return false;
        }
        ;
    }
    ;
    /*
    FileInput.prototype.createPaste = function (element) {
        var fileinput = this;
        element.onpaste = function(event){
          var clipboardData = (event.clipboardData || event.originalEvent.clipboardData);
          
          var data = null;
          
          if (clipboardData.files.length>0) {
              data = clipboardData.files;
          }else if (clipboardData.items.length>0) {
              data = clipboardData.items;
          }else{
              console.log("bail paste");
              return false;
          }
          console.log(data[0].getAsFile());
          //console.log(clipboardData.files);
          //console.log(clipboardData.items);
          
          console.log(data);
          
          return;
          readFile.call(fileInputObj,file);
          
          //var blob = items[0].getAsFile();
          //var reader = new FileReader();
          //reader.onload = function (event) {
    	  //	fileinput.data = event.target.result;
    	  //	fileinput.onload();
    	  //}
          //reader.readAsArrayBuffer(blob);
        }
    }*/
    
    FileInput.prototype.onload = function () {};
    FileInput.prototype.data = null;
    return FileInput;
}
)();
