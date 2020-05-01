$(document).ready(runJqueryMain);

function runJqueryMain() {
	
	var townies = [];
	var quotes = [];
	var townie0id;
	
	// //////////
	
	 // $('.card-title a').editable();
	
	$('#exampleModal').on('show.bs.modal', function (event) {
		  var button = $(event.relatedTarget) // Button that triggered the
												// modal
		  
		  var firstName = button.data('whatever') // Extract info from data-*
													// attributes
		  
		  //console.log( button[0]);
		  //console.log('id' , button[0]['id']);
		  
		  //console.log("any data 2?", jQuery.data( button, "townie" ));
		  var tid = button[0]['id'];
		  var myTownie  = getTownieById(tid);
		  //console.log('myTownie', myTownie )

		  

		  var qtsArray = matchQuoteByTownieIdIntoArray(tid);
		  
		  var modal = $(this);
		  modal.find('.modal-title').text('Editing ' + myTownie.firstName);
		  modal.find('.modal-body input#firstName').val(myTownie.firstName);
		  
		  modal.find('.modal-body input#lastName').val(myTownie.lastName);
		  
		  modal.find('.modal-body input#firstName').val(myTownie.firstName);
		  
		  modal.find('.modal-body input#quote1').val(qtsArray[0]['phrase']);
		  modal.find('.modal-body input#quote2').val(qtsArray[1]['phrase']);
		  
		  
		  
		  modal.find("#save").on("click", function(e){
			  e.preventDefault(); // prevent default action (which is to submit)
			  
			  var firstName = modal.find('.modal-body input#firstName')[0]['value'];
			  var lastName = modal.find('.modal-body input#lastName')[0]['value'];
			  
			  myTownie.firstName = firstName;
			  myTownie.lastName = lastName;
			  
			  
			  //console.log(myTownie);
			  
			  //update the townie
			  
				$.ajax({
					url : "http://localhost:8083/townies/" + myTownie._id,
					type: 'PUT' ,
					contentType : "application/json",
				      data : JSON.stringify(myTownie),
				      dataType : 'json',
				      cache: false,
				    success: function (result) {       
				           console.log('result' , result); 
				          //refreshDisplayAllTownies();
				           //runJqueryMain();
				           
				           
				    },
				    error: function (e) {
				        console.log(e);
						  refreshDisplayAllTownies();
				           runJqueryMain();
				    }
				}).then(function(data) {
					 console.log('then data' , data);
					 // refreshDisplayAllTownies();
			          // runJqueryMain();
			           
			         
					
				});
			  
				//update the quotes
				

				//TODO need to make a way to check which feild has been edited and only updated if needed
				qtsArray.forEach( (myQuote, index) => {
					
					
					myQuote.phrase = modal.find('.modal-body input#quote' + (1 + index))[0]['value'];

					$.ajax({
						url : "http://localhost:8083/quotes/" + myQuote._id,
						type: 'PUT' ,
						contentType : "application/json",
					      data : JSON.stringify(myQuote),
					      dataType : 'json',
					      cache: false,
					    success: function (result) {       
					           console.log('sucess result myQuote' , result); 
					           //
					           
					           
//					           if(index === qtsArray.length){
//					        	   refreshDisplayAllTownies();
//					        	   runJqueryMain();
//					           }
					    },
					    error: function (e) {
					        console.log('error' , e); //TODO need to figure out why this error is firing
							  //refreshDisplayAllTownies();
					          //runJqueryMain();
					        
					          // if(index === qtsArray.length){
//					        	 refreshDisplayAllTownies();
//					        	 runJqueryMain();
					         //  }
					    }
					}).then(function(data) {
						// console.log('then data' , data);
				           
//				           if(index === qtsArray.length){
//				        	   refreshDisplayAllTownies();
//				        	   runJqueryMain();
//				           }
						 //runJqueryMain();
						
					});
				
				});
				

			  //close modal
			  $(this).prev().click();

			});
		  
		});
	
	
	readLists();
	


	$("#randbutton").click(function() {
		displayRandomTownie();
	});

	
	  $("#search-field").on("keyup", function() {
		  console.log($(this));
		    var value = $(this).val().toLowerCase();
		    $(".tcol").filter(function() {

		    	$(this).toggle($(this).find(".card-title").text().toLowerCase().indexOf(value) > -1)
		    	
		    });
		  });
	
	// //////////
	  
	  function getTownieById(tid){
		  
		  var t;
		  
		  townies.forEach((townie ) => {
			  //console.log(townie._id , tid)
			  if(townie._id === tid ){
				  console.log('match found!')
				  t = townie;
			  }
		  });
		  
		  return t;
		  
	  }
	
	function readLists(){
		
		$.ajax({
			url : "http://localhost:8083/townies/list",
			cache: false
		}).then(function(data) {
			console.log('townies data', data);
			townies = data;
			$('#randtownie').text(data[0].firstName);
			
			
			$.ajax({
				url : "http://localhost:8083/quotes/list"
			}).then(function(data) {
				console.log('quotes data', data);
				quotes = data;
				$('#randquote').text(data[0].phrase);
				
				displayAllTownies();
			});
		});
	}
	  
	function makeRandomNumber(range) {
		return Math.floor(Math.random() * range);
	}
	
	function displayRandomTownie(){
		var randTownieIndex = makeRandomNumber(townies.length);
		var displayString = "";
		
		$('#randtownie').text(townies[randTownieIndex].firstName);
		
		displayString = matchRandomQuoteByTownieId(townies[randTownieIndex]._id);
		
		
		$('#randquote').html(displayString);

	}
	
	function matchQuoteByTownieId(townieId){
		
		var displayString = "";
		
		quotes.forEach(quote => {
			if (quote.character == townieId) {
				displayString += '<q>' +  quote.phrase + "</q><br/><br/>";
			}
					
		});

		return displayString;
	}
	
	function matchQuoteByTownieIdIntoArray(townieId){
		
		var displayString = "";
		var matchedQuotes = [];
		
		quotes.forEach(quote => {
			if (quote.character == townieId) {
				matchedQuotes.push(quote);
			}		
		});

		return matchedQuotes;
		
	}
	
	function matchRandomQuoteByTownieId(townieId){
		
		var displayString = "";
		var matchedQuotes = [];
		
		quotes.forEach(quote => {
			if (quote.character == townieId) {
				matchedQuotes.push(quote);
			}		
		});

		var randQuoteIndex = makeRandomNumber(matchedQuotes.length);
		

		displayString += '<q>' +  matchedQuotes[randQuoteIndex].phrase + "</q><br/><br/>";

		
		return displayString;
	}
	
	function displayAllTownies(){
		console.log('displayAllTownies');
		console.log('townies.length', townies.length);
		//TODO its possible that my update method is messing up the data?
		
		townies.forEach((townie , index ) => {
			console.log("townie , index", townie, 0);
			
			
			if(index == 0){
				
				console.log("index is 0, first get #towniecol")
				
				var qts = matchQuoteByTownieId(townie._id);
				var qtsArray = matchQuoteByTownieIdIntoArray(townie._id);
				
				$( "#towniecol" ).prop({'id':townie._id});
				$( "#" + townie._id + " img" ).prop({'src':townie.picture});
				$( "#" + townie._id + " .card-title" ).text(townie.firstName + " " + townie.lastName);
				$( "#" + townie._id + " .card-text" ).html(qts);
				
				
				
				var editBtn = $( "#" + townie._id + " .edit-button" );
				editBtn.prop({'id':townie._id});
				
				// jQuery.data(editBtn , "townie", townie);
				
				
				//jQuery.data(editBtn , "towniequotes", {townie : townie, quotes : qtsArray });
				
				//console.log('editBtn' , editBtn);
				
				//console.log("any data?", jQuery.data( editBtn, "townie" )); 
																		
				
				townie0id = townie._id;
				console.log('townie0id' , townie0id);
			}
			else {
				
				var qts = matchQuoteByTownieId(townie._id);
				var qtsArray = matchQuoteByTownieIdIntoArray(townie._id);
				
				console.log('appending ', townie.firstName + " " + townie.lastName)
				
				$( "#" + townie0id ).clone().prop({'id':townie._id}).appendTo( "#townierow" );
				
				$( "#" + townie._id + " img" ).prop({'src':townie.picture});
				$( "#" + townie._id + " .card-title" ).text(townie.firstName + " " + townie.lastName);
				$( "#" + townie._id + " .card-text" ).html(qts);
				
				var editBtn = $( "#" + townie._id + " .edit-button" );
				editBtn.prop({'id':townie._id});
				
				// jQuery.data(editBtn , "townie", townie);
				
				//jQuery.data(editBtn , "towniequotes", {townie : townie, quotes : qtsArray });
				
				//console.log('editBtn' , editBtn);
				
				//console.log("any data?", jQuery.data( editBtn, "towniequotes" ));
			}
		});
	} 


}

