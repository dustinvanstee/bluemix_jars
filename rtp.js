// <script src="https://rawgit.com/dustinvanstee/bluemix_jars/master/rtp.js"></script>

function handleClick(home,away,tl,spr,teamh,teama) {
  //console.log("search value = " + val1)
    //var mytestquery = $.get(
    //'http://bdxcat2.pbm.ihost.com:8983/solr/t/select',
    //{ q: 'Judy', wt: 'json', indent:'true'})
    //.done(function(data){
    //  alert("search result " + data);
    // });

  var sd =  parseInt(home) - parseInt(away)
  console.log("sd =" + sd);
  //console.log('http://localhost:6001/scoreprediction/' + sd + '/' + tl + '/' + spr)

  var mytestquery = jQuery.ajax({
    //url: 'http://bdxcat2.pbm.ihost.com:8983/solr/t/select',
     //url: 'http://localhost:6001/scoreprediction/' + sd + '/' + tl + '/' + spr,
     url: 'http://nba-rt-prediction.mybluemix.net/scoreprediction/' + sd + '/' + tl + '/' + spr,
    success: function (data){
        //console.log("output =" + $.data)
        console.log("data = "+ JSON.stringify(data));
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
        console.log("Number of hits returned = "+ data.length);

        for (var i = 0; i < data.length; i++) {
          tr = $('<tr>');
          var team = teama
          if(parseFloat( data[i].probability) < 0.5) {
            team = teamh
            data[i].probability = 1 - parseFloat( data[i].probability)
          }

          var rowData ="<td><small>" + team + "<br>";
          rowData += "</small></td>";
          rowData +="<td><small>" + data[i].probability + "<br>";
          rowData += "</small></td>";

          tr.append(rowData);
          tr.append('</tr>');

          $('#table_to_mod').append(tr);
          //console.log(tr);
        }

      },
      error: function (data) {
         console.log("Error")
      }
   });
  $('#resultTableTbl').show();
  $('#resultTableStr').show();
  return false;
}
