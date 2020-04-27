$( "#ui-cal" ).datepicker({
    altField: "#showHere",
    altFormat: "DD, d MM, yy",
    showOtherMonths: true,
    minDate: new Date()
});

$("#SearchByCalendar").on("click",function(){
    $("#SearchByCalendar").removeClass("circle-dot");
    $("#SearchByCalendar").addClass("circle");



    $("#SearchAll").addClass("circle-dot");
    $("#SearchAll").removeClass("circle");

})

$("#SearchAll").on("click",function(){
    $("#SearchByCalendar").addClass("circle-dot");
    $("#SearchByCalendar").removeClass("circle");



    $("#SearchAll").removeClass("circle-dot");
    $("#SearchAll").addClass("circle");

})

function Search()
{
    var out=$("#SearchAll").hasClass("circle")?"All":$.datepicker.formatDate('yy-mm-dd',new Date($(".calendar").datepicker( 'getDate' )));
    window.open("18. payment-pending.html?SearchBy="+out,"_self");
}