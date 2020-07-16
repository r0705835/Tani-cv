//auto text

let typedTextSpan = document.querySelector(".typed-text");
let cursorSpan = document.querySelector(".cursor");

const textArray = ["Tanielle Pettitt", "a Software Engineer", "an Innovator"];
let typingDelay = 200;
let erasingDelay = 100;
let newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	if (charIndex > 0) {
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } 
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
  if(textArray.length) setTimeout(type(), newTextDelay + 250);
});



//Menu

$(document).ready(function(){
	var height = window.innerHeight,
    x= 0, y= height/2,
	curveX = 10,
	curveY = 0,
	targetX = 0,
	xitteration = 0,
	yitteration = 0,
	menuExpanded = false;
	
	blob = $('#blob'),
	blobPath = $('#blob-path'),

	hamburger = $('.hamburger');

	$(this).on('mousemove', function(e){
		x = e.pageX;
		
		y = e.pageY;
	});

	$('.hamburger, .menu-inner').on('mouseenter', function(){
		$(this).parent().addClass('expanded');
		menuExpanded = true;
	});

	$('.menu-inner').on('mouseleave', function(){
		menuExpanded = false;
		$(this).parent().removeClass('expanded');
	});

	function easeOutExpo(currentIteration, startValue, changeInValue, totalIterations) {
		return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
	}

	var hoverZone = 150;
	var expandAmount = 20;
	
	function svgCurve() {
		if ((curveX > x-1) && (curveX < x+1)) {
			xitteration = 0;
		} else {
			if (menuExpanded) {
				targetX = 0;
			} else {
				xitteration = 0;
				if (x > hoverZone) {
					targetX = 0;
				} else {
					targetX = -(((60+expandAmount)/100)*(x-hoverZone));
				}			
			}
			xitteration++;
		}

		if ((curveY > y-1) && (curveY < y+1)) {
			yitteration = 0;
		} else {
			yitteration = 0;
			yitteration++;	
		}

		curveX = easeOutExpo(xitteration, curveX, targetX-curveX, 100);
		curveY = easeOutExpo(yitteration, curveY, y-curveY, 100);

		var anchorDistance = 200;
		var curviness = anchorDistance - 40;

		var newCurve2 = "M60,"+height+"H0V0h60v"+(curveY-anchorDistance)+"c0,"+curviness+","+curveX+","+curviness+","+curveX+","+anchorDistance+"S60,"+(curveY)+",60,"+(curveY+(anchorDistance*2))+"V"+height+"z";

		blobPath.attr('d', newCurve2);

		blob.width(curveX+60);

		hamburger.css('transform', 'translate('+curveX+'px, '+curveY+'px)');
    
    $('h2').css('transform', 'translateY('+curveY+'px)');
		window.requestAnimationFrame(svgCurve);
	}

	window.requestAnimationFrame(svgCurve);
	
});

//Awards

const spans = document.querySelectorAll('.word span');

spans.forEach((span, idx) => {
	span.addEventListener('click', (e) => {
		e.target.classList.add('active');
	});
	span.addEventListener('animationend', (e) => {
		e.target.classList.remove('active');
	});
	
	// Initial animation
	setTimeout(() => { 
		span.classList.add('active') ;
	}, 750 * (idx))
    
 
});

//TimeLine

var dates = ["12/1/2016", "1/10/2017", "6/6/2017", "1/28/2019", "4/17/2019", "4/10/2020", "5/9/2020", "6/5/2020","7/1/2020"];

//For the purpose of stringifying MM/DD/YYYY date format
var monthSpan = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var desc = ["Obtained Matric", "Admin Assistant", "Marketing & Management", "BC Tutor","Entelect Challenge","GIT Certificate","Hack-the-Waste","Hardware Certificate", "Capstone International Project"]

var info = ["Acquired a National Senior Certificate from The Hill College.",
           "Worked as an administrative assistant at The Hill College for a one year period whilst honing my communications skills.",
           "Acquired credits in both marketing and management from IMM Graduate School to enhance my familiarity with the corporate world.",
           "Assisted numerous students in various modules as I consolidated my technical foundation.",
           "Participated in the annual Entelect Challenge to apply my expertise and to better my application of team management and co-ordination.",
           "Completed an online Udemy course to further my knowledge of GIT and to enhance task delegation amongst team members.",
           "Participated in the international Hack-the Waste challenge with students of various cultural and IT backgrounds.",
           "Completed an online Udemy course focusing on hardware upgrades to better my understanding of computer architecture.",
           "Currently partaking in the international Capstone project whereby I am required to assist in the construcion of an autonomous underwater drone."]

//Format MM/DD/YYYY into string
function dateSpan(date) {
  var month = date.split('/')[0];
  month = monthSpan[month - 1];
  var day = date.split('/')[1];
  if (day.charAt(0) == '0') {
    day = day.charAt(1);
  }
  var year = date.split('/')[2];

  //Spit it out!
  return month + " " + day + ", " + year;
}

