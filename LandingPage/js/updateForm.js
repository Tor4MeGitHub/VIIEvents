function UpdateForm(data,fncInit,flag){
	var rv=this;
	var _updateForm = $('.updateForm');
	rv.init = _init;
	_init();
	//http://tarruda.github.io/bootstrap-datetimepicker/
	
	function _init(){
		console.log("update form");
		_updateForm.show();	
		_setData();		
		_bindEvents();
		
	}
	
	function _bindEvents(){
		
		$('#dateIn').datepicker({
			dateFormat: "yy-mm-dd",
			autoclose: true
		});
		
		$('#dateOut').datepicker({
			dateFormat: "yy-mm-dd",
			autoclose: true
		});
		
		 // $('#datetimepicker3').datetimepicker({
                    // format: 'LT'
          // });
		
		 _updateForm.off();
		
		_updateForm.on('click', '.btn-back', fncInit);
		
		_updateForm.on('click', '.btn-save', _submitBtn );
			
		// $('#datetimepicker3').datetimepicker({
				  // pickDate: false
				// });
	}
	
	// function _bindEvents(){
		// $('.btn-save').off();
		// $('.btn-save').bind('click',_submitBtn);			
		
		// $('#btn-back').on('click',function(){
			// console.log("back");
			// fncInit();
		// });
		
		// $('#dateIn').datepicker({
			// dateFormat: "yy-mm-dd",
			// autoclose: true
		// });
		
		// $('#dateOut').datepicker({
			// dateFormat: "yy-mm-dd",
			// autoclose: true
		// });
		
		// // $('#datetimepicker3').datetimepicker({
				  // // pickDate: false
				// // });
	// }
	
	function _submitBtn(){
		console.log("submit");
		if (flag == 1){
			console.log("submit");	
			$(this).closest('.updateForm').find("input[type=text], textarea").val("");
			_updateRecord();			
		}	
		else{
			console.log("add");	
			_addRecord();
		}		
		
	}
	
	function _setData(){
		if (flag==1){
			_updateForm.find('#dateIn').val(data[0].DateFrom);
			_updateForm.find('#timeIn').val(data[0].HourFrom);
			_updateForm.find('#dateOut').val(data[0].DateTo);
			_updateForm.find('#timeOut').val(data[0].HourTo);
		}
		else{
			_updateForm.find('#dateIn').val("");
			_updateForm.find('#timeIn').val("");
			_updateForm.find('#dateOut').val("");
			_updateForm.find('#timeOut').val("");	
		}
		
	}
	
		
	function _addRecord() {
		console.log("addRecord");
        var _def = $.Deferred();
		var _record = {
            "dateFrom": _updateForm.find('#dateIn').val(),
			"dateTo": _updateForm.find('#dateOut').val(),
			"hourFrom": _updateForm.find('#timeIn').val(),
			"hourTo": _updateForm.find('#timeOut').val()			
			};
        $.ajax({
            url: 'http://localhost:18030/api/hours/insert',
            method: 'POST',
            async: true,
            data: _record,
            success: function(data, status) {
                console.log(data, status);
				fncInit();
               // _getTableData();
            },
            error: function(xhr, error) {
                console.error(xhr, error);
				
            },
            complete: function() {
               // _loader.hide();
            }
        });

        return _def.promise();
    }
	
	function _updateRecord() {
		console.log("updateRecord");
		var _def = $.Deferred();
        var _record = {
            "dateFrom": _updateForm.find('#dateIn').val(),
			"dateTo": _updateForm.find('#dateOut').val(),
			"hourFrom": _updateForm.find('#timeIn').val(),
			"hourTo": _updateForm.find('#timeOut').val(),
			"entityId": data[0].EntityId
            };
        $.ajax({
            url: 'http://localhost:18030/api/hours/update',
            method: 'PUT',
            async: true,
            data: _record,			
            success: function(data, status) {
                console.log(data, status);
                fncInit();  //почему если вызвать эту функцию в bindevents то таблица поднимется старая, без изменений
            },
            error: function(xhr, error) {
                console.error(xhr, error);
            },
            complete: function() {
               // _loader.hide();
            }
        });

        return _def.promise();
    }
	
	return rv;
}