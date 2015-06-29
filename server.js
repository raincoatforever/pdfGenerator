var express = require('express');
var app = express();
var conversion = require("phantom-html-to-pdf")();

//Constants
var REPORT_TYPE_EMPLOYEE_DISPATCH_A = "employeeWeeklyDispatch";
var TABLE_HEADER_NAME = "Name";
var TABLE_HEADER_TRADE = "Trade";
var TABLE_HEADER_EMPLOYEE_ID = "Employee ID";

var mu = require('mu2'); 

mu.root = __dirname + '/templates'


var data2="";
app.post('/trial', function (req, res) {

    var jsonPostBody="";
    req.on('data', function(chunk) {
      jsonPostBody = jsonPostBody + chunk;
    });
    
    req.on('end', function() {
        var jsonObj = JSON.parse(jsonPostBody.toString());

        jsonObj.rdata.data.datesArray = function(){
            return this.dates.map(function (date) {
                return {src: date};
            });
        };

        console.log(jsonObj.rdata);
        // var data = {brands: obj.data['dates'].map(function(x){ return {name: x}; })};
        var data2 = "";
        mu.compileAndRender('employeeWeeklyDispatch.html', jsonObj.rdata)
            .on('data', function (data1) {
                //console.log(data1.toString());
                data2 += data1.toString();
            })
            .on('end', function (){
                conversion({ html: data2.toString() }, function(err, pdf) {
                    console.log(pdf.numberOfPages);
                    pdf.stream.pipe(res);
                });
            });
    });
});

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
        
        //console.log(jsonPostBody);
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

    var htmlBody;
    switch(reportType) {
        case REPORT_TYPE_EMPLOYEE_DISPATCH_A:
            htmlBody = GenerateReportEmployeeDispatchA(jsonObj.rdata);
            break;
        default:
            htmlBody = "<body></body>";
    }

    var html = "<html>"
        + HTML_HEAD 
        + htmlBody
        + "</html>";

    return html;
}
    
function GenerateReportEmployeeDispatchA(jsonObj) {
    var reportData = jsonObj.data;
    var title = jsonObj.title;

    var dateArray = reportData.dates;
    console.log(dateArray);

    var tableHeaders = "<tr>"
        + "<th>" + TABLE_HEADER_TRADE + "</th>"
        + "<th>" + TABLE_HEADER_EMPLOYEE_ID + "</th>"
        + "<th>" + TABLE_HEADER_NAME + "</th>";

    for (var i = 0; i < dateArray.length; i++) {
        tableHeaders += "<th>" + dateArray[i] + "</th>";
    }

    tableHeaders += "</tr>";

    var employees = reportData.employees;

    var tableRows = "<tbody>";
    for (var i =  0; i < employees.length; i++) {
        var employee = employees[i];
        var employeeId = employee.emp_id;
        var trade = employee.trade;
        var name = employee.name;
        var workSites = employee.work_sites;

        tableRows += "<tr>";
        tableRows += "<td>" + trade + "</td>";
        tableRows += "<td>" + employeeId + "</td>";
        tableRows += "<td>" + name + "</td>";
        
        // workSites can be mapped to headers using dates, for now it is associated with dateArray    
        for (var j = 0; j < dateArray.length; j++) {
            tableRows += "<td>" + workSites[j].site + "</td>";
        }
        tableRows += "</tr>"
    }

    tableRows += "</tbody>";

    var table = "<table class=\"table table-bordered\">" + tableHeaders + tableRows +"</table>";
    var htmlBody = "<body>" + table + "</body>";
    return htmlBody;
}