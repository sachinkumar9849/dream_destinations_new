$('.slider_main').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut',
   
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 2
        }
    }
});
// testimonial end
$('.brand_partner').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut',
   
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 5
        }
    }
});
// testimonial end

$(".vpop").on('click', function(e) {
    e.preventDefault();
    $("#video-popup-overlay,#video-popup-iframe-container,#video-popup-container,#video-popup-close").show();
    
    var srchref='',autoplay='',id=$(this).data('id');
    if($(this).data('type') == 'vimeo') var srchref="//player.vimeo.com/video/";
    else if($(this).data('type') == 'youtube') var srchref="https://www.youtube.com/embed/";
    
    if($(this).data('autoplay') == true) autoplay = '?autoplay=1';
    
    $("#video-popup-iframe").attr('src', srchref+id+autoplay);
    
    $("#video-popup-iframe").on('load', function() {
      $("#video-popup-container").show();
    });
  });
  
  $("#video-popup-close, #video-popup-overlay").on('click', function(e) {
    $("#video-popup-iframe-container,#video-popup-container,#video-popup-close,#video-popup-overlay").hide();
    $("#video-popup-iframe").attr('src', '');
  });
  
  /* 
  minified
  
  $(".vpop").on("click",function(o){o.preventDefault(),$("#video-popup-iframe-container,#video-popup-container,#video-popup-close").show();var p="",e="",i=$(this).data("id");if("vimeo"==$(this).data("type"))var p="//player.vimeo.com/video/";else if("youtube"==$(this).data("type"))var p="https://www.youtube.com/embed/";1==$(this).data("autoplay")&&(e="?autoplay=1"),$("#video-popup-iframe").attr("src",p+i+e),$("#video-popup-iframe").on("load",function(){$("#video-popup-overlay, #video-popup-container").show()})}),$("#video-popup-close, #video-popup-overlay").on("click",function(o){$("#video-popup-iframe-container,#video-popup-container,#video-popup-close").hide(),$("#video-popup-iframe").attr("src","")});
  */
// youtube end 


/**
 * monthPicker.js
 * 
 * @auteur     marc laville
 * @Copyleft 2014
 * @date       26/01/2014
 * @version    0.5
 * @revision   $0$
 *
 * un month-picker pur Javascript
 * 
 *
 * A Faire
 * -position du tip ( west, east, north, south )
 *
 * Licensed under the GPL license:
 *   https://www.opensource.org/licenses/mit-license.php
 */
/**
 * A Faire
 * -position du tip ( west, east, north, south )
 * - localisation
*/

/*
 * L'Objet Date sait revenyer la liste des noms de mois
 */
Date.monthNames = Date.monthNames || function( ) {
	var arrMonth = [],
		dateRef = new Date(),
		year = dateRef.getFullYear(),
        // Firefox don't support parametres, so we construct option to conform to Firefox format
        options = {weekday: "long", year: "numeric", month: "long", day: "numeric"};

	dateRef.setMonth(0);
	dateRef.setDate(10); // Eviter la fin de mois !!!
	while (year == dateRef.getFullYear()) {
		/* push le mois en lettre et passe au mois suivant */
		arrMonth.push( (dateRef.toLocaleString("fr-FR", options).split(' '))[2] );
		dateRef.setMonth( dateRef.getMonth() + 1);
	}
	
	return arrMonth;
}

/**
 * Pour Instancier plusieurs month-picker par page,
 * on a besoin d'une fabrique ...
 */
var monthPickerFactory = (function ( document ) {
	var 
		/**
		 * Crétion d'une instance de monthPicker
		 * @element inputElt :  un element input
		 */
		monthPicker =  function ( inputElt, options ) {
			var valeur = inputElt.value,
				tabVal = valeur.split('/'), // Voir un regex pour généraliser la construction 
				b_mp = document.createElement('b'),
				span_mp = b_mp.appendChild( document.createElement('span') ),
				slct_year = span_mp.appendChild( document.createElement('select') ),
				/**
				 * clickBtnMois
				 * reponse à un click sur un bouton mois
				 * @event e : 
				 */
				clickBtnMois = function( e ) {
					var val = e.target.value,
						label = e.target.parentNode,
						labelNodeList = label.parentNode.getElementsByTagName('label');
					
					if(val == 'on') { // compatibilité Opera

						for (var i = 0; i < labelNodeList.length; ++i) {
							if( label == labelNodeList[i] ) val = i + 1;
						}
					}
					tabVal = [ val, slct_year.value ];
					inputElt.value = '' + tabVal[0]  + '/' + tabVal[1];
					 
					return;
				},			
				selectAnnee = function( e ) {
					tabVal[1] = slct_year.value;
					inputElt.value = '' + tabVal[0]  + '/' + tabVal[1];
				},
				fillSelect = function( an ) {
					an = an || (new Date()).getFullYear();
					for(var i = an - 3 ; i < an + 10 ; i++) {
						slct_year.appendChild( document.createElement('option') ).textContent = i;
						if( an == i ) {
							slct_year.lastChild.setAttribute( 'selected', 'selected' );
						}
					}
					slct_year.addEventListener( 'change', selectAnnee );
					
				},
				fillMois = function( mois, tabMois ) {
					tabMois = tabMois || Date.monthNames().map( function(str) { return ( str.length > 4 ) ? str.substr(0 , 3) + '.' : str; 
					} );
					mois = mois || (new Date()).getMonth() + 1;
					
					for(var i = 0, lbl_mois, rd_mois ; i < tabMois.length ; i++) {
						lbl_mois  = document.createElement('label'),
						rd_mois = lbl_mois.appendChild( document.createElement('input') );
							
							
						rd_mois.value = i + 1;
						rd_mois.setAttribute( 'type', 'radio');
						rd_mois.setAttribute( 'name', 'mois');
						rd_mois.addEventListener( 'change', clickBtnMois );
						rd_mois.checked = ( mois == i + 1 );
						if( rd_mois.value == '' && mois == i + 1 ) {
							rd_mois.value = 'on';
						}
						
						lbl_mois.appendChild( document.createElement('span') ).textContent = tabMois[i];
						
						span_mp.appendChild( lbl_mois );
					}
					return;
				};
				
			b_mp.classList.add( 'month-picker' );

			inputElt.classList.add( 'month-picker' );
			fillSelect( ( tabVal.length > 1 ) ? parseInt( tabVal[1] ) : null );
			span_mp.appendChild( document.createElement('br') );
			fillMois( ( tabVal.length ) ? parseInt( tabVal[0] ) : null );
			
			inputElt.parentNode.insertBefore(b_mp, inputElt);
			b_mp.insertBefore(inputElt, span_mp);
			
			return b_mp;
		};

	return {
		createMonthPicker : monthPicker
	}
})(window.document);