//Main function. Draw your circles.
function makeCircles() {
  //Forget the timeline if there's only one date. Who needs it!?
  if (dates.length < 2) {
    $("#line").hide();
    $("#span").show().ttext(dateSpan(dates[0]));
    //This is what you really want.
  } else if (dates.length >= 2) {
    //Set day, month and year variables for the math
    var first = dates[0];
    var last = dates[dates.length - 1];

    var firstMonth = parseInt(first.split('/')[0]);
    var firstDay = parseInt(first.split('/')[1]);

    var lastMonth = parseInt(last.split('/')[0]);
    var lastDay = parseInt(last.split('/')[1]);

    //Integer representation of the last day. The first day is represnted as 0
    var lastInt = ((lastMonth - firstMonth) * 30) + (lastDay - firstDay);

    //Draw first date circle
    $("#line").append('<div class="circle" id="circle0" style="left: ' + 0 + '%;"><div class="popupSpan">' + dateSpan(dates[0]) + '</div></div>');
    
    $("#mainCont").append('<span id="span0" class="center">' + desc[0]  + '<br> <p id="descript">' + info[0] + '</p> </span>');

    //Loop through middle dates
    for (i = 1; i < dates.length - 1; i++) {

        
        var position = i * 0.125;

     
      $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + position * 100 + '%;"><div class="popupSpan">' + dateSpan(dates[i]) + '</div></div>');
      
      $("#mainCont").append('<span id="span' + i + '" class="right">' + desc[i] + '<br> <p id="descript">' + info[i] + '</p> </span>');
    }

    //Draw the last date circle
    $("#line").append('<div class="circle" id="circle' + i + '" style="left: ' + 99 + '%;"><div class="popupSpan">' + dateSpan(dates[dates.length - 1]) + '</div></div>'); 
    
    $("#mainCont").append('<span id="span' + i + '" class="right">' + desc[i] + '<br> <p id="descript">' + info[i] +'</p></span>');
  }

  $(".circle:first").addClass("active");
}

makeCircles();

$(".circle").mouseenter(function() {
  $(this).addClass("hover");
});

$(".circle").mouseleave(function() {
  $(this).removeClass("hover");
});

$(".circle").click(function() {
  var spanNum = $(this).attr("id");
  selectDate(spanNum);
});

function selectDate(selector) {
  $selector = "#" + selector;
  $spanSelector = $selector.replace("circle", "span");
  var current = $selector.replace("circle", "");
  
  $(".active").removeClass("active");
  $($selector).addClass("active");
  
  if ($($spanSelector).hasClass("right")) {
    $(".center").removeClass("center").addClass("left")
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("right")
  } else if ($($spanSelector).hasClass("left")) {
    $(".center").removeClass("center").addClass("right");
    $($spanSelector).addClass("center");
    $($spanSelector).removeClass("left");
  }; 
};

console.log()

//le chart

var header = $('.stats__header');
var bar  = $('.stats__item-bar');
var nums = $('.stats__item-num');
var overlay = $('.stats__overlay');
var back = $('.stats__overlay-back');
var isOpen = false;

var vYear = $('#year');
var vAvg = $('#avg');
var vGames = $('#games');
var vGoal = $('#goals');

$(document).ready(function() {
  entrance();
});

bar.on('click', showOverlay);
back.on('click', showOverlay);

function entrance() {
  bar.addClass('active');
  header.addClass('active');
  header.on('transitionend webkitTransitionend', function() {
    nums.css('opacity', '1');
    bar.css('transition-delay', '0');
    header.off('transitionend webkitTransitionend');
  });
}

function showOverlay() {
  if (!isOpen) {
    overlay.addClass('active').removeAttr('style');
    bar.css('transition', 'all 0.4s cubic-bezier(0.86, 0, 0.07, 1)')
    .removeClass('active');
    header.removeClass('active');
    nums.css('opacity', '0');
    isOpen = true;
    
   updateInfo($(this).parent().index());
  } else {
    overlay.css('transition', 'all 0.4s cubic-bezier(0.755, 0.05, 0.855, 0.06)').removeClass('active');
    bar.addClass('active').removeAttr('style');
    header.addClass('active');
    nums.css('opacity', '1');
    isOpen = false;
  }
}

var data = [
  {
    year: '2007-2008',
    goals: '65',
    games: '82',
    avg: '83%'
    
  },
  {
    year: '2008-2009',
    goals: '56',
    games: '79',
    avg: '80%'
    
  },
  {
    year: '2009-2010',
    goals: '50',
    games: '72',
    avg: '70%'
    
  },
  {
    year: '2010-2011',
    goals: '32',
    games: '79',
    avg: '60%'
    
  },
  {
    year: '2011-2012',
    goals: '38',
    games: '78',
    avg: '85%'
    
  },
  {
    year: '2012-2013',
    goals: '32',
    games: '48',
    avg: '70%'
    
  },
  {
    year: '2013-2014',
    goals: '51',
    games: '78',
    avg: '90%'
    
  },
  {
    year: '2014-2015',
    goals: '50',
    games: '76',
    avg: '60%'
    
  }
];

function updateInfo(index) {
  vYear.text(data[index].year);
  vAvg.text(data[index].avg);
  vGoal.text(data[index].goals);
  vGames.text(data[index].games);
}

//download

let btn = document.querySelector("button");

btn.addEventListener("click", active);

function active() {
  btn.classList.toggle("is_active");
}

//The Button Stuff

    var link = document.querySelector('link[rel="import"]');
    var content = link.import;

    // Grab DOM from warning.html's document.
    var el = content.querySelector('.warning');

    document.body.appendChild(el.cloneNode(true));
