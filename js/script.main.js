//main video playback

$(document).ready(function(){

  var mainVideo = $('video');
  var videoOriginalWidth = 854;
  var videoOriginalHeight = 480;

  // re-scale image when viewport resizes
	$(window).resize(function(){

		// get the parent element size
		var containerWidth = mainVideo.parent().width();
		var containerHeight = mainVideo.parent().height();

		// use largest scale factor of horizontal/vertical
		var scaleWidth = containerWidth / videoOriginalWidth;
		var scaleHeight = containerHeight / videoOriginalHeight;
		var scale = scaleWidth > scaleHeight ? scaleWidth : scaleHeight;

		// scale the video
		mainVideo.width(scale * videoOriginalWidth);
		mainVideo.height(scale * videoOriginalHeight);

	});

  // trigger re-scale on pageload
	$(window).trigger('resize');
});




//
// function displayCalendar(){
 
 
//  var htmlContent ="";
//  var FebNumberOfDays ="";
//  var counter = 1;
 
 
//  var dateNow = new Date();
//  var month = dateNow.getMonth();

//  var nextMonth = month+1; //+1; //Used to match up the current month with the correct start date.
//  var prevMonth = month -1;
//  var day = dateNow.getDate();
//  var year = dateNow.getFullYear();
 
 
//  //Determing if February (28,or 29)  
//  if (month == 1){
//     if ( (year%100!=0) && (year%4==0) || (year%400==0)){
//       FebNumberOfDays = 29;
//     }else{
//       FebNumberOfDays = 28;
//     }
//  }
 
 
//  // names of months and week days.
//  var monthNames = ["January","February","March","April","May","June","July","August","September","October","November", "December"];
//  var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday", "Saturday"];
//  var dayPerMonth = ["31", ""+FebNumberOfDays+"","31","30","31","30","31","31","30","31","30","31"]
 
 
//  // days in previous month and next one , and day of week.
//  var nextDate = new Date(nextMonth +' 1 ,'+year);
//  var weekdays= nextDate.getDay();
//  var weekdays2 = weekdays
//  var numOfDays = dayPerMonth[month];
     
 
 
 
//  // this leave a white space for days of pervious month.
//  while (weekdays>0){
//     htmlContent += "<td class='monthPre'></td>";
 
//  // used in next loop.
//      weekdays--;
//  }
 
//  // loop to build the calander body.
//  while (counter <= numOfDays){
 
//      // When to start new line.
//     if (weekdays2 > 6){
//         weekdays2 = 0;
//         htmlContent += "</tr><tr>";
//     }
 
 
 
//     // if counter is current day.
//     // highlight current day using the CSS defined in header.
//     if (counter == day){
//         htmlContent +="<td class='dayNow'  onMouseOver='this.style.background=\"#FF0000\"; this.style.color=\"#FFFFFF\"' "+
//         "onMouseOut='this.style.background=\"#FFFFFF\"; this.style.color=\"#00FF00\"'>"+counter+"</td>";
//     }else{
//         htmlContent +="<td class='monthNow' onMouseOver='this.style.background=\"#FF0000\"'"+
//         " onMouseOut='this.style.background=\"#FFFFFF\"'>"+counter+"</td>";    
 
//     }
    
//     weekdays2++;
//     counter++;
//  }
 
 
 
//  // building the calendar html body.
//  var calendarBody = "<table class='calendar'> <tr class='monthNow'><th colspan='7'>"
//  +monthNames[month]+" "+ year +"</th></tr>";
//  calendarBody +="<tr class='dayNames'>  <td>Sun</td>  <td>Mon</td> <td>Tues</td>"+
//  "<td>Wed</td> <td>Thurs</td> <td>Fri</td> <td>Sat</td> </tr>";
//  calendarBody += "<tr>";
//  calendarBody += htmlContent;
//  calendarBody += "</tr></table>";
//  // set the content of div .
//  document.querySelector(".info-block__calendar").innerHTML=calendarBody;
 
// }

// calendarBtn.addEventListener("click", displayCalendar());
//booking block

var bookingBtn = document.querySelector("#booking__btn"),
    bookingModalBlock = document.querySelector(".header-wrapper__booking-section"),
    bookingModal = document.querySelector("#booking-section__modal"),
    closeBookingModalBtn = document.querySelector(".booking-section__close-btn"),
    submitBookingBtn = document.querySelector("#submit-booking"),
    continueBookingBtn = document.querySelector("#continue-booking"),
    bookingResult = document.querySelector(".info-block__result"),
    selectPeopleAmount = document.querySelector("#info-block__people-amount"),
    selectTime = document.querySelector("#info-block__select-time");
    tables = document.querySelector(".table-block__table-scheme"),
    alertMessagePeople = document.querySelector(".booking__alert-message_people"),
    alertMessageDate = document.querySelector(".booking__alert-message_date"),
    alertMessageTime = document.querySelector(".booking__alert-message_time"),
    alertMessageTable = document.querySelector(".booking__alert-message_table"),
    days = document.querySelector(".calendar__days"),
    keys = {37: 1, 38: 1, 39: 1, 40: 1};

function showBookingModal(){
    bookingModalBlock.classList.toggle("header-wrapper__booking-section_show");
    bookingBtn.classList.toggle("booking__btn_active");
    bookingModal.style.display = "block";
    disableScroll();
}

function closeBookingModal(){
    bookingModalBlock.classList.remove("header-wrapper__booking-section_show");
    bookingBtn.classList.remove("booking__btn_active");
    bookingModal.style.display = "none";
    enableScroll();
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == bookingModal) {
      closeBookingModal();
      closeProceedBookingModal();
    }
};

//obj for booking information

var orderInfo = {people: '', time: '', date: '',table:''};

function chooseTable(e) {
  var tablesChosen = [];
  var target = e.target;
  if (target.className == 'table-scheme__table-number') {
    var clickedItem = target.innerHTML;
    target.classList.add("table-chosen");
  } else {
    target.classList.remove("table-chosen");
  }

  //push number of table to array if it was selected

  if(!target.classList.contains("table-chosen")){
    orderInfo.table = '';
    continueBookingBtn.style.display = "none";
  } else {
    orderInfo.table = clickedItem;
  }
}


function chooseDate(e) {
  if (e.target !== e.currentTarget) {
    var chosenDate = e.target.innerHTML;
    var getMonth = document.querySelector("#calendar__month");
    orderInfo.date = getMonth.innerHTML +" "+ chosenDate;
    calendarBtn.innerHTML = orderInfo.date;
  }
}

