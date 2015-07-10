var express = require('express');


var app = express();
var conversion = require("phantom-html-to-pdf")();

//Constants
var REPORT_TYPE_EMPLOYEE_DISPATCH_A = "employeeWeeklyDispatch";
var DISPATCH_BOARD_REPORT = "DispatchBoardReport";
var TABLE_HEADER_NAME = "Name";
var TABLE_HEADER_TRADE = "Trade";
var TABLE_HEADER_EMPLOYEE_ID = "Employee ID";

var jsonObjForConversion = "{\"rtype\":\"employeeWeeklyDispatch\",\r\n\"rdata\":{\"title\":\"Employee Dispatch Report : Bay Area Concrete\", \"week_range\":\"Week Ending 2015-06-13\",\"data\":{\"dates\":[\"Sun 6\/7\",\"Mon 6\/8\",\"Tue 6\/9\",\"Wed 6\/10\", \"Thu 6\/11\", \"Fri 6\/12\", \"Sat 6\/13\"], \"employees\":[{\"emp_id\": 131000,\"trade\":\"Carpenter\", \"name\":\"Alexis Romero\",\"work_sites\":[{\"date\":\"Sun 6\/7\", \"site\": \"\"},{\"date\": \"Mon 6\/8\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Tue 6\/9\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Wed 6\/10\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Thu 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Fri 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Sat 6\/12\", \"site\":\"Genentech 9 Seismic Upgrade\"}]},{\"emp_id\": 131899,\"trade\":\"Mason\", \"name\":\"Alvaro Diaz\",\"work_sites\":[{\"date\":\"Sun 6\/7\", \"site\": \"\"},{\"date\": \"Mon 6\/8\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Tue 6\/9\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Wed 6\/10\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Thu 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Fri 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Sat 6\/12\", \"site\":\"Genentech 9 Seismic Upgrade\"}]}]}}}"; 

//var dispatchBoardTestingString = "{\n  \"rtype\": \"DispatchBoardReport\",\n  \"rdata\": {\n    \"title\": \"Week from --- to ---\",\n    \"data\": [\n      {\n        \"site\": \"LPCH\",\n        \"employees\": [\n          {\n            \"id\": \"123\",\n            \"name\": \"AJ\",\n            \"trade\": \"Carpenter\"\n          },\n          {\n            \"id\": \"123\",\n            \"name\": \"AJ\",\n            \"trade\": \"Carpenter\"\n          },\n          {\n            \"id\": \"123\",\n            \"name\": \"AJ\",\n            \"trade\": \"Carpenter\"\n          }\n        ]\n      },\n      {\n        \"site\": \"BioMarin PG\",\n        \"employees\": [\n          {\n            \"id\": \"123\",\n            \"name\": \"AJ\",\n            \"trade\": \"Carpenter\"\n          },\n          {\n            \"id\": \"123\",\n            \"name\": \"AJ\",\n            \"trade\": \"Carpenter\"\n          },\n          {\n            \"id\": \"123\",\n            \"name\": \"AJ\",\n            \"trade\": \"Carpenter\"\n          }\n        ]\n      }\n    ]\n  }\n}";

var dispatchBoardTestingString = "{\r\n  \"rtype\": \"DispatchBoardReport\",\r\n  \"rdata\": {\r\n    \"title\": \"Week from --- to ---\",\r\n    \"data\": [\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"BioMarin PG\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  }\r\n}";


var mu = require('mu2'); 

mu.root = __dirname + '/templates'

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('template chya aai cha path-', mu.root);
  console.log('Example app listening at http://%s:%s', host, port);

});

app.get('/pussy', function (req, res) {
  //var jsonPostBody= jsonObjForConversion.toString();
  var jsonPostBody = dispatchBoardTestingString.toString();
  console.log(jsonPostBody);
  createHTMLFromJSON(jsonPostBody.toString(), res);
});

app.get('/healthcheck', function (req, res) {
  res.sendStatus(200);
  res.end();
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
        createHTMLFromJSON(jsonPostBody.toString(), res);
        
        
          
    });
});


function createHTMLFromJSON(jsonData, res) {
    var jsonObj = JSON.parse(jsonData);
    var reportType = jsonObj.rtype;

    var htmlBody;
    switch(reportType.toLowerCase()) {
        case REPORT_TYPE_EMPLOYEE_DISPATCH_A.toLowerCase():
            GenerateReportEmployeeWeeklyDispatch(jsonObj, res);
            break;

        case DISPATCH_BOARD_REPORT.toLowerCase():
            GenerateDispatchBoardReport(jsonObj, res);
            break;
    }
}

function GenerateDispatchBoardReport(jsonObj, res) {

    console.log(JSON.stringify(jsonObj));
    console.log(jsonObj.rdata.data);

    for( var i=0; i < jsonObj.rdata.data.length; i++){

        var dataNode = jsonObj.rdata.data[i];
        console.log(JSON.stringify(dataNode.site));


        dataNode.employeesArray = function() {
        //console.log(JSON.stringify(employees));
            return this.employees.map(function (employee) {
                var color = "#ffffff";
                if (employee.trade.toLowerCase() == "Carpenter".toLowerCase()) {
                    color = "#66ffff";
                } else if (employee.trade.toLowerCase() == "Mason".toLowerCase()) {
                    color = "#ffff00";
                } else if (employee.trade.toLowerCase() == "Laborer".toLowerCase()) {
                    color = "#66ff66";
                }
                
                employee.color = color;
                return employee;
            });
        };

    }

    console.log("*******************");
    //console.log(jsonObj.rdata.data.employeesArray(jsonObj.rdata.data[0].employees[0]));
    console.log("*******************");


    var renderedHtml = "";
        mu.compileAndRender('DispatchBoardReport.html', jsonObj.rdata)
            .on('data', function (renderedData) {
                renderedHtml += renderedData.toString();
            })
            .on('end', function (){
                //console.log(renderedHtml.toString());
                //res.contentType('text/html');
                //console.log(renderedHtml);
                conversion({ html: renderedHtml }, function(err, pdf) {
                    //console.log(pdf.numberOfPages);
                    res.setHeader("Content-Type", "application/pdf");
                    pdf.stream.pipe(res);
                });
                //res.send(renderedHtml);
            });

}

function GenerateReportEmployeeWeeklyDispatch(jsonObj, res) {

    jsonObj.rdata.header_color = "#6495ed";
    // convert array to map-array
        jsonObj.rdata.data.datesArray = function() {
            return this.dates.map(function (date) {
                return {src: date};
            });
        };

        // add color according to trade
        jsonObj.rdata.data.employeesArray = function() {
            return this.employees.map(function (employee) {
                var color = "#ffffff";
                if (employee.trade.toLowerCase() == "Carpenter".toLowerCase()) {
                    color = "#66ffff";
                } else if (employee.trade.toLowerCase() == "Mason".toLowerCase()) {
                    color = "#ffff00";
                } else if (employee.trade.toLowerCase() == "Laborer".toLowerCase()) {
                    color = "#66ff66";
                }
                
                employee.color = color;
                return employee;
            });
        };

        var renderedHtml = "";
        mu.compileAndRender('EmployeeWeeklyDispatch.html', jsonObj.rdata)
            .on('data', function (renderedData) {
                renderedHtml += renderedData.toString();
            })
            .on('end', function (){
                //console.log(renderedHtml.toString());
                //res.contentType('text/html');
                console.log(renderedHtml);
                conversion({ html: renderedHtml }, function(err, pdf) {
                    console.log(pdf.numberOfPages);
                    res.setHeader("Content-Type", "application/pdf");
                    pdf.stream.pipe(res);
                });
                //res.send(renderedHtml);
            });
}
