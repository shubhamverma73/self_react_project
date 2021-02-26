$(function() {
	"use strict";

	$("[rel='tooltip'], .tooltip").tooltip();

	if( $(".text_editor").length > 0 ) {
		$(".text_editor").each(function(index, element) {
			if (typeof $(this).data('height') !== 'undefined') {
				$(this).summernote({height: $(this).data('height')});
			} else {
				$(this).summernote({height: 300});
			}
	    });
	}

	//=============== Date Pick =====================
	$('body').on('focus', '.input-group.date .form-control', function(event) {
		$(this).datetimepicker({
			format: "DD-MM-YYYY",
			pickTime: false,
		});
	});
	$('body').on('click', '.input-group.date .input-group-addon', function(){
		$(this).closest('.input-group.date').find('.form-control').trigger('focus');
	});

	//==================== Month Pick ===============
	$('body').on('focus', '.input-group.month .form-control', function(event) {
		$(this).datetimepicker({
			format: "MM-YYYY",
			startView: "months", 
		    minViewMode: "months",
		    pickTime: false,
		});
	});
	$('body').on('click', '.input-group.month .input-group-addon', function(){
		$(this).closest('.input-group.month').find('.form-control').trigger('focus');
	});
	
	//================== Time Pick ==================
	$('body').on('focus', '.input-group.time .form-control', function(event) {
		$(this).datetimepicker({
			// format: "H-i-s",
			pickDate: false,
		});
	});
	$('body').on('click', '.input-group.time .input-group-addon', function(){
		$(this).closest('.input-group.time').find('.form-control').trigger('focus');
	});
	

	$('.select_all').on("click", function() {
		$(this).select();
	});
	
	$(".check_all").on('click', function() {
		var target_class = $(this).data('target');
		$('.'+target_class).prop('checked', this.checked).change();
	});
	
	$('.fieldset .field').change(function() {
		if( $(this).val() != "" ) {
			$(this).addClass('filled');
		} else {
			$(this).removeClass('filled');
		}
	});
})

$(document).ready(function(e) {

	//fancybox popup
	$(document).on('click', '.fancybox',function(event) {
		var link = $(this).attr('href');
		var options = {
			href: link,
			padding: 0,
			autoHeight: true,
			autoCenter: true,
			openEffect : 'elastic',
			closeEffect : 'fadeout',
			closeClick  : false,
			helpers : { 
				overlay : { closeClick: false },
				overlay: { locked: false }
			},
		};

		if( $(this).hasClass('ajax') ) {
			options.type = "ajax";
		}

		if (typeof $(this).data('download') !== 'undefined') {
			var url = $(this).data('download');
			options.afterLoad = function() {
				this.title = '<a href="'+url+'"><i class="fa fa-download"></i> Download</a> ';
			};
		}
		$.fancybox.open(options);
		return false;
	});


	$(document).on('change', '.fileUpload .file input', function() {
		if( $(this).val() == '' ) {
		   	$(this).closest('.fileupload').find('.file_name').html('');
		} else {
		  	var name = $(this)[0].files[0].name;
		   	$('.file_name').html(name);
		}
	});
});