function orderSubmition(){
  orderInfo.people = selectPeopleAmount.value;
  orderInfo.time = selectTime.value;
  var orderInfoSave = localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

  if(orderInfo.people === ''){
    alertMessagePeople.style.display = "block";
  } else {
    alertMessagePeople.style.display = "none";
  }

  if(orderInfo.time === ''){
    alertMessageTime.style.display = "block";
  } else {
    alertMessageTime.style.display = "none";
  }

  if(orderInfo.table === ''){
    alertMessageTable.style.display = "block";
  } else {
    alertMessageTable.style.display = "none";
  }


  if(calendarBtn.innerHTML === "Select date") {
    alertMessageDate.style.display = "block";
  } else {
    alertMessageDate.style.display = "none";
  }



  if (orderInfo.people !== '' && orderInfo.time !== '' && orderInfo.date !== '' && orderInfo.table !== ''){
    continueBookingBtn.style.display = "block";

  }
  calendarBlock.classList.remove("info-block__calendar_show");
}

bookingBtn.addEventListener("click", showBookingModal);
submitBookingBtn.addEventListener("click", orderSubmition);
tables.addEventListener("click", chooseTable);
closeBookingModalBtn.addEventListener("click", closeBookingModal);
days.addEventListener("click", chooseDate);



//booking calendar

var calendarBtn = document.querySelector("#info-block__date-btn"),
    calendarBlock = document.querySelector(".info-block__calendar");
console.log(days);

function showCalendar(){
  calendarBlock.classList.toggle("info-block__calendar_show");
}

calendarBtn.addEventListener("click", showCalendar);

//proceed booking

var proceedBookingBtn = document.querySelector("#continue-booking"),
    bookingInfoBlock = document.querySelector(".booking-section__info-block"),
    bookingTableBlock = document.querySelector(".booking-section__table-block"),
    bookingLoader = document.querySelector(".booking-loader"),
    proceedBookingModal = document.querySelector("#proceed-booking__modal"),
    proceedBookingCloseBtn = document.querySelector(".proceed-booking__close-btn");

function proceedBooking(){
  bookingModalBlock.classList.remove("header-wrapper__booking-section_show");
  setTimeout(showBookingLoader, 1);
  setTimeout(showProceedBookingModal, 3000);
  orderSubmition();
}

function showBookingLoader(){
  bookingLoader.style.display = "block";
}

function showProceedBookingModal(){
  bookingLoader.style.display = "none";
  proceedBookingModal.classList.add("proceed-booking__modal_show");
  
  // var orderInfoFromLs = localStorage.getItem("orderInfo");
// var orderInfoParse = JSON.parse(orderInfoFromLs);



for (var key in orderInfo){
    var li = document.createElement('li');
    li.classList.add("order-result__list-item");
    li.innerHTML += key + ":  " + orderInfo[key];
    orderResult.appendChild(li);
  }
}

function closeProceedBookingModal(){
  proceedBookingModal.classList.remove("proceed-booking__modal_show");
  bookingBtn.classList.remove("booking__btn_active");
  bookingModal.style.display = "none";
  orderResult.innerHTML = "";
}

proceedBookingBtn.addEventListener("click", proceedBooking);
proceedBookingCloseBtn.addEventListener("click", closeProceedBookingModal);

//personal info booking

var orderResult = document.querySelector(".your-booking__order-result");


//validate

var bookingNameField = document.querySelector("#proceed-booking__name-field"),
    bookingEmailField = document.querySelector("#proceed-booking__email-field"),
    bookingSubmitBtn = document.querySelector("#submit-booking__btn"),
    proceedBookingAlertMessages = document.querySelectorAll(".proceed-booking__alert-message");

function validateBookingSubmition(){
  //validate username
  if (!regexpUsername.test(bookingNameField.value)) {
    proceedBookingAlertMessages[0].classList.add("show-alert-message");
  } else {
    proceedBookingAlertMessages[0].classList.remove("show-alert-message");
  }

  //validate email
  if (!regexpEmail.test(bookingEmailField.value)) {
    proceedBookingAlertMessages[1].classList.add("show-alert-message");
  } else {
    proceedBookingAlertMessages[1].classList.remove("show-alert-message");
  }
}

function submitBooking(e){
  e.preventDefault();
  validateBookingSubmition();

  if(regexpUsername.test(bookingNameField.value) && regexpEmail.test(bookingEmailField.value)) {
    closeProceedBookingModal();
    showBookingConfirmation();  
  }
}

//show booking confirmation modal 
var bookingConfirmationModal = document.querySelector(".proceed-booking__confirm-modal");

function showBookingConfirmation(){
    bookingConfirmationModal.classList.add("proceed-booking__confirm-modal_animate-fading");
    setTimeout(hideBookingConfirmation, 8000);
}

function hideBookingConfirmation(){
  bookingConfirmationModal.classList.remove("proceed-booking__confirm-modal_animate-fading");
}

bookingSubmitBtn.addEventListener("click", submitBooking);



//disable scroll while booking modal

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}

//events block - filtering

var ourEvents = document.querySelector("#our-events"),
    filterAll = ourEvents.querySelector(".filter-all"),
    filterMenu = ourEvents.querySelector(".filter-menu"),
    filterMusic = ourEvents.querySelector(".filter-music"),
    events = ourEvents.querySelectorAll(".event-content__block"),
    menuEvents = ourEvents.querySelectorAll(".event-block__menu"),
    musicEvents = ourEvents.querySelectorAll(".event-block__music"),
    otherEvents = ourEvents.querySelectorAll(".event-block__other"),
    filterLink = ourEvents.querySelectorAll(".event-filter__link"),
    //events length
    menuEventsLen = menuEvents.length,
    musicEventsLen = musicEvents.length,
    otherEventsLen = otherEvents.length,
    allEventsLen = events.length;

function showMenuEvents(e){
  e.preventDefault();
  for (var i = 0; i < musicEventsLen; i++) {
    musicEvents[i].style.display = "none";
  }
  for (var j = 0; j < otherEventsLen; j++) {
    otherEvents[j].style.display = "none";
  }
  for (var k = 0; k < menuEventsLen; k++) {
    menuEvents[k].style.display = "block";
  }
  filterMenu.classList.add("event-filter__link_active");
  filterAll.classList.remove("event-filter__link_active");
  filterMusic.classList.remove("event-filter__link_active");
}

function showMusicEvents(e){
  e.preventDefault();
  for (var i = 0; i < menuEventsLen; i++) {
    menuEvents[i].style.display = "none";
  }
  for (var j = 0; j < otherEventsLen; j++) {
    otherEvents[j].style.display = "none";
  }
  for (var k = 0; k < musicEventsLen; k++) {
    musicEvents[k].style.display = "block";
  }
  filterMenu.classList.remove("event-filter__link_active");
  filterAll.classList.remove("event-filter__link_active");
  filterMusic.classList.add("event-filter__link_active");
}

function showAllEvents(e){
  e.preventDefault();
  for (var i = 0; i < allEventsLen; i++) {
    events[i].style.display = "block";
  }
  filterMenu.classList.remove("event-filter__link_active");
  filterAll.classList.add("event-filter__link_active");
  filterMusic.classList.remove("event-filter__link_active");
}

filterMenu.addEventListener("click", showMenuEvents);

filterMusic.addEventListener("click", showMusicEvents);

filterAll.addEventListener("click", showAllEvents);

//google map init

