{
const progress = document.getElementById( "progress" );
const timer = document.getElementById( "timer" );
const gallery = document.getElementById('carelist');
const preloader = document.querySelector('.preloader');
const fadeEffect = setInterval(() => {
  // if we don't set opacity 1 in CSS, then
  // it will be equaled to "" -- that's why
  // we check it, and if so, set opacity to 1
  if (!preloader.style.opacity) {
    preloader.style.opacity = 1;
	preloader.style.zIndex = 9999;
	preloader.style.display = "flex";
  }
  if (preloader.style.opacity > 0) {
    if ( progress.value != 0 ) { preloader.style.opacity = 1 - (progress.value/100); } 
  } else {
    //clearInterval(fadeEffect);
	preloader.style.zIndex = 0;
	if ( preloader.style.opacity == 0 ) { preloader.style.display = "none"; }	
  }
}, 100);

//document.window.addEventListener('load', fadeEffect);

const state = {};
const carouselList = document.querySelector('.carousel__list');
var carouselItems = document.querySelectorAll('.carousel__item');	
var elems = Array.from(carouselItems);

carouselList.addEventListener('click', function (event) {
  var carouselItems = document.querySelectorAll('.carousel__item');	
  var newActive = event.target;
  if (event.target instanceof HTMLVideoElement) { var isItem = newActive.closest('.carousel__item'); video = isItem; }
  if (event.target instanceof HTMLLIElement) { var isItem = newActive.closest('.carousel__item'); }
  
  if (!isItem || newActive.classList.contains('carousel__item_active')) {
    return;
  };
  update(newActive);
});

carouselList.addEventListener('focusout', function (event) {
  var carouselItems = document.querySelectorAll('.carousel__item');	
  var newActive = event.target; 
  if (event.target instanceof HTMLVideoElement) { var isItem = newActive.closest('.carousel__item'); isItem.pause(); video = isItem; }
  if (event.target instanceof HTMLLIElement) { var isItem = newActive.closest('.carousel__item'); }
  //alert(newActive);
  if (!isItem || newActive.classList.contains('carousel__item_active')) {
    return;
  };
  update(newActive);
});

const update = function(newActive) {
  var carouselItems = document.querySelectorAll('.carousel__item');		
  var elems = Array.from(carouselItems);
  const newActivePos = newActive.getAttribute("data-pos");

  const current = elems.find((elem) => elem.dataset.pos == 0);
  const prev2 = elems.find((elem) => elem.dataset.pos == -2);
  const prev = elems.find((elem) => elem.dataset.pos == -1);
  const next = elems.find((elem) => elem.dataset.pos == 1);
  const next2 = elems.find((elem) => elem.dataset.pos == 2);  
  const first = elems.find((elem) => elem.dataset.pos == -3);
  const last = elems.find((elem) => elem.dataset.pos == 3);
  
  current.classList.remove('carousel__item_active');
  
  [current, prev2, prev, next, next2, first, last].forEach(item => {
    var itemPos = item.dataset.pos;
    item.dataset.pos = getPos(itemPos, newActivePos)
  });
};

const getPos = function (current, active) {
  const diff = current - active;

  if (Math.abs(current - active) > 3) {
    return -current
  }

  return diff;
}

// Queue
var queCount = -1;
var queue = new createjs.LoadQueue();
    queue.on("fileload", handleFileComplete);
    queue.on('progress', event => {
	
	progress.value = Math.floor(event.progress * 100);
        if (progress == 100) {
            console.log('all done');
            document.querySelector('body').style.background = 'white'
        }
    })
    queue.on('complete', event => {
        //gallery.classList.add('fadeIn');
		
		// Get all the video tags on the page.
		var videoTags = document.querySelectorAll('video');

		for (var i = 0; i < videoTags.length; i++) {
			//var loadItem = new createjs.LoadItem();
			//loadItem.src = videoTags[i].src;
			//queue.add(loadItem);
		}
		//update();
    })
	
	var manifest = [
     {id: 'video-1', type: 'video', src: 'https://arweave.net/HzfotuZiaicL5exRgCuY6ng8yvAxnVIC8iJ3qjTc6Ak'},
	 {id: 'video-2', type: 'video', src: 'https://arweave.net/RQ9gKYho9LgGdvX1E2fmGuYbJTATvvoLGNvcxfKCNyI'},
	 {id: 'video-3', type: 'video', src: 'https://arweave.net/qpdxrqENBncf9NMjhYU1JlsK_gsem6a6G7wBrS4gblY'},
	 {id: 'video-4', type: 'video', src: 'https://arweave.net/_vBe7KFihqoGSC0mAXypa0F1jO6wfSPNYmDC0ksTOdo'},
	 {id: 'video-5', type: 'video', src: 'https://arweave.net/lB5SuUGQS6O9PRbZBs6jGz9UrJEOOrprq0fwsFMzZ6Y'},
	 {id: 'video-6', type: 'video', src: 'https://arweave.net/M5NnmnJKLATdZPCkjFK3EjeI30iL0abIlY4uGRi0AGk'},
	 {id: 'video-7', type: 'video', src: 'https://arweave.net/Eifyg3C6YYLN9nStpBww_gOOYMMy-kvhIdQ3AHk06JY'}
	];
	
	var manifest2 = [
    'video-1',
	'video-2',
	'video-3',
	'video-4',
	'video-5',
	'video-6',
	'video-7'
	];
	
    queue.loadManifest(manifest);	
	
    //queue.loadFile({src:"https://arweave.net/HzfotuZiaicL5exRgCuY6ng8yvAxnVIC8iJ3qjTc6Ak", type:createjs.Types.VIDEO});
	//queue.loadFile({src:"https://arweave.net/RQ9gKYho9LgGdvX1E2fmGuYbJTATvvoLGNvcxfKCNyI", type:createjs.Types.VIDEO});
	//queue.loadFile({src:"https://arweave.net/qpdxrqENBncf9NMjhYU1JlsK_gsem6a6G7wBrS4gblY", type:createjs.Types.VIDEO});
	//queue.loadFile({src:"https://arweave.net/_vBe7KFihqoGSC0mAXypa0F1jO6wfSPNYmDC0ksTOdo", type:createjs.Types.VIDEO});
	//queue.loadFile({src:"https://arweave.net/lB5SuUGQS6O9PRbZBs6jGz9UrJEOOrprq0fwsFMzZ6Y", type:createjs.Types.VIDEO});
	//queue.loadFile({src:"https://arweave.net/M5NnmnJKLATdZPCkjFK3EjeI30iL0abIlY4uGRi0AGk", type:createjs.Types.VIDEO});
	//queue.loadFile({src:"https://arweave.net/Eifyg3C6YYLN9nStpBww_gOOYMMy-kvhIdQ3AHk06JY", type:createjs.Types.VIDEO});	
	//queue.loadFile('https://arweave.net/HzfotuZiaicL5exRgCuY6ng8yvAxnVIC8iJ3qjTc6Ak');
    //queue.loadFile('https://arweave.net/RQ9gKYho9LgGdvX1E2fmGuYbJTATvvoLGNvcxfKCNyI"');
    //queue.loadFile('https://arweave.net/qpdxrqENBncf9NMjhYU1JlsK_gsem6a6G7wBrS4gblY');
    //queue.loadFile('https://arweave.net/_vBe7KFihqoGSC0mAXypa0F1jO6wfSPNYmDC0ksTOdo');
	//queue.loadFile('https://arweave.net/lB5SuUGQS6O9PRbZBs6jGz9UrJEOOrprq0fwsFMzZ6Y');
    //queue.loadFile('https://arweave.net/M5NnmnJKLATdZPCkjFK3EjeI30iL0abIlY4uGRi0AGk');
	//queue.loadFile('https://arweave.net/Eifyg3C6YYLN9nStpBww_gOOYMMy-kvhIdQ3AHk06JY');	

    function handleFileComplete(event) {
	 queCount++;
	 if (queCount > 3) { var newCount = 3 - queCount; } else { var newCount = queCount; }
     var item = event.item; // A reference to the item that was passed in to the LoadQueue
     var type = item.type;
     // Add any videos to the page body.
     if (type == createjs.Types.VIDEO) {
		var finalver = event.result;	
		//gallery.append(finalver); 
		//gallery.getElementsByTagName("video")[queCount].setAttribute("controls", "controls");
		//gallery.getElementsByTagName("video")[queCount].setAttribute("class", "carousel__item");
		//gallery.getElementsByTagName("video")[queCount].setAttribute("data-pos", newCount );
     }

    }

}