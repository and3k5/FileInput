describe("FileInput", function() {
    describe("Constructor arguments", function() {
        var fileinput,
            accept = "image/jpeg",
            dragndrop_hoverclass = ".hover",
            type = FileInput.TYPE.TEXT,

            div = document.createElement("div"),
            input = document.createElement("input"),

            onload = new Function("return 0;"),
            onerror = new Function("return 1;");

        var options = {
            accept: accept,
            dragndrop_hoverclass: dragndrop_hoverclass,
            type: type,

            dragndrop: div,
            fileupload: input,

            onload: onload,
            onerror: onerror
        };

        fileinput = new FileInput(options);

        it("accept", function() {
            expect(fileinput.accept).toBe(accept);
        });

        it("dragndrop_hoverclass", function() {
            expect(fileinput.dragndrop_hoverclass).toBe(dragndrop_hoverclass);
        });
        
        it("type", function() {
            expect(fileinput.type).toBe(type);
        });

        it("dragndrop", function() {
            expect(div.draggable).toBe(false);
            expect(div.ondragover).not.toBe(null);
            expect(div.ondragleave).not.toBe(null);
            expect(div.ondrop).not.toBe(null);
        });

        it("fileupload", function() {
            expect(input.type).toBe("file");
        });
    });

    it("can create FileUpload", function() {
        var fileinput = new FileInput();
        var input = document.createElement("input");

        fileinput.createFileUpload(input);

        expect(input.type).toBe("file");
    });

    it("can create drag n drop area", function() {
        var fileinput = new FileInput();
        var div = document.createElement("div");

        fileinput.createDragDrop(div);

        expect(div.draggable).toBe(false);
        expect(div.ondragover).not.toBe(null);
        expect(div.ondragleave).not.toBe(null);
        expect(div.ondrop).not.toBe(null);
    });
    
    describe("accept",function () {
        it("throws an error if file isn't included in accept",function () {
            var fileinput = new FileInput({accept:"image/jpeg",type:FileInput.TYPE.FILE});
            
            var textfile = new Blob(["Hello World"],{type:"text/plain"});
            var imagefile = new Blob(["Hello World"],{type:"image/jpeg"});
            
            var fileupload = document.createElement("input");
            fileupload.type="file";
            
            fileinput.createFileUpload(fileupload);
            fileinput.onerror = function (err) {
                throw err;
            }
            
            expect(function () {
                fileupload.onchange.call(null,{stopPropagation:function() {},preventDefault:function () {},target:{files:[textfile]}} );
            }).toThrow();
            
            expect(function () {
                fileupload.onchange.call(null,{stopPropagation:function() {},preventDefault:function () {},target:{files:[imagefile]}} );
            }).not.toThrow();
        });
        
    });
});
