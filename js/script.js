// Выбор случайного пользователя заданного статуса 
function getRandomItem (statusNameFrom, targetClass){
    var c, arr = [], count = $(targetClass).length; 
        
    for (var i = 0; i < count; i++) {
        // c = $('div.user_type_pic').eq(i).find('div:not(.ticker)');
        c = $(targetClass).eq(i).find('div:not(.ticker)');
        if (c.hasClass(statusNameFrom)) {
            // Формирование массива с индексами элементов со статусом statusNameFrom     
            arr.push(i);
        }
     }
     // Получение случайного значения из массива
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
}

//Смена статуса пользователя
function changeStatus(randomUser,targetClass, statusNameFrom, statusNameTo) {
    var currentItem = $(targetClass).eq(randomUser).find('div:not(.ticker)');
    // Смена статуса элемента (пользователя) через смену классов
    currentItem.removeClass(statusNameFrom);
    currentItem.addClass(statusNameTo);
};

function chengeStatusRandomUser (targetClass, statusNameFrom, statusNameTo) {
    var  r = getRandomItem(statusNameFrom, targetClass); 
    changeStatus(r, targetClass, statusNameFrom, statusNameTo);     
}

$(document).ready(function(event){

    $(function(){
	    $('.content').each(
		    function(){
			    $(this).jScrollPane(
				    {
					    showArrows: $(this).is('.arrow')
				    }
			    );
			    var api = $(this).data('jsp');
			    var throttleTimeout;
			    $(window).bind('resize',
				    function(){
					    if (!throttleTimeout){
						    throttleTimeout = setTimeout(
							    function(){
								    api.reinitialise();
								    throttleTimeout = null;
							    }, 10
						    );
					    }
				    }
			    );
		    }
	    )
    });

    var contextName = 'div.user_type_pic';
    setInterval (function(){    
       // Появление пользователя online
        setTimeout ( 
            function(){
                chengeStatusRandomUser(contextName, 'user_status_offline', 'user_status_online');
            }, 3000
        );

        // Пользователь уходит в offline
         setTimeout (
            function(){
                chengeStatusRandomUser(contextName, 'user_status_online', 'user_status_offline');
            }, 8000
        );

        // Пользователь пишет сообщение и увеличивается счетчик новых сообщений    
        setTimeout (
            function(){
                var r = getRandomItem('user_status_online', contextName);
                setTimeout (
                    function (){
        	            changeStatus(r, contextName, 'user_status_online', 'user_status_write');
                    }, 3000
                );

                setTimeout (
                    function (){
                        var target = $(contextName).eq(r).find('.ticker');
                        var c = Number(target.text())+1; 
                        target.text(c);

                        if (target.hasClass('ticker_state_not')) {
                            target.removeClass('ticker_state_not');
                        }
                        
                        changeStatus(r, contextName, 'user_status_write', 'user_status_online');
                    }, 5000
                );
                
        }, 10000);/*end setTimeout*/
    },10000); /*end setInterval*/

    // Cброс счетчика непрочитанных сообщений при активации пользователя
    $('li.menu__item').click(
        function(){
            var t = $(this).find('div.ticker');
            // if (Number(t.text())!==0) {
            if(!!(t.text())){
          	    t.text('0');
          	    t.addClass('ticker_state_not');
            }     
        }
    );

}); /*end ready*/
