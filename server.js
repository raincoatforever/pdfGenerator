var express = require('express');
var app = express();
var conversion = require("phantom-html-to-pdf")();

//Constants
var REPORT_TYPE_EMPLOYEE_DISPATCH_A = "employeeWeeklyDispatch";
var TABLE_HEADER_NAME = "Name";
var TABLE_HEADER_TRADE = "Trade";
var TABLE_HEADER_EMPLOYEE_ID = "Employee ID";

var jsonObjForConversion = "{\"rtype\":\"employeeWeeklyDispatch\",\r\n\"rdata\":{\"title\":\"Employee Dispatch Report : Bay Area Concrete\", \"week_range\":\"Week Ending 2015-06-13\",\"data\":{\"dates\":[\"Sun 6\/7\",\"Mon 6\/8\",\"Tue 6\/9\",\"Wed 6\/10\", \"Thu 6\/11\", \"Fri 6\/12\", \"Sat 6\/13\"], \"employees\":[{\"emp_id\": 131000,\"trade\":\"Carpenter\", \"name\":\"Alexis Romero\",\"work_sites\":[{\"date\":\"Sun 6\/7\", \"site\": \"\"},{\"date\": \"Mon 6\/8\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Tue 6\/9\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Wed 6\/10\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Thu 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Fri 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Sat 6\/12\", \"site\":\"Genentech 9 Seismic Upgrade\"}]},{\"emp_id\": 131899,\"trade\":\"Mason\", \"name\":\"Alvaro Diaz\",\"work_sites\":[{\"date\":\"Sun 6\/7\", \"site\": \"\"},{\"date\": \"Mon 6\/8\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Tue 6\/9\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Wed 6\/10\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Thu 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Fri 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Sat 6\/12\", \"site\":\"Genentech 9 Seismic Upgrade\"}]}]}}}"; 

var mu = require('mu2'); 

mu.root = __dirname + '/templates'

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('template chya aai cha path-', mu.root);
  console.log('Example app listening at http://%s:%s', host, port);

});

app.get('/pussy', function (req, res) {
  var jsonPostBody= jsonObjForConversion.toString();
  console.log(jsonPostBody);
  createHTMLFromJSON(jsonPostBody.toString(), res);
});

function createHTMLFromJSON(jsonData, res) {
    var jsonObj = JSON.parse(jsonData);
    var reportType = jsonObj.rtype;

    var htmlBody;
    switch(reportType) {
        case REPORT_TYPE_EMPLOYEE_DISPATCH_A:
            GenerateReportEmployeeWeeklyDispatch(jsonObj, res);
            break;
    }
}

function GenerateReportEmployeeWeeklyDispatch(jsonObj, res) {

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
                res.contentType('text/html');
                res.send(renderedHtml);
            });
}
