var zoneCut = new Croppie(document.querySelector("#zoneCut"), {
	enableExif: true,
    viewport: {
        width: 200,
        height: 200
    },
    boundary: {
    	width: 300,
    	height: 300
    }
});
/* imagen inicial*/
zoneCut.bind({
    url: 'assets/images/test.jpg',
    zoom: 0
});
document.querySelector("#getResult").addEventListener('click',function(){
	zoneCut.result({
		type:'base64',
		size:'viewport',
		quality:1,
		format:'jpeg'
	}).then(function(base64){
		console.log('entra al result');
		var img = document.createElement('img');
		img.src =  base64;
		document.querySelector('#zoneResult').append(img);
	});
});

document.querySelector('#getImage').addEventListener('change',function(){
	readFile(this);
})

function readFile(input){
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.readAsBinaryString(input.files[0]);
		//reader.readAsDataURL(input.files[0]);
		reader.onload = function(e) {
		  if (reader.result) reader.content = reader.result;
		  var base64Data = btoa(reader.content);
		  zoneCut.bind({
		  	url: 'data:image/jpeg;base64,'+base64Data
		  });
		}
	}
}
//extend FileReader for IE
if (!FileReader.prototype.readAsBinaryString) {
    FileReader.prototype.readAsBinaryString = function (fileData) {
       var binary = "";
       var pt = this;
       var reader = new FileReader();
       reader.onload = function (e) {
           var bytes = new Uint8Array(reader.result);
           var length = bytes.byteLength;
           for (var i = 0; i < length; i++) {
               binary += String.fromCharCode(bytes[i]);
           }
        //pt.result  - readonly so assign binary
        pt.content = binary;
        $(pt).trigger('onload');
    }
    reader.readAsArrayBuffer(fileData);
    }
}