function initMap() {
  var mySpot = {lat: 50.44004, lng: 30.5105};
  var map = new google.maps.Map(document.getElementById('contacts-block__google-map'), {
    zoom: 15,
    scrollwheel: false,
    center: mySpot
  });
  var marker = new google.maps.Marker({
    position: mySpot,
    map: map
  });
}



//header carousel

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n){
	showSlides(slideIndex += n);
}



function showSlides(n){
	var i;
	var slides = document.querySelectorAll(".carousel__slide");
	var slidesLength = slides.length;
	if (n > slidesLength) {
		slideIndex = 1;
	} else if (n < 1) {
		slideIndex = slidesLength;
	}
	for (i = 0; i < slidesLength; i++){
		slides[i].style.display = "none";
	}
	slides[slideIndex - 1].style.display = "block";
}

var prevSlideBtn = document.querySelector(".carousel__pagination_prev");
var nextSlideBtn = document.querySelector(".carousel__pagination_next");

prevSlideBtn.addEventListener("click", function(e){
	e.preventDefault();
	plusSlides(-1);
});

nextSlideBtn.addEventListener("click", function(e){
	e.preventDefault();
	plusSlides(1);
});

// see:
// http://ejohn.org/blog/javascript-micro-templating/

// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('"+ str.replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'") + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();

/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});


/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();


//login

var loginNameField = document.querySelector("#login__name-field"),
    loginPassField = document.querySelector("#login__pass-field"),
    loginBtn = document.querySelector("#login__btn"),
    loggedUserBlock = document.querySelector(".header-wrapper__logged-user-section"),
    loggedUserGreetings = document.querySelector(".logged-user__greetings"),
    allLoginInputs = document.querySelectorAll(".login-form__wrapper > input"),
    loginAlertMessages = document.querySelectorAll(".login__alert-message"),
    allLoginInputsLen = allLoginInputs.length;

//login user

var loggedUser = localStorage.getItem("signedupUser"); //!!!GET THE RIGHT ITEM FROM localStorage
  var parseUserInfo = JSON.parse(loggedUser);
  console.log(loggedUser);

function loginUser(e){
  e.preventDefault();
  

  if (loginNameField.value !== parseUserInfo.name) {
    loginAlertMessages[0].classList.add("show-alert-message");
  } else {
    loginAlertMessages[0].classList.remove("show-alert-message");
  }

  if (loginPassField.value !== parseUserInfo.password) {
    loginAlertMessages[1].classList.add("show-alert-message");
  } else {
    loginAlertMessages[1].classList.remove("show-alert-message");
  }

  if(loginNameField.value === parseUserInfo.name && loginPassField.value === parseUserInfo.password) {
    alert("Welcome, "+ loginNameField.value);
    loggedUserGreetings.innerHTML = "hi, "+ loginNameField.value;
    loggedUserBlock.classList.add("header-wrapper__logged-user-section_show");
    clearLoginInputs();
    clearSignupInputs();
    closeJoinUsModal();
  } 

}

function clearLoginInputs(){
  for (var i = 0; i < allLoginInputsLen; i++){
    allLoginInputs[i].value = "";
  }
}


loginBtn.addEventListener("click", loginUser);


//logged user info block

var loggedUserName = document.querySelector(".logged-user-modal__username"),
    loggedUserEmail = document.querySelector(".logged-user-modal__email"),
    loggedUserModal = document.querySelector(".header-wrapper__logged-user-modal");

function showLoggedUserInfo(){
    loggedUserModal.classList.toggle("header-wrapper__logged-user-modal_show");
    loggedUserName.innerHTML = parseUserInfo.name;
    loggedUserEmail.innerHTML = parseUserInfo.email;
}

loggedUserBlock.addEventListener("click", showLoggedUserInfo);

//logout

var logoutBtn = document.querySelector("#logout-btn");

function logoutUser(e){
  e.preventDefault();
  loggedUserBlock.classList.remove("header-wrapper__logged-user-section_show");
  loggedUserModal.classList.remove("header-wrapper__logged-user-modal_show");
}

logoutBtn.addEventListener("click", logoutUser);
//menu-filter via Resig