// Start
monthPickerFactory.createMonthPicker( document.getElementById('mois') );

// month picker end 

$(document).ready(function() {
    //jquery for toggle sub menus
    $('.sub-btn').click(function() {
        $(this).next('.sub-menu').slideToggle();
        $(this).find('.dropdown').toggleClass('rotate');
    });

    //jquery for expand and collapse the sidebar
    $('.menu-btn').click(function() {
        $('.side-bar').addClass('active');
        $('.menu-btn').css("visibility", "hidden");
    });

    $('.close-btn').click(function() {
        $('.side-bar').removeClass('active');
        $('.menu-btn').css("visibility", "visible");
    });
});
// menu mobile end 
// team read readMore 
$(document).ready(function() {
    $(".toggle-wrap").hide();
    $(".toggle-trigger").click(function() {
        $(this).parent().nextAll('.toggle-wrap').first().toggle('slow');
    });
});
//footer bg image
$(document).ready(function()
{

var pixelToMove = 50;

$(".footer-img").mousemove(function(e)
{

var width = $(this).innerWidth();

var height = $(this).innerHeight();

var newValueX = (e.pageX / width) *
pixelToMove;

var newValueY = (e.pageY / height) *
pixelToMove;

$(this).css('background-position',
newValueX + '%' + ' ' + newValueY + '%');

});
});


//for slider
$('.home-slider-wrapper').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut',
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});

//for slider
$('.home-slider-wrapper').owlCarousel({
    loop: true,
    margin: 0,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    animateOut: 'fadeOut',
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});


//for job application
$('.jobs-wrapper').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 3
        }
    }
});

//for testimonials
$('.testimonials-wrapper').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 7000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 1
        }
    }
});

//for clients
$('.client-wrapper').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 7000,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 1
        },
        1000: {
            items: 6
        }
    }
});

// for back to top button
$(window).scroll(function() {
    if ($(window).scrollTop() > 350) {
        $(".back-to-top").show();
    } else {
        $(".back-to-top").hide();
    }
});
$('.back-to-top').click(function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});


// NAVE scroll
$(document).ready(function() {
    window.addEventListener("scroll", function() {
        var header = document.querySelector(".header");
        header.classList.toggle("sticky-bar", window.scrollY > 50);
    });

});

// about read more start 

class readMore {
    constructor() {
        this.content = '.readmore__content';
        this.buttonToggle = '.readmore__toggle';
    }

    bootstrap() {
        this.setNodes();
        this.init();
        this.addEventListeners();
    }

    setNodes() {
        this.nodes = {
            contentToggle: document.querySelector(this.content)
        };

        this.buttonToggle = this.nodes.contentToggle.parentElement.querySelector(this.buttonToggle);
    }

    init() {
        const { contentToggle } = this.nodes;

        this.stateContent = contentToggle.innerHTML;

        contentToggle.innerHTML = `${this.stateContent.substring(0, 600)}...`;
    }

    addEventListeners() {
        this.buttonToggle.addEventListener('click', this.onClick.bind(this))
    }

    onClick(event) {
        const targetEvent = event.currentTarget;
        const { contentToggle } = this.nodes

        if (targetEvent.getAttribute('aria-checked') === 'true') {
            targetEvent.setAttribute('aria-checked', 'false')
            contentToggle.innerHTML = this.stateContent;
            this.buttonToggle.innerHTML = 'Show Less'

        } else {
            targetEvent.setAttribute('aria-checked', 'true')
            contentToggle.innerHTML = `${this.stateContent.substring(0, 600)}...`
            this.buttonToggle.innerHTML = 'Show more'
        }
    }
}


const initReadMore = new readMore();
initReadMore.bootstrap()
    //about read more end

