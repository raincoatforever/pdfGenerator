var express = require('express');
var app = express();
var conversion = require("phantom-html-to-pdf")();

//Constants
var REPORT_TYPE_EMPLOYEE_DISPATCH_A = "emp-dispatch-a";
var TABLE_HEADER_NAME = "Name";
var TABLE_HEADER_TRADE = "Trade";
var TABLE_HEADER_EMPLOYEE_ID = "Employee ID";

app.get('/', function (req, res) {
    conversion({ html: "<h1>Hello World</h1>" }, function(err, pdf) {
    console.log(pdf.numberOfPages);
    pdf.stream.pipe(res);
    });
});

app.post('/pdfGenerate', function(req, res){
    //var htmlPostBody = req.body;
    var jsonPostBody="";
    req.on('data', function(chunk) {
      console.log("Received body data:");
      console.log(chunk.toString());
      jsonPostBody = jsonPostBody + chunk;
    });
    
    req.on('end', function() {
        
        console.log(jsonPostBody);
        var html = createHTMLFromJSON(jsonPostBody.toString());
        
        
        conversion({ html: html }, function(err, pdf) {
        console.log(pdf.numberOfPages);
        pdf.stream.pipe(res);
        });
          
    });
    
    
    

});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


function createHTMLFromJSON(jsonData) {
    var jsonObj = JSON.parse(jsonData);
    var reportType = jsonObj.rtype;
    
    var html;
    switch(reportType) {
    case REPORT_TYPE_EMPLOYEE_DISPATCH_A:
    html = GenerateReportEmployeeDispatchA(jsonObj.rdata);
    break;
    default:
    html = "<html></html>";
    break;
    }
    
    return html;
    }
    
    function GenerateReportEmployeeDispatchA(jsonObj) {
    var desc = jsonObj.desc;
    var jsonRows = jsonObj.rows;
    var dispatchHeaders = jsonObj.dispatch_headers;
    
    var tableHeaders = "<tr>"
     + "<th>" + TABLE_HEADER_TRADE + "</th>"
     + "<th>" + TABLE_HEADER_EMPLOYEE_ID + "</th>"
     + "<th>" + TABLE_HEADER_NAME + "</th>";
    
    for (var i = 0; i < dispatchHeaders.length; i++) {
    tableHeaders += "<th>" + dispatchHeaders[i] + "</th>";
    }
    
    tableHeaders += "</tr>";
    
    var tableRows = "<tbody>";
    for (var i =  0; i < jsonRows.length; i++) {
    var row = jsonRows[i];
    var empId = row.emp_id;
    var trade = row.trade;
    var name = row.name;
    var dispatchData = row.dispatch_data;
    
    tableRows += "<tr>";
    tableRows += "<td>" + trade + "</td>";
    tableRows += "<td>" + empId + "</td>";
    tableRows += "<td>" + name + "</td>";
    
    for (var j = 0; j < dispatchHeaders.length; j++) {
    tableRows += "<td>" + dispatchData[j] + "</td>";
    }
    
    tableRows += "</tr>"
    }
    
    tableRows += "</tbody>";
    
    var html = "<html><head>" 
             + "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css\">" 
             + "<link rel=\"stylesheet\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css\">" 
             + "<script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js\"></script>" 
             + "</head><body><table class=\"table table-bordered\">" + tableHeaders + tableRows +"</table></body></html>";
    return html;
}