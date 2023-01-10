$(document).ready(function(){
	$('#a1').hide();
  $('#a2').hide();
  $('#a3').hide();
  $('#a4').hide();
  $('#a5').hide();
  
  $('#q1').click(function(){
    $('#q1').toggleClass("blue");
    $('#a1').toggle(400);
    $('#q1 > #angle').toggleClass("down up");
  });
	$('#q2').click(function(){
    $('#q2').toggleClass("blue");
    $('#a2').toggle(400);
    $('#q2 > #angle').toggleClass("down up");
  });
   $('#q3').click(function(){
    $('#q3').toggleClass("blue");
    $('#a3').toggle(400);
    $('#q3 > #angle').toggleClass("down up");
  });
	$('#q4').click(function(){
    $('#q4').toggleClass("blue");
    $('#a4').toggle(400);
    $('#q4 > #angle').toggleClass("down up");
  });
  $('#q5').click(function(){
    $('#q5').toggleClass("blue");
    $('#a5').toggle(400);
    $('#q5 > #angle').toggleClass("down up");
  });
});
