// TODO : Hyperlink bmid to netdb for now ...


function handleClick(home,away,tl,spr) {
  //console.log("search value = " + val1)
    //var mytestquery = $.get(
    //'http://bdxcat2.pbm.ihost.com:8983/solr/t/select',
    //{ q: 'Judy', wt: 'json', indent:'true'})
    //.done(function(data){
    //  alert("search result " + data);
    // });

 // http://bdxcat2.pbm.ihost.com:8983/solr/t/select?q=loic&rows=10&wt=json&
      //   indent=true&debugQuery=true&defType=dismax&bf=recip%28ms%28NOW%2C
      //   last_modify_date%29%2C3.16e-11%2C0.08%2C0.05%29^2.0
  // The way q.alt works is that if i dont quote val1, i get the OR function there ....
  // q.alt entry -> (text:dustin running && !current_status:"Completed - Closed" && !current_status:"Canceled") OR text:dustin running
  // q.alt entry -> (text:judy && !current_status:"Completed - Closed" && !current_status:"Canceled") OR text:judy

  var mytestquery = jQuery.ajax({
    //url: 'http://bdxcat2.pbm.ihost.com:8983/solr/t/select',
    var sd = parseInt(home) - parseInt(away)
     url: 'http://localhost:6001/scoreprediction/' + sd + '/' + tl + '/' + spr,
     data:  {},
      success: function (data){
        //console.log("output =" + $.data)
        console.log("data = "+ JSON.stringify(data.response.docs));
        //console.log("data = "+ JSON.stringify(data.response, undefined,2 ));
        //$('#table_to_mod table > tbody:first').find('tr:first').before(data.response.docs[1]);
        //var newjson = JSON.parse(data.result)
        $('#table_to_mod').empty();
        var tr;
        tr = $('<tr>');
        var headerRow;
        // This is code to take first json record returned and create headers base on that.
        // This didnt work so well so take 2
        //headerRow="";
        //$.each(data.response.docs[0], function(key, value) {
        //    headerRow += "<th>" + key + "</th>";
        //});
        headerRow = "<th>Winner</th>"
        headerRow += "<th>Probability</th>"



        tr.append(headerRow);
        tr.append('</tr>');
        $('#table_to_mod').append(tr);
        //typeof(myVariable) != "undefined"
        console.log("Number of hits returned = "+ data.response.docs.length);

        for (var i = 0; i < data.response.docs.length; i++) {
          tr = $('<tr>');

          rowData ="<td><small>" + data.response.docs[i].e0X + "<br>";
          rowData += "</small></td>";
          rowData ="<td><small>" + data.response.docs[i].probability + "<br>";
          rowData += "</small></td>";

          tr.append(rowData);
          tr.append('</tr>');

          $('#table_to_mod').append(tr);
          //console.log(tr);
        }

      },
      dataType: 'jsonp',
      jsonp: 'json.wrf'
   });
  $('#resultTableTbl').show();
  $('#resultTableStr').show();
  return false;
}
