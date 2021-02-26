/**
 * Created by gitkv on 02.03.16.
 */
'use strict';

;(function($){
    $.notification = {
        settings:{
            time: 400,
            delay: 9000
        },
        element:'.notification_block',
        elementClose:'.notification_block .close_notice',
        count: 0,
        elementBuffer: [],
        show:function(type, text){
            var that = this;
            var elementId = this.append(type, text);
            var element  = this.elementBuffer[elementId];
            this.restructuring(elementId);
            element.fadeIn(this.settings.time);
            setTimeout(function(){
                that.hide(elementId);
            }, this.settings.delay);
            $(document).on("click", this.elementClose, function(){
                var noteId = $(this).parents(that.element).data('id');
                that.hide(noteId);
                return false;
            });
            return elementId;
        },
        hide:function(elementId){
            var that = this;
            var element = this.elementBuffer[elementId];
            if(typeof element != 'undefined') {
                element.fadeOut(this.settings.time);
                setTimeout(function () {
                    element.remove();
                    delete that.elementBuffer[elementId];
                    that.restructuring(elementId);
                }, that.settings.time);
                return true;
            }
            return false;
        },
        append:function(type, text){
            var templete =
                '<div id="note_'+this.count+'" data-id="'+this.count+'" class="notification_block '+type+'">' +
                    '<a class="close_notice" href="#"></a>' +
                    '<div class="content_notice">'+text+'</div>' +
                '</div>';
            $('body').append(templete);
            this.elementBuffer[this.count] = $(document).find('#note_'+this.count);
            this.count++;
            return this.count-1;
        },
        restructuring: function(){
            var elements = this.elementBuffer;
            var newPosY = 20;
            for(var i in elements) {
                if (!elements.hasOwnProperty(i)) continue;
                elements[i].css({bottom: newPosY+'px'});
                var elementBottom = elements[i].css('bottom');
                var elementHeight = elements[i].outerHeight();
				console.log(elementBottom);
                newPosY = parseInt(elementBottom)+parseInt(elementHeight)+10;
            }
        },
        init:function(options){
            this.settings = $.extend(this.settings, options);

            return this;
        }
    };
})(jQuery);