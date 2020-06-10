// console.log('Capture Your Image');
// The buttons to start & stop stream and to capture the image
var btnStart = document.getElementById( "btn-start" );
var btnStop = document.getElementById( "btn-stop" );
var btnCapture = document.getElementById( "btn-capture" );
var btnTryAgain = document.getElementById( "btn-try-again" );
var Video_Showing_Container = document.getElementById( "Video_Showing_Container" );
var Image_Showing_Container = document.getElementById( "Image_Showing_Container" );
var Image_Download_Link = document.getElementById( "download" );

// The stream & capture
var stream = document.getElementById( "stream" );
var capture = document.getElementById( "capture" );
var snapshot = document.getElementById( "snapshot" );


// The video stream
var cameraStream = null;

// Attach listeners
btnStart.addEventListener( "click", startStreaming );

// Start Streaming
function startStreaming() {

	var mediaSupport = 'mediaDevices' in navigator;

	if( mediaSupport && null == cameraStream ) {

		navigator.mediaDevices.getUserMedia( { video: true } )
		.then( function( mediaStream ) {

			cameraStream = mediaStream;

			stream.srcObject = mediaStream;

			stream.play();
		})
		.catch( function( err ) {

			console.log( "Unable to access camera: " + err );
		});
	}
	else {

		alert( 'Your browser does not support media devices.' );

		return;
    }

    // This is for Showing Stop Steaming Button
    btnStart.classList.add('btn_start_Hide');
    btnStop.classList.remove('btn_stop_Hide');
}


// Stop Streaming
btnStop.addEventListener( "click", stopStreaming );

function stopStreaming() {

	if( null != cameraStream ) {

		var track = cameraStream.getTracks()[ 0 ];

		track.stop();
		stream.load();

		cameraStream = null;
    }

    // This is for Hidin Stop Steaming Button
    btnStart.classList.remove('btn_start_Hide');
    btnStop.classList.add('btn_stop_Hide');
}

// Capturing Image
btnCapture.addEventListener( "click", captureSnapshot );

function captureSnapshot() {

	if( null != cameraStream ) {

		var ctx = capture.getContext( '2d' );
        var img = new Image();

		ctx.drawImage( stream, 0, 0, capture.width, capture.height );

		img.src		= capture.toDataURL( "image/png" );
        img.width	= 1080;
		img.height = 720;
		snapshot.innerHTML = '';
		snapshot.appendChild( img );
		
		// capture.toBlob(function(blob) {
		// 	saveAs(blob, "pretty image.png");
		// });
		let downLink = document.getElementById("capture").toDataURL("image/png").replace("image/png", "image/octet-stream");
		console.log(downLink);


	}else{
        alert('Your SnapShot does not work Properly.')
    }

    // This is for Showing Try Again Button
    btnCapture.classList.add('btn_capture_Hide');
	btnTryAgain.classList.remove('btn_try_again_Hide');
	Video_Showing_Container.classList.add('VideoStreaming_Section_Hide')
	Image_Showing_Container.classList.remove('Image_Previe_List_Hide')
	Image_Download_Link.classList.remove('button_hide')
}


// Try again Capture Your Image
btnTryAgain.addEventListener('click', captureTryAgain);
function captureTryAgain(){
    // This is for Showing Try Again Button
    btnCapture.classList.remove('btn_capture_Hide');
    btnTryAgain.classList.add('btn_try_again_Hide');
	Video_Showing_Container.classList.remove('VideoStreaming_Section_Hide')
	Image_Showing_Container.classList.add('Image_Previe_List_Hide')
	Image_Download_Link.classList.add('button_hide')
}

Image_Download_Link.addEventListener('click', download);
function download(){
	var download = document.getElementById("download");
	var image = document.getElementById("capture").toDataURL("image/png")
				.replace("image/png", "image/octet-stream");
	download.setAttribute("href", image);

}



