"use strict";

var FileInput = (function () {
    function FileInputException(message) {
        this.message = message;
        this.name = "FileInputException";
    }
    
    function FileInput() {
        var _data;
        Object.defineProperty(this, 'data', {
            get: function () {
                return _data;
            }
            ,
            set: function (v) {
                _data = v;
                this.onload(_data);
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
                    case "type": this.type = value;
                    break;
                }
            }
        }
    }
    FileInput.TYPE = {
        ARRAYBUFFER: 0, DATAURL: 1, TEXT: 2, FILE:3
    }
    ;
    
    FileInput.prototype.accept = "";
    FileInput.prototype.dragndrop_hoverclass = "";
    FileInput.prototype.type=FileInput.TYPE.ARRAYBUFFER;
    
    function accepted(accept,file) {
        if (accept.trim()!="") {
            var accept_mime = accept.split(",").filter(function (a) {
                var acc = a.trim();
                return !(acc[0]==".")
            }).map(function (a) { 
                var acc = a.trim();
                return new RegExp(a.trim().replace('*',"\\S*"));
            });
            var accept_ext = accept.split(",").filter(function (a) {
                var acc = a.trim();
                return (acc[0]==".")
            }).map(function (a) { 
                var acc = a.trim();
                return new RegExp(a.trim().replace('*',"\\S*"));
            });
            var i,len;
            for (i=0,len=accept_mime.length;i<len;i++) {
                if (accept_mime[i].test(file.type)) {
                    return true;   
                }
            }
            for (i=0,len=accept_ext.length;i<len;i++) {
                if (accept_ext[i].test(file.name)) {
                    return true;
                }
            }
        }else{
            return true;
        }
    }
    
    function readFile(file) {
        var fileInputObj  = this;
        if (file != undefined) {
            var reader = new FileReader();
            reader.onload = function (event) {
                fileInputObj.data = event.target.result;
            }
            ;
            if (accepted(this.accept,file)) {
                switch (this.type) {
                    case FileInput.TYPE.ARRAYBUFFER: reader.readAsArrayBuffer(file);
                    break;
                    case FileInput.TYPE.DATAURL: reader.readAsDataURL(file);
                    break;
                    case FileInput.TYPE.TEXT: reader.readAsText(file);
                    break;
                    case FileInput.TYPE.FILE: fileInputObj.data = file;
                    break;
                    default: throw new FileInputException("Unknown type: "+this.type);
                }
            }else{
                throw new FileInputException("Loaded file is not acceptable");
            }
        }
    }
    FileInput.prototype.createFileUpload = function (element) {
        var fileInputObj = this;
        element.type = "file";
        element.onchange = function (e) {
            try {
                e.stopPropagation();
                e.preventDefault();
                var file = e.target.files[0];
                readFile.call(fileInputObj, file);
                return false;
            }
            catch (e) {
                fileInputObj.onerror.call(fileInputObj,e);
            }
        }
        ;
    }
    ;
    FileInput.prototype.createDragDrop = function (element,hoverclass) {
        if (hoverclass == undefined) {
            hoverclass = "";
        }
        var fileInputObj = this;
        element.draggable = false;
        element.ondragover = function (e) {
            this.classList.add(hoverclass);
            e.preventDefault();
            return false;
        }
        ;
        element.ondragleave = element.ondragend = function (e) {
            this.classList.remove(hoverclass);
		    return false;
        }
        ;
        element.ondrop = function (e) {
            try {
                this.classList.remove(hoverclass);
                e.preventDefault();
                var file = e.dataTransfer.files[0];
                readFile.call(fileInputObj, file);
                return false;
            }
            catch (e) {
                fileInputObj.onerror.call(fileInputObj,e);
            }
        }
        ;
    }
    ;

    FileInput.prototype.onload = function () {};
    FileInput.prototype.onerror = function () {};
    
    FileInput.prototype.data = null;
    return FileInput;
}
)();