function refreshDisplayAllTownies(){
	console.log('refreshDisplayAllTownies');
	$townieTemplate = $( "#townierow .tcol" ).first().clone();
	console.log('$townieTemplate' , $townieTemplate);
	$( "#townierow .tcol" ).remove();
	//if($townieTemplate.attr('id') !==  'towniecol'){
	$townieTemplate.prop({'id':'towniecol'});
	//}
	//$townieTemplate.prop({'id':'towniecol'}).appendTo( "#townierow" );
	$townieTemplate.appendTo( "#townierow" );
	$townieTemplate.find( " .card-title" ).text("");
	$townieTemplate.find( " .card-text" ).html("");
	
	$townieTemplate.find( " .edit-button" ).removeAttr('id');
}


function  editTownie(el){
	console.log(el);
	console.log($(el).attr('class'));
	console.log($(el).closest('.tcol').attr('id'));
	
}

function  deleteTownie(el){
	console.log(el);
	console.log($(el).attr('class'));
	console.log($(el).closest('.tcol').attr('id'));
	
	var idToDeleteBy  = $(el).closest('.tcol').attr('id');
	
	$.ajax({
		type: 'DELETE' ,
		url : "http://localhost:8083/townies/" + idToDeleteBy ,
		cache: false,
	    success: function (result) {       
	           console.log(result); 
	           refreshDisplayAllTownies();
	           runJqueryMain();
	           
	    },
	    error: function (e) {
	        console.log(e);
	    }

	}).then(function(data) {
		console.log('delte data', data);

	});
}
