function App(){
	var rv=this;
	var event_name = $("#event-name");
	// var _tbody = $('.table-body');
	// var _btnIn = $('.btn-in');
	// var _panelTable = $('.panel-table');
	// var _table = $('.table');
	// var _updateForm = $('.updateForm');
	// var RECORDS = [];
	// //var _totHours = 0;  // total hours
	// var _flagEdit = 1; //1 - edit , 2 - add
	// var _lblTotHours2 = $('.lblTotHours2');		
	// var datas = [];
	rv.init = _init;	
	
	function _init(){
		var events = _getEvents();
	}

	function _getEvents(){
		var _def = $.Deferred();
		var _data;
		
        $.ajax({
            url: 'http://localhost:51178/api/VIIEvents/GetEvents/',
            method: 'POST',
            async: true,
          //  data: _record,
            success: function(data, status) {
				console.log(data, status);
				_data = data;	
			//	$("#event-name").val(_data.Data[0].EventName);
				$("#event-name").html(_data.Data[0].EventName);
				//event_name = _data.Data[0].EventName;		
              
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
	
		
		
	// function _bindEvents(){
		// $('#chart').chart2({
			// data: datas
		// });	

		// $(".btn-export").click(function(){
			// console.log("export");
		  // $("#table2excel").table2excel({
			// // exclude CSS class
			// exclude: ".noExl",
			// name: "Worksheet Name",
			// filename: "SomeFile" //do not include extension
		  // }); 
		// });
						
		// $('.btn-in').on('click',function(){
			// _addInRecord();			
		// });
		
		// $('.btn-out').on('click',function(){
			// _addOutRecord();			
		// });
		
		// $('.btn-add').on('click',function(){
			// _addRow();			
		// });
				
		// _tbody.on('click', '.btnEdit-row', _editRow ); 
		
		// _tbody.on('click', '.btnDelete-row', _deleteRow );
		
		// $('.btn-ok').on('click',function(){
			// var dateFrom = $('#dateFrom').val()
			// var dateTo = $('#dateTo').val()
			// if (dateFrom != "" && dateTo != "")
			// _getTableDataByFil(dateFrom,dateTo);			
		// });
		
		// $('#dateFrom').datepicker({
			// dateFormat: "yy-mm-dd",
			// autoclose: true
		// });
		
		// $('#dateTo').datepicker({
			// dateFormat: "yy-mm-dd",
			// autoclose: true
		// });	
		
	// }
	
			
		
	
	function _getTableData() {
        var _def = $.Deferred();
		var _data;
      	var date = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		$.ajax({
            url: 'http://localhost:18030/api/hours',
            method: 'GET',
            contentType: 'json',
            dataType: 'json',
            responseType: 'json',
            async: true,
            success: function(data, status) {
                if (data) {
                    _data = data;
					_fillTable(_data); 
					_def.resolve(data);	
                }
			},
            error: function(xhr, error) {
                console.error(xhr, error);
				_def.resolve(null);
            },
            complete: function() {
              //  _loader.hide();
            }
        });

        return _def.promise();
	   
    }
	
	function _getTableDataByFil(dateFrom,dateTo) {
        var _def = $.Deferred();
		var _data;
       // _loader.show();
		console.log("Before ajax");
		var url = 'http://localhost:18030/api/hours/' + dateFrom + '/' + dateTo;
        $.ajax({
            url: url,
            method: 'GET',
            contentType: 'json',
            dataType: 'json',
            responseType: 'json',
            async: true,
            success: function(data, status) {
                if (data) {
                    _data = data;
					console.log(_data);
					_fillTable(_data);                
                }
			},
            error: function(xhr, error) {
                console.error(xhr, error);
            },
            complete: function() {
              //  _loader.hide();
            }
        });

        return _def.promise();
	   
	} 

	
	
	function _addInRecord() {
       var _def = $.Deferred();
        $.ajax({
            url: 'http://localhost:18030/api/hours/in',
            method: 'POST',
            async: true,
          //  data: _record,
            success: function(data, status) {
                console.log(data, status);
				_getTableData();
              
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
	
	function _addOutRecord() {
        var _def = $.Deferred();

        $.ajax({
            url: 'http://localhost:18030/api/hours/out',
            method: 'POST',
            async: true,
          //  data: _record,
            success: function(data, status) {
                console.log(data, status);
				_getTableData();
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
	
		
	
	function _deleteRecord(entity_id) {
			//alert('Thanks for confirming');
			var _def = $.Deferred();
			$.ajax({
				url: 'http://localhost:18030/api/hours/' + entity_id,
				method: 'DELETE',
				async: true,
				success: function(data, status) {
					console.log(data, status);
					_getTableData();
					//_init();
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