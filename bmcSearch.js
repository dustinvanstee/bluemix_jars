// TODO : Hyperlink bmid to netdb for now ...


function handleClick(val1) {
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
      url: 'http://bdxcat2.pbm.ihost.com:8983/solr/t/select',
      data:  {'q.alt': '(text:'+val1 + ' AND !current_status:"Completed - Closed" AND !current_status:"Canceled") OR text:'+val1 , wt: 'json', indent:'true', rows:'20', defType:'dismax', bf:'recip(ms(NOW,last_modify_date),1.5e-11,0.08,0.05)^2.0'},
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
        headerRow = "<th>bmid</th>"
        headerRow += "<th>project_team      </th>"
        headerRow += "<th>company_name</th>"
        headerRow += "<th>modify_date</th>"
        headerRow += "<th>current_status</th>"
        headerRow += "<th>project_type</th>"
        headerRow += "<th>project_abstract</th>"
        headerRow += "<th>status_comment</th>"


        tr.append(headerRow);
        tr.append('</tr>');
        $('#table_to_mod').append(tr);
        //typeof(myVariable) != "undefined"
        console.log("Number of hits returned = "+ data.response.docs.length);

        for (var i = 0; i < data.response.docs.length; i++) {
          tr = $('<tr>');
          var rowData;
          var hyperlink = 'http://webserv1.pbm.ihost.com:8080/Network/displaySearchResults.jsp'
              hyperlink += '?txtSortByPrimary=&txtSortDirectionPrimary=ASC&txtSortBySecondary=&txtSortDirectionSecondary=ASC&txtSortByTertiary=&'
              hyperlink += 'txtSortDirectionTertiary=ASC&chkVlan=on&txtVlan=&txtMedia=&txtSwitch=&txtPort=&txtJack=&chkRack=on&txtRack=&chkCable=on&'
              hyperlink += 'txtCable=&chkIPAddress=on&txtIPAddress=&chkMask=on&txtMask=&chkGateway=on&txtGateway=&txtIesGroup=&txtExempt=&txtDNS=&'
              hyperlink += 'chkMTU=on&txtMTU=&chkSpeed=on&txtSpeed=&chkDup=on&txtDup=&txtPF=&txtDevice=&txtSerialNum=&txtRackUNum=&txtIntLoc=&'
              hyperlink += 'chkComment=on&txtComment=&chkNotes=on&txtNotes=&chkClientName=on&txtClientName='
              hyperlink +=  data.response.docs[i].bmid
              hyperlink += '&chkInfra=on&txtInfra=&numOfRecordReturn=200&txtReportTitle=&submit=Search;'



          var inventoryHyperlink = 'http://webserv1.pbm.ihost.com/inventory/InvMgmt/manage_inv.pl?config=search_component&'
              inventoryHyperlink += 'benchmark_id=' + data.response.docs[i].bmid

          rowData ="<td><small>" + data.response.docs[i].bmid + "<br>";
          rowData += "<a href=\""+hyperlink+"\">"
          rowData += "<span class=\"label label-success\">netdb</span>" + "<br>"
          //rowData += "<a href=\""+inventoryHyperlink+"\">"
          //rowData += "<span class=\"label label-success\">inventory</span>" + "<br>"
          rowData += "<a href=\""+data.response.docs[i].notes_link+"\">"
          rowData += "<span class=\"label label-success\">opra</span>" + "<br>";

          rowData += "</small></td>";

          // Adding better Logic for team members !!
          //"project_lead":"Judy Kurkela",
          //"technical_lead":"Dustin J Vanstee",
          //"infrastructure_architect":"Lawrence P Diehl Jr",
          //"network_analyst":"Scott Strattner",
          //"system_admins":"Dustin J Vanstee",
          var projTeam = "pm:"+data.response.docs[i].project_lead+",tl:" + data.response.docs[i].technical_lead;
          projTeam += ",sa:"+ data.response.docs[i].system_admins;
          projTeam += ",inf:"+ data.response.docs[i].infrastructure_architect + ",net:"+ data.response.docs[i].network_analyst;

          var names = projTeam.split(",")
          var nameprintstring = "<td><small>";
          for (var nm=0; nm < names.length; nm++) {
              var titleandname = names[nm].split(":");
              var title = titleandname[0];
              var splitname = titleandname[1].split(" ");
              var lastNameInd = splitname.length -1;
              //console.log(nm + names[nm].[names] );
              if(splitname[lastNameInd] === "undefined") {
                splitname[lastNameInd] = "na"
              } else {
                //console.log("ln = " + splitname[lastNameInd]);
                nameprintstring += title + ":" + splitname[lastNameInd] + "<br>";
              }
          }

          nameprintstring += "</small></td>";

          rowData += nameprintstring;
          //rowData +="<td><small>" + data.response.docs[i].project_lead + "<br>" + data.response.docs[i].technical_lead + "<br>" + data.response.docs[i].system_admins + "</small></td>";
          rowData +="<td><small>" + data.response.docs[i].company_name + "</small></td>";
          if( data.response.docs[i].last_modify_date != null) {
            rowData +="<td><small>" + data.response.docs[i].last_modify_date.split('T')[0] + "</small></td>";
          } else {
            rowData += "<td><small>Not Defined</small></td>";
          }
          rowData +="<td><small>" + data.response.docs[i].current_status + "</small></td>";
          rowData +="<td><small>" + data.response.docs[i].project_type + "</small></td>";
          rowData +="<td><small>" + data.response.docs[i].project_abstract + "</small></td>";
          rowData +="<td><small>" + data.response.docs[i].status_comment + "</small></td>";
          rowData = rowData.replace(/undefined/gi, '');
          //console.log(rowData);

          // this code cycled through each json element and placed value in a table
          //$.each(data.response.docs[i], function(key, value) {
          //  rowData += "<td>" + value + "</td>";
          //});

          //tr.append("<td>" + data.response.docs[i].bmid + "</td>");
          //tr.append("<td>" + data.response.docs[i].owner + "</td>");
          //tr.append("<td>" + data.response.docs[i].domain + "</td>");
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