// example

  // var test = {
  //   members:[
  //   {id:1, name:"hoge", text:"aaaaaaaaaaaaaa"},
  //   {id:9, name:"fuga", text:"bbbbbbbbbbbbbb"},
  //   {id:15, name:"hoge", text:"cccccccccccccc"},
  //   {id:22, name:"fuga", text:"dddddddddddddd"},
  //   {id:78, name:"hoge", text:"eeeeeeeeeeeeee"},
  //   {id:876, name:"fuga", text:"ffffffffffffff"},
  //   {id:1033, name:"hoge", text:"gggggggggggggg"},
  //   {id:7899, name:"fuga", text:"hhhhhhhhhhhhhh"}
  //   ]
  // }; // -> End of dataObject

  // var results = document.getElementById("food-wrapper__result");
  // results.innerHTML = tmpl("item_tmpl", test);



  var fullOnlineMenu = [
    {name: 'Italian Ice-cream', desc: 'Vanilla, Coffee, Chocolate flavours available', price: '35', classCategory: 'food-result__dessert', rating: 5},
    {name: 'Crostata di Marmellata', desc: 'Home made jam orange tarte', price: '110', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_crostata', rating: 4},
    {name: 'Semifreddo al Caramello', desc: 'Vanilla, Coffee, Chocolate flavours available', price: '130', classCategory: 'food-result__dessert', classPicture: 'ood-result__pic_semifreddo', rating: 4},
    {name: 'Red Wine (by glass)', desc: 'Some description of this tasty red wine', price: '55', classCategory: 'food-result__beverages food-result__beverages-alco', classPicture: 'food-result__pic_red-wine', rating: 5},
    {name: 'Americano', desc: 'Natural black Italian coffee', price: '50', classCategory: 'food-result__beverages food-result__beverages-non-alco', classPicture: 'food-result__pic_americano', rating: 5},
    {name: 'Spritz Royal', desc: 'Signature refreshing aperitif cocktail of Gin, White Vermouth, Aperol with a dash of Prosecco', price: '55', classCategory: 'food-result__beverages food-result__beverages-alco', classPicture: 'food-result__pic_spritz-royal', rating: 5},
    {name: 'Negroni', desc: 'A classic aperitif cocktail found in Treviso, Italy consists of Gin, Red Vermouth and Campari', price: '55', classCategory: 'food-result__beverages food-result__beverages-alco', classPicture: 'food-result__pic_negroni', rating: 5},
    {name: 'Margherita', desc: 'Tomato sauce, Mozzarella Cheese and Basil leaves', price: '120', classCategory: 'food-result__pizza', classPicture: 'food-result__pic_margherita', rating: 3},
    {name: 'Napoletana', desc: 'Tomato sauce, Mozzarella Cheese, Anchovies and Capers', price: '130', classCategory: 'food-result__pizza', classPicture: 'food-result__pic_napoletana', rating: 5},
    {name: 'Diavola', desc: 'Tomato sauce, Mozzarella Cheese and Spicy Salami', price: '160', classCategory: 'food-result__pizza', classPicture: 'food-result__pic_diavola', rating: 4},
    {name: 'Frittura mista di Pesce', desc: 'Deep fried Prawns, Anchovies, Squid and Zucchini', price: '75', classCategory: 'food-result__soup', classPicture: 'food-result__pic_frittura', rating: 5},
    {name: 'Verdure', desc: 'Rich custard base topped with a contrasting layer of hard caramel', price: '150', classCategory: 'food-result__pizza', classPicture: 'food-result__pic_verdure', rating: 5},
    {name: 'Lasagna', desc: 'Pasta Layers, Bolognese sauce, Ham, Parmesan and Mozzarella Cheese', price: '70', classCategory: 'food-result__pasta', classPicture: 'food-result__pic_lasagna', rating: 5},
    {name: 'Tortelli di Salsiccia', desc: 'Tuscan Hand-made Ravioli filled with Home-made Sausage in Meat sauce', price: '80', classCategory: 'food-result__pasta', classPicture: 'food-result__pic_tortelli', rating: 5},
    {name: 'Spaghetti ai Frutti di Mare', desc: 'Spaghetti with Prawns, Clams, Mussels &amp; Squid in Tomato sauce', price: '130', classCategory: 'food-result__pasta', classPicture: 'food-result__pic_spaghetti', rating: 5},
    {name: 'Farro di Mare', desc: 'Steamed Spelt with Squid,Prawns, Mussels &amp; Tomatoes, with Olive Oil, Lemon &amp; Parsley dressing served in a Parmesan Cheese Basket', price: '75', classCategory: 'food-result__soup', classPicture: 'food-result__pic_farro', rating: 5},
    {name: 'Minestrone di verdure', desc: 'Hearty Vegetable soup', price: '75', classCategory: 'food-result__soup', classPicture: 'food-result__pic_minestrone', rating: 5},
    {name: 'Zuppa di pesce', desc: 'Seafood soup with Prawns, Squids, Clams &amp; Mussels, served with toasted bread', price: '75', classCategory: 'food-result_soup', classPicture: 'food-result__pic_zuppa-di-pesce', rating: 5},
    {name: 'Italian Ice-cream Big', desc: 'Vanilla, Coffee, Chocolate flavours available', price: '55', classCategory: 'food-result__dessert', classPicture: '', rating: 4},
    {name: 'Italian Sorbet', desc: 'Orange, Coconut, Strawberry flavours available', price: '55', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_sorbet', rating: 2},
    {name: 'Panna Cotta', desc: 'Italian Custard Cream with Caramel', price: '70', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_panna-cotta', rating: 5},
    {name: 'Crème Brulee', desc: 'Rich custard base topped with a contrasting layer of hard caramel', price: '75', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_creme-brulee', rating: 5},
    {name: 'Tiramisu', desc: 'All-time favourite', price: '80', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_tiramisu', rating: 5},
    {name: 'Tortino caldo di cioccolato', desc: 'Melting chocolate cake', price: '95', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_tortino', rating: 3},
    {name: 'Il Castagnaccio', desc: 'Classic Chestnut Tuscan Dessert. A real classic back home', price: '100', classCategory: 'food-result__dessert', classPicture: 'food-result__pic_castagnaccio', rating: 5}
  ];

  localStorage.setItem("fullOnlineMenu", JSON.stringify(fullOnlineMenu));
  var onlineMenuData = localStorage.getItem("fullOnlineMenu");
  var onlineMenu = JSON.parse(onlineMenuData);

  //write to html via resig template
  
  var results = document.getElementById("food-wrapper__result");
  results.innerHTML = tmpl("mypage", {data: onlineMenu});
    

"use strict";

//menu filtering

var closeFoodOnlineBtn = document.querySelector(".hide-online-menu-btn"),
    buyFoodOnline = document.querySelector(".our-online-menu"),
    buyFoodSidebar = document.querySelector(".buy-food-online__sidebar"),
    allCards = document.querySelectorAll(".food-result"),
    allCardsLen = allCards.length;
    allInputs = document.querySelectorAll(".food-filter"),
    allInputsLen = allInputs.length;
    filterForm = document.querySelector(".buy-food-online__form"),
    inputSoup = document.querySelector("#soup-appetizer"),
    inputPasta = document.querySelector("#pasta"),
    inputDesserts = document.querySelector("#dessert"),
    inputPizza = document.querySelector("#pizza"),
    inputBeverages = document.querySelector("#beverages");
    inputBeveragesAlco = document.querySelector("#alco"),
    inputBeveragesNonAlco = document.querySelector("#non-alco"),
    allInputCategory = document.querySelectorAll(".food-filter"),
    allRadioBeverages = document.querySelector(".food-filter-radio"),
    allFood = [],
    clearAllFiltersBtn = document.querySelector("#clear-filter-btn");

//open-close block

function closeFoodOnlineBlock(){
    buyFoodOnline.classList.toggle("our-online-menu__hide");
    closeFoodOnlineBtn.classList.toggle("hide-online-menu-btn__animate");
}

closeFoodOnlineBtn.addEventListener("click", closeFoodOnlineBlock);

//push all cards to array

for(var i = 0; i < allCardsLen; i++){
    allFood.push(allCards[i]);
}


//clear all filters

function clearAllFilters(){

  for(var i = 0; i < allCardsLen; i++){
    allCards[i].style.display = "block";
  }

  for (var j = 0; j < allInputsLen; j++){
    allInputs[j].checked = false;
  }
  inputBeveragesAlco.disabled = false;
  inputBeveragesNonAlco.disabled = false;
  searchFoodInput.value = '';
}

//filter soups

function showAllSoups(){

  var filterSoup; 

  if(inputSoup.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterSoup = allFood.filter(function(food){
        return food.className.substring(12) === "food-result__soup";
    })

    var filterSoupLen = filterSoup.length;

    for(var k = 0; k < filterSoupLen; k++){
        filterSoup[k].style.display = "block";
    }
  }
}


//filter pasta

function showAllPasta(){

  var filterPasta;

  if(inputPasta.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterPasta = allFood.filter(function(food){
        return food.className.substring(12) === "food-result__pasta";
    })

    var filterPastaLen = filterPasta.length;

    for(var k = 0; k < filterPastaLen; k++){
        filterPasta[k].style.display = "block";
    }
    
  }
}

//filter pizza

 function showAllPizza(){

  var filterPizza;

  if(inputPizza.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterPizza = allFood.filter(function(food){
        return food.className.substring(12) === "food-result__pizza";
    })

    var filterPizzaLen = filterPizza.length;

    for(var k = 0; k < filterPizzaLen; k++){
        filterPizza[k].style.display = "block";
    }
  }
}

//filter desserts

 function showAllDesserts(){

  var filterDesserts;

  if(inputDesserts.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterDesserts = allFood.filter(function(food){
        return food.className.substring(12) === "food-result__dessert";
    })

    var filterDessertsLen = filterDesserts.length;

    for(var k = 0; k < filterDessertsLen; k++){
        filterDesserts[k].style.display = "block";
    }
    
  }
}

//filter beverages

 function showAllBeverages(){

  var filterBeverages;
  
  if(inputBeverages.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterBeverages = allFood.filter(function(food){
        return food.className.substring(12, 34) === "food-result__beverages";
    })

    var filterBeveragesLen = filterBeverages.length;

    for(var k = 0; k < filterBeveragesLen; k++){
        filterBeverages[k].style.display = "block";
    }
    
  }
}

//filter by beverage type

//disable if some other categories selected

function disableBeveragesInputs(){
  if(inputDesserts.checked == true || inputSoup.checked == true || inputPizza.checked == true || inputPasta.checked == true){
    inputBeveragesAlco.disabled = true;
    inputBeveragesNonAlco.disabled = true;
  } else if (inputBeverages.checked == true){
    inputBeveragesAlco.disabled = false;
    inputBeveragesNonAlco.disabled = false;
  }
}

//filter non-alco beverages

 function showNonAlcoBeverages(){

  var filterNonAlcoBeverages;

  if(inputBeveragesNonAlco.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterNonAlcoBeverages = allFood.filter(function(food){
        return food.className.substring(35, 67) === "food-result__beverages-non-alco";
    })

    var filterNonAlcoBeveragesLen = filterNonAlcoBeverages.length;

    for(var k = 0; k < filterNonAlcoBeveragesLen; k++){
        filterNonAlcoBeverages[k].style.display = "block";
    }
  }
}

//filter alco beverages

function showAlcoBeverages(){

  var filterAlcoBeverages;

  if(inputBeveragesAlco.checked = true){
    
    //hide all cards

    for(var i = 0; i < allCardsLen; i++){
      allCards[i].style.display = "none";
    }

    //get array of all soups cards

    filterAlcoBeverages = allFood.filter(function(food){
        return food.className.substring(35, 62) === "food-result__beverages-alco";
    })

    var filterAlcoBeveragesLen = filterAlcoBeverages.length;

    for(var k = 0; k < filterAlcoBeveragesLen; k++){
        filterAlcoBeverages[k].style.display = "block";
    }
  }
}

inputSoup.addEventListener("click", showAllSoups);
inputPasta.addEventListener("click", showAllPasta);
inputPizza.addEventListener("click", showAllPizza);
inputDesserts.addEventListener("click", showAllDesserts);
inputBeverages.addEventListener("click", showAllBeverages);
inputBeveragesNonAlco.addEventListener("click", showNonAlcoBeverages);
inputBeveragesAlco.addEventListener("click", showAlcoBeverages);

filterForm.addEventListener("change", disableBeveragesInputs);
//clear all filters

clearAllFiltersBtn.addEventListener("click", clearAllFilters);




// //menu pagination

// // var resultPage = $("<div class='food-result__page'></div>");
var resultPage = document.createElement("div");
resultPage.classList.add("food-result__page");

// function myPagination(){

//     var objContent = this;
//     //variables
//     var fullPages = [];
//     var subPages = [];
//     var height = 0;
//     var lastPage = 1;
//     var paginatePages;

//     //init

//     init = function(){
//         objContent.childNodes
//     }
// }


// (function($){
//     $.fn.extend({
//         MyPagination: function(options) {
//             var defaults = {
//                 height: 400,
//                 fadeSpeed: 400
//             };
//             var options = $.extend(defaults, options);

//             // Создаем ссылку на объект
//             var objContent = $(this);

//             // Внутренние переменные
//             var fullPages = new Array();
//             var subPages = new Array();
//             var height = 0;
//             var lastPage = 1;
//             var paginatePages;

//             // Функция инициализации
//             init = function() {
//                 objContent.children().each(function(i){
//                     if (height + this.clientHeight > options.height) {
//                         fullPages.push(subPages);
//                         subPages = new Array();
//                         height = 0;
//                     }

//                     height += this.clientHeight;
//                     subPages.push(this);
//                 });

//                 if (height > 0) {
//                     fullPages.push(subPages);
//                 }

//                 // Оборачиваем каждую полную страницу
//                 $(fullPages).wrap(resultPage);

//                 // Скрываем все обернутые страницы
//                 objContent.children().hide();

//                 // Создаем коллекцию для навигации
//                 paginatePages = objContent.children();

//                 // Показываем первую страницу
//                 showPage(lastPage);

//                 // Выводим элементы управления
//                 showPagination($(paginatePages).length);
//             };

//             // Функция обновления счетчика
//             updateCounter = function(i) {
//                 $('#page_number').html(i);
//             };

//             // Функция вывода страницы
//             showPage = function(page) {
//                 i = page - 1;
//                 if (paginatePages[i]) {

//                     // Скрываем старую страницу, показываем новую
//                     $(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
//                     lastPage = i;
//                     $(paginatePages[lastPage]).fadeIn(options.fadeSpeed);

//                     // и обновлем счетчик
//                     updateCounter(page);
//                 }
//             };


//             // Функция вывода навигации (выводим номера страниц)
//             showPagination = function(numPages) {
//                 var pagins = '';
//                 for (var i = 1; i <= numPages; i++) {
//                     pagins += '<li class="pagination__list-item"><a href="#" class="pagination__link" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
//                 }
//                 $('.pagination li:first-child').after(pagins);
//             };



//             // Выполняем инициализацию
//             init();

//             // Привязываем два события - нажатие на кнопке "Предыдущая страница"
//             $('.pagination #prev').click(function(e) {
//                 e.preventDefault();
//                 showPage(lastPage);
//             });
//             // и "Следующая страница"
//             $('.pagination #next').click(function(e) {
//                 e.preventDefault();
//                 showPage(lastPage+2);
//             });

//         }
//     });
// })(jQuery);


// // Инициализация
// jQuery(window).load(function() {
//     $('#food-wrapper__result').MyPagination({height: 2000, width: 800, fadeSpeed: 0});
// });



//search block

var searchFoodInput = document.querySelector("#search-block__search-field");


function searchFood() {
    var filter = searchFoodInput.value.toUpperCase();
    var foodResultPage = document.querySelectorAll("#food-wrapper__result");
    var foodCard = document.querySelectorAll(".food-result");
    var foodCardLen = foodCard.length;

    for (i = 0; i < foodCardLen; i++) {
        //search by name
        var foodName = foodCard[i].querySelector(".food-result__name");
        var foodDesc = foodCard[i].querySelector(".food-result__desc");
        var foodPrice = foodCard[i].querySelector(".food-result__price");
        if (foodName.innerHTML.toUpperCase().indexOf(filter) > -1 || foodPrice.innerHTML.toUpperCase().indexOf(filter) > -1
            || foodDesc.innerHTML.toUpperCase().indexOf(filter) > -1) {
            foodCard[i].style.display = "";
            foodResultPage[0].appendChild(foodCard[i]); 
        } else {
            foodCard[i].style.display = "none";
        }
    }

}

searchFoodInput.addEventListener("keyup", searchFood);

//menu sort

var sortBlock = document.querySelector("#sort-block__sorting"),
	container = document.querySelector(".food-wrapper__result"),
	contents = document.querySelectorAll(".food-result__price"),
	contentsLen = contents.length;
	rating = document.querySelectorAll(".food-result__rating"),
	ratingLen = rating.length,
	food = document.querySelector(".food-result"),
	listAscending = [],
	listDescending = [],
	listRating = [],
	listRandom = [];
	


function sortByPriceAscending() {

	for(var i = 0; i < contentsLen; i++){
	    listAscending.push(contents[i]);
	}

	listAscending.sort(function(a, b){
		var aa = parseInt(a.innerHTML.substring(1));
		var bb = parseInt(b.innerHTML.substring(1));
		return aa < bb ? -1 : (aa > bb ? 1 : 0);
	});

	listAscending.reverse();

	var listAscendingLen = listAscending.length;

	for(var k = 0; k < listAscendingLen; k++){
		container.insertBefore(listAscending[k].parentNode, container.firstChild);
	}
}


function sortByPriceDescending() {

	for(var i = 0; i < contentsLen; i++){
	    listDescending.push(contents[i]);
	}

	listDescending.sort(function(a, b){
		var aa = parseInt(a.innerHTML.substring(1));
		var bb = parseInt(b.innerHTML.substring(1));
		return aa < bb ? -1 : (aa > bb ? 1 : 0);
	});

	var listDescendingLen = listDescending.length;

	for(var k = 0; k < listDescendingLen; k++){
		container.insertBefore(listDescending[k].parentNode, container.firstChild);
	}
}

//sort by rating

function sortByRatingDescending() {

	for(var i = 0; i < ratingLen; i++){
	    listRating.push(rating[i]);
	}

	listRating.sort(function(a, b){
		var aa = parseInt(a.innerHTML);
		var bb = parseInt(b.innerHTML);
		return aa < bb ? -1 : (aa > bb ? 1 : 0);
	});

	var listRatingLen = listRating.length;

	for(var k = 0; k < listRatingLen; k++){
		container.insertBefore(listRating[k].parentNode.parentNode.parentNode, container.firstChild);
	}
}

//sort randomly

function sortRandomly(){
	for(var i = 0; i < contentsLen; i++){
	    listRandom.push(contents[i]);
	}

	listRandom.sort(function(){
	 	return 0.5 - Math.random();
	});

	var listRandomLen = listRandom.length;

	for(var k = 0; k < listRandomLen; k++){
		container.insertBefore(listRandom[k].parentNode, container.firstChild);
	}
}

sortBlock.addEventListener("change", function(){
	if (sortBlock.value === "sort-descending"){
		sortByPriceDescending();
	} else if (sortBlock.value === "sort-ascending") {
		sortByPriceAscending();

	} else if (sortBlock.value === "sort-by-rating") {
		sortByRatingDescending();
	} else if (sortBlock.value === "Select sorting") {
		sortRandomly();
	}
});

//mobile menu

var menuTop = document.querySelector(".menu-top"),
    burgerBtn = document.querySelector(".mobile-menu__burger");

function showMobileMenu(){
  menuTop.classList.toggle("menu-top__active");
  burgerBtn.classList.toggle("mobile-menu__burger_open");
}

burgerBtn.addEventListener("click", showMobileMenu);


//mobile open submenu
var menuItemMenu = document.querySelector("#menu-top__menu"),
    menuSubmenuMenu = document.querySelector("#menu-top__submenu-menu"),
    menuItemContacts = document.querySelector("#menu-top__contacts"),
    menuSubmenuContacts = document.querySelector("#menu-top__submenu-contacts"),
    submenuMenu = document.querySelectorAll(".mobile-menu__with-submenu")[0];
    submenuContacts = document.querySelectorAll(".mobile-menu__with-submenu")[1];


$(window).resize(function() {
  if ($(window).width() < 768) {
    menuItemMenu.addEventListener("click", function(e){
      e.preventDefault();
      menuSubmenuMenu.classList.toggle("menu__submenu-show-menu");
      submenuMenu.classList.toggle("mobile-menu__with-submenu_close");
    });
    menuItemContacts.addEventListener("click", function(e){
      e.preventDefault();
      menuSubmenuContacts.classList.toggle("menu__submenu-show-menu");
      submenuContacts.classList.toggle("mobile-menu__with-submenu_close");
    });
    menuSubmenuMenu.classList.remove("menu__submenu_hover");
    menuSubmenuContacts.classList.remove("menu__submenu_hover");
  } else if ($(window).width() > 769) {
     menuItemMenu.removeEventListener("click", function(){});
     menuItemContacts.removeEventListener("click", function(){});
     menuSubmenuMenu.classList.add("menu__submenu_hover");
     menuSubmenuContacts.classList.add("menu__submenu_hover");
   }
});


//news block templating


  var allNews = [
    {image: 'img/events/summer-terrasse.jpg', imageAltern: 'summer terrasse', heading: 'Summer terrasse is open', desc: 'Luckily the summer is coming, so you can spend time with your friends or family having a meal outside.', postedTimePast: '5 hours ago'},
    {image: 'img/events/children-birthday.jpg', imageAltern: 'birthday cakes', heading: 'Make your children happy', desc: 'Now you can organize a wonderfull birtday for your children.', postedTimePast: '10 days ago'},
    {image: 'img/events/wedding.jpg', imageAltern: 'wedding', heading: 'Best wedding with us', desc: 'Our restaurant can place up to 60 elite guests inside. Let us make the most important day of your life special.', postedTimePast: '28 days ago'},
    {image: 'img/events/birthday.jpg', imageAltern: 'birthday cakes', heading: 'Birthday party can be even better', desc: 'Having boring birthday parties? Nah. We can serve you with the best Italian food and drinks. Candy bar is free.', postedTimePast: 'a month ago'},
  ];

  localStorage.setItem("allNews", JSON.stringify(allNews));
  var allNewsData = localStorage.getItem("allNews");
  var ourNews = JSON.parse(allNewsData);

  //write to html via resig template
  
  var results = document.getElementById("news-content");
  results.innerHTML = tmpl("mypage1", {data: ourNews});
  
  
//registration

//appearance

var joinUsBtn = document.querySelector("#join-us__btn"),
    joinUsModal = document.querySelector(".header-wrapper__registration"),
    closeJoinUsModalBtn = document.querySelector(".registration__close-btn"),
    newUserTabBtn = document.querySelector(".user-form-switch__new"),
    existingUserTabBtn = document.querySelector(".user-form-switch__existing"),
    existingUserForm = document.querySelector(".registration__login-form"),
    newUserForm = document.querySelector(".registration__signup-form");

function showJoinUsModal(){
    joinUsModal.classList.toggle("header-wrapper__registration_show");
    joinUsBtn.classList.toggle("join-us__btn_active");
}

function closeJoinUsModal(){
  joinUsModal.classList.remove("header-wrapper__registration_show");
  joinUsBtn.classList.remove("join-us__btn_active");
  existingUserForm.classList.remove("show-user-form");
  existingUserTabBtn.classList.remove("user-form-switch__existing_active");
  newUserForm.classList.remove("show-user-form");
  newUserTabBtn.classList.remove("user-form-switch__new_active");
  clearSignupInputs();
  clearLoginInputs();
}

function showNewUserForm() {
  newUserForm.classList.toggle("show-user-form");
  existingUserForm.classList.remove("show-user-form");
  newUserTabBtn.classList.toggle("user-form-switch__new_active");
  existingUserTabBtn.classList.remove("user-form-switch__existing_active");
  for (var i = 0; i < signupAlertMesLength; i++){
    signupAlertMessages[i].classList.remove("show-alert-message");
  }
  for (var k = 0; k < loginAlertMesLength; k++){
    loginAlertMessages[k].classList.remove("show-alert-message");
  }
}

function showExistingUserForm() {
  existingUserForm.classList.toggle("show-user-form");
  existingUserTabBtn.classList.toggle("user-form-switch__existing_active");
  newUserForm.classList.remove("show-user-form");
  newUserTabBtn.classList.remove("user-form-switch__new_active");
  for (var i = 0; i < signupAlertMesLength; i++){
    signupAlertMessages[i].classList.remove("show-alert-message");
  }
  for (var j = 0; j < loginAlertMesLength; j++){
    loginAlertMessages[j].classList.remove("show-alert-message");
  }
}

//clear signup inputs after registration

function clearSignupInputs(){
  for (var i = 0; i < allSignupInputsLength; i++){
    allSignupInputs[i].value = "";
  }
}

joinUsBtn.addEventListener("click", showJoinUsModal);
closeJoinUsModalBtn.addEventListener("click", closeJoinUsModal);
existingUserTabBtn.addEventListener("click", showExistingUserForm);
newUserTabBtn.addEventListener("click", showNewUserForm);

//sign-up

var signupNameField = document.querySelector("#signup__name-field"),
    signupEmailField = document.querySelector("#signup__email-field"),
    signupPassField = document.querySelector("#signup__pass-field"),
    signupPassRepeatField = document.querySelector("#signup__pass-repeat-field"),
    signupBtn = document.querySelector("#signup__btn"),
    signupAlertMessages = document.querySelectorAll(".signup__alert-message"),
    confirmEmailModal = document.querySelector(".header-wrapper__registration-confirm-modal"),
    regexpUsername = /^[A-Za-z0-9_]{3,20}$/,
    regexpEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
    regexpPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
    errors = [],
    allSignupInputs = document.querySelectorAll(".signup-form__wrapper > input"),
    
    //length variables
    signupAlertMesLength = signupAlertMessages.length,
    loginAlertMesLength = loginAlertMessages.length,
    allSignupInputsLength = allSignupInputs.length;


function addNewUser(){
  //create new user
  var newUser = {};
  newUser.name = signupNameField.value;
  newUser.email = signupEmailField.value;
  newUser.password = signupPassField.value;
  return newUser;
}


function validateSignupForm(){
    
  //validate username
  if (!regexpUsername.test(signupNameField.value)) {
    signupAlertMessages[0].classList.add("show-alert-message");
  } else {
    signupAlertMessages[0].classList.remove("show-alert-message");
  }

  //validate email
  if (!regexpEmail.test(signupEmailField.value)) {
    signupAlertMessages[1].classList.add("show-alert-message");
  } else {
    signupAlertMessages[1].classList.remove("show-alert-message");
  }

  //validate password
  if (!regexpPassword.test(signupPassField.value)) {
    signupAlertMessages[2].classList.add("show-alert-message");
  } else {
    signupAlertMessages[2].classList.remove("show-alert-message");
  }

  //validate password[1]
  if (!regexpPassword.test(signupPassRepeatField.value)) {
    signupAlertMessages[3].classList.add("show-alert-message");
  } else {
    signupAlertMessages[3].classList.remove("show-alert-message");
  } 

  //validate if paswords are equal
  if (signupPassField.value !== signupPassRepeatField.value || signupPassRepeatField.value == "") {
    signupAlertMessages[3].classList.add("show-alert-message");
  }
  else {
    signupAlertMessages[3].classList.remove("show-alert-message");
  }
}

function toLocalStorage(e){
  e.preventDefault();
  validateSignupForm();

  if (regexpUsername.test(signupNameField.value) && regexpEmail.test(signupEmailField.value) && 
   regexpPassword.test(signupPassField.value) && regexpPassword.test(signupPassRepeatField.value)
   && signupPassField.value === signupPassRepeatField.value) {
     var signedupUser = addNewUser();

     // write to localStorage
       localStorage.setItem("signedupUser", JSON.stringify(signedupUser));

     showSentEmailModal();
     closeJoinUsModal();
   }
   
}

function showSentEmailModal(){
    var confirmEmailText = confirmEmailModal.querySelector(".registration-confirm-modal__text");
    confirmEmailText.innerHTML = "Dear "+ signupNameField.value + "! "+ "We sent you a link to prove email address. Check your email "+ signupEmailField.value;
    confirmEmailModal.classList.add("header-wrapper__registration-confirm-modal_animate-fading");
    setTimeout(hideSentEmailModal, 8000);
}

function hideSentEmailModal(){
      confirmEmailModal.classList.remove("header-wrapper__registration-confirm-modal_animate-fading");
}

signupBtn.addEventListener("click", toLocalStorage);


//prevent enter key press from form submition

function stopEnterKey(e) { 
  if (e.keyCode == 13)  {
    return false;
  } 
} 

joinUsModal.onkeypress = stopEnterKey;
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i);if(j){var k=h.getAttribute("xlink:href")||h.getAttribute("href");!k&&g.attributeName&&(k=h.getAttribute(g.attributeName));if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});

svg4everybody();




//PAGINATION


// (function($){
//     $.fn.extend({
//         MyPagination: function(options) {
//             var defaults = {
//                 height: 900,
//                 fadeSpeed: 400
//             };
//             var options = $.extend(defaults, options);

//             // Создаем ссылку на объект
//             var objContent = $(this);

//             // Внутренние переменные
//             var fullPages = new Array();
//             var subPages = new Array();
//             var height = 0;
//             var lastPage = 1;
//             var paginatePages;

//             // Функция инициализации
//             init = function() {
//                 objContent.children().each(function(i){
//                     if (height + this.clientHeight > options.height) {
//                         fullPages.push(subPages);
//                         subPages = new Array();
//                         height = 0;
//                     }

//                     height += this.clientHeight;
//                     subPages.push(this);
//                 });

//                 if (height > 0) {
//                     fullPages.push(subPages);
//                 }

//                 // Оборачиваем каждую полную страницу
//                 $(fullPages).wrap("<div class='food-result__page'></div>");

//                 // Скрываем все обернутые страницы
//                 objContent.children().hide();

//                 // Создаем коллекцию для навигации
//                 paginatePages = objContent.children();

//                 // Показываем первую страницу
//                 showPage(lastPage);

//                 // Выводим элементы управления
//                 showPagination($(paginatePages).length);
//             };

//             // Функция обновления счетчика
//             updateCounter = function(i) {
//                 $('#page_number').html(i);
//             };

//             // Функция вывода страницы
//             showPage = function(page) {
//                 i = page - 1;
//                 if (paginatePages[i]) {

//                     // Скрываем старую страницу, показываем новую
//                     $(paginatePages[lastPage]).fadeOut(options.fadeSpeed);
//                     lastPage = i;
//                     $(paginatePages[lastPage]).fadeIn(options.fadeSpeed);

//                     // и обновлем счетчик
//                     updateCounter(page);
//                 }
//             };


//             // Функция вывода навигации (выводим номера страниц)
//             showPagination = function(numPages) {
//                 var pagins = '';
//                 for (var i = 1; i <= numPages; i++) {
//                     pagins += '<li class="pagination__list-item"><a href="#" class="pagination__link" onclick="showPage(' + i + '); return false;">' + i + '</a></li>';
//                 }
//                 $('.pagination li:first-child').after(pagins);
//             };



//             // Выполняем инициализацию
//             init();

//             // Привязываем два события - нажатие на кнопке "Предыдущая страница"
//             $('.pagination #prev').click(function(e) {
//                 e.preventDefault();
//                 showPage(lastPage);
//             });
//             // и "Следующая страница"
//             $('.pagination #next').click(function(e) {
//                 e.preventDefault();
//                 showPage(lastPage+2);
//             });

//         }
//     });
// })(jQuery);

// // Инициализация
// jQuery(window).load(function() {
//     $('#food-wrapper__result').MyPagination({height: 2000, width: 800, fadeSpeed: 0});
// });


//sORT

// var sortBlock = document.querySelector("#sort-block__sorting"),
// 	container = document.querySelector(".food-wrapper__result"),
// 	contents = document.querySelectorAll(".food-result__price"),
// 	food = document.querySelector(".food-result"),
// 	list = [];
//
// function sortByPriceAscending() {
//
// 	for(var i=0; i<contents.length; i++){
// 	    list.push(contents[i]);
// 	}
//
// 	list.sort(function(a, b){
// 		var aa = parseInt(a.innerHTML.substring(1));
// 		var bb = parseInt(b.innerHTML.substring(1));
// 		return aa < bb ? -1 : (aa > bb ? 1 : 0);
// 	});
//
// 	list.reverse();
//
// 	for(var k=0; k<list.length; k++){
// 	    // console.log(list[i].innerHTML);
// 		container.insertBefore(list[k].parentNode, container.firstChild);
// 	}
// }
//
//
// function sortByPriceDescending() {
//
// 	for(var i=0; i<contents.length; i++){
// 	    list.push(contents[i]);
// 	}
//
// 	list.sort(function(a, b){
// 		var aa = parseInt(a.innerHTML.substring(1));
// 		var bb = parseInt(b.innerHTML.substring(1));
// 		return aa < bb ? -1 : (aa > bb ? 1 : 0);
// 	});
//
// 	for(var k=0; k<list.length; k++){
// 	    // console.log(list[i].innerHTML);
// 		container.insertBefore(list[k].parentNode, container.firstChild);
// 	}
// }
//
// sortBlock.addEventListener("change", function(){
// 	if (sortBlock.value === "sort-descending"){
// 		sortByPriceDescending();
// 	} else if (sortBlock.value === "sort-ascending") {
// 		sortByPriceAscending();
//
// 	} else {
//
// 	}
// });




// function toLocalStorage(e){
//   e.preventDefault();
//   validateSignupForm();
//   addNewUser();
//   // for(var i = 0; i < 5; i++) {
//     allusers.push(addNewUser());
//
//     console.log(allusers);
//   // }
//   //write to localStorage
//   for (var i =0; i < allusers.length; i++){
//     var savedUser = localStorage.setItem("user"+[i], JSON.stringify(allusers[i]));
//   }
// }
//
//
// function addNewUser(){
//   //create new user
//   user = {
//     name: signupNameField.value,
//     email: signupEmailField.value,
//     password: signupPassField.value
//   };
//
//   return user;
//
// }
//
//
// function validateSignupForm(e){
//     // e.preventDefault();
//     if (!regexpUsername.test(signupNameField.value)) {
//       errors[errors.length] = "You must enter valid Name .";
//     }
//
//     if (!regexpEmail.test(signupEmailField.value)) {
//       errors[errors.length] = "You must enter a valid email address.";
//    }
//
//    if (!regexpPassword.test(signupPassField.value)) {
//       errors[errors.length] = "You must enter a valid Password ";
//    }
//
//    if (!regexpPassword.test(signupPassRepeatField.value)) {
//       errors[errors.length] = "You must enter similar Password ";
//    }
//     // checkPassRepeat();
//     addNewUser();
//
//   if (errors.length > 0) {
//     reportErrors(errors);
//     return false;
//   } else {
//     closeJoinUsModal();
//     clearSignupInputs();
//     alert("We sent you a link to prove email address. Check your email "+ signupEmailField.value);
//   }
//   errors = [];
//    return true;
// }
//
//
// function reportErrors(errors){
//   var msg = "Please Enter Valide Data...\n";
//   for (var i = 0; i<errors.length; i++) {
//    var numError = i + 1;
//     msg += "\n" + numError + ". " + errors[i];
//   }
//   alert(msg);
// }
//
// //clear signup inputs after registration
// function clearSignupInputs(){
//   for (var i = 0; i < allSignupInputs.length; i++){
//     allSignupInputs[i].value = "";
//   }
// }
//
// function showSentEmailModal(){
//
// }
//social btns settings

//twitter btn

window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);

  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };

  return t;
}(document, "script", "twitter-wjs"));
//creating tabs

var newsTab = ourEvents.querySelector(".tab-news__heading"),
    eventsTab = ourEvents.querySelector(".tab-events__heading"),
    newsBlock = ourEvents.querySelector("#news-content"),
    eventsBlock = ourEvents.querySelector("#event-content");

newsTab.addEventListener("click", function(e){
  e.preventDefault();
  newsBlock.classList.add("show-content");
  eventsBlock.classList.remove("show-content");
  this.classList.add("tab-active");
  eventsTab.classList.remove("tab-active");
});

eventsTab.addEventListener("click", function(e){
  e.preventDefault();
  eventsBlock.classList.add("show-content");
  newsBlock.classList.remove("show-content");
  this.classList.add("tab-active");
  newsTab.classList.remove("tab-active");
});

//to top button

window.onscroll = function(){
	scrollScreen();
}

var html = document.querySelector("html");
var toTopButton = document.querySelector("#to-top-button");

function scrollScreen(){
  if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
    toTopButton.style.display = "block";
  } else {
    toTopButton.style.display = "none";
  }
}


