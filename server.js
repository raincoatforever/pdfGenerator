var express = require('express');


var app = express();
var conversion = require("phantom-html-to-pdf")();

//Constants

// make sure report type matches template file name
var DISPATCH_BOARD_REPORT = "DispatchBoardReport";
var REPORT_TYPE_EMPLOYEE_WEEKLY_DISPATCH = "EmployeeWeeklyDispatch";
var REPORT_TYPE_EMPLOYEE_WEEKLY_TIMECARD = "EmployeeWeeklyTimecard";
var TABLE_HEADER_NAME = "Name";
var TABLE_HEADER_TRADE = "Trade";
var TABLE_HEADER_EMPLOYEE_ID = "Employee ID";
var TEMPLATES_PATH = "/templates";

var CARPENTER = "Carpenter";
var MASON = "Mason";
var LABORER = "Laborer";
var DEFAULT = "Default";
var WEEKLY_DISPATCH_HEADER = "weeklyDispatchHeader";
var WEEKLY_TIMECARD_HEADER = "weeklyTimecardHeader";

var COLOR = {};
COLOR[CARPENTER] = "#66ffff";
COLOR[MASON] = "#ffff00";
COLOR[LABORER] = "#66ff66";
COLOR[DEFAULT] = "#ffffff";
COLOR[WEEKLY_DISPATCH_HEADER] = "#6495ed";
COLOR[WEEKLY_TIMECARD_HEADER] = "#bdbdbd";

var jsonObjForConversion = "{\"rtype\":\"employeeWeeklyDispatch\",\r\n\"rdata\":{\"title\":\"Employee Dispatch Report : Bay Area Concrete\", \"week_range\":\"Week Ending 2015-06-13\",\"data\":{\"dates\":[\"Sun 6\/7\",\"Mon 6\/8\",\"Tue 6\/9\",\"Wed 6\/10\", \"Thu 6\/11\", \"Fri 6\/12\", \"Sat 6\/13\"], \"employees\":[{\"emp_id\": 131000,\"trade\":\"Carpenter\", \"name\":\"Alexis Romero\",\"work_sites\":[{\"date\":\"Sun 6\/7\", \"site\": \"\"},{\"date\": \"Mon 6\/8\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Tue 6\/9\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Wed 6\/10\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Thu 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Fri 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Sat 6\/12\", \"site\":\"Genentech 9 Seismic Upgrade\"}]},{\"emp_id\": 131899,\"trade\":\"Mason\", \"name\":\"Alvaro Diaz\",\"work_sites\":[{\"date\":\"Sun 6\/7\", \"site\": \"\"},{\"date\": \"Mon 6\/8\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Tue 6\/9\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Wed 6\/10\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Thu 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Fri 6\/11\", \"site\":\"Genentech 9 Seismic Upgrade\"},{\"date\": \"Sat 6\/12\", \"site\":\"Genentech 9 Seismic Upgrade\"}]}]}}}"; 

var dispatchBoardTestingString = "{\r\n  \"rtype\": \"DispatchBoardReport\",\r\n  \"rdata\": {\r\n    \"title\": \"Week from --- to ---\",\r\n    \"data\": [\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"BioMarin PG\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      },\r\n      {\r\n        \"site\": \"LPCH\",\r\n        \"employees\": [\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          },\r\n          {\r\n            \"id\": \"123\",\r\n            \"name\": \"AJ\",\r\n            \"trade\": \"Carpenter\"\r\n          }\r\n        ]\r\n      }\r\n    ]\r\n  }\r\n}";


var mu = require('mu2'); 

mu.root = __dirname + TEMPLATES_PATH;

var server = app.listen(process.env.PORT || 3000, function () {

  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/pussy', function (req, res) {

  var jsonPostBody = dispatchBoardTestingString.toString();
  console.log(jsonPostBody);
  createHTMLFromJSON(jsonPostBody.toString(), res);
});

app.get('/healthcheck', function (req, res) {
  res.sendStatus(200);
  res.end();
});

app.post('/pdfGenerate', function(req, res){
    var jsonPostBody="";
    req.on('data', function(chunk) {
        jsonPostBody = jsonPostBody + chunk;
    });
    
    req.on('end', function() {
        createHTMLFromJSON(jsonPostBody.toString(), res);  
    });
});


function createHTMLFromJSON(jsonData, res) {
    var jsonObj = JSON.parse(jsonData);
    var reportType = jsonObj.rtype;

    var htmlBody;
    switch(reportType.toLowerCase()) {
        case REPORT_TYPE_EMPLOYEE_WEEKLY_DISPATCH.toLowerCase():
            generateReportEmployeeWeeklyDispatch(jsonObj, res);
            break;
        case DISPATCH_BOARD_REPORT.toLowerCase():
            generateDispatchBoardReport(jsonObj, res);
            break;
        case REPORT_TYPE_EMPLOYEE_WEEKLY_TIMECARD.toLowerCase():
            generateReportEmployeeWeeklyTimecard(jsonObj, res);
            break;
    }
}

function generateDispatchBoardReport(jsonObj, res) {
    
    //console.log( JSON.stringify(jsonObj.rdata.off) );
    jsonObj.rdata.offEmployeesArray = function() {
        return this.off.map(function (employee) {
            employee.color = getEmployeeColorCode(employee);
            return employee;
        });
    };

    for( var i=0; i < jsonObj.rdata.data.length; i++) {

        var dataNode = jsonObj.rdata.data[i];

        dataNode.employeesArray = function() {
            return this.employees.map(function (employee) {
                employee.color = getEmployeeColorCode(employee);
                return employee;
            });
        };
    }

    generatePdfAndRespond(DISPATCH_BOARD_REPORT, jsonObj.rdata, null, res);
}

/* @params
  template - file name of the template to be used
  data - json object to use to render template
  customPaperSize - map containing the paper size, 'null' for default size (for accepted map values http://phantomjs.org/api/webpage/property/paper-size.html)
  response - response to be used to send pdf back to caller
*/
function generatePdfAndRespond(template, data, customPaperSize, response) {
    var renderedHtml = "";
    mu.compileAndRender(template + '.html', data)
        .on('data', function (renderedData) {
            renderedHtml += renderedData.toString();
        })
        .on('end', function () {
            var opt = {};
            opt.html = renderedHtml;
            if (customPaperSize != null) {
                opt.paperSize = customPaperSize;
            }

            conversion(opt, function(err, pdf) {
                response.setHeader("Content-Type", "application/pdf");
                pdf.stream.pipe(response);
            });
        });
}

function getJobHours(job) {
    var days = ['sat', 'sun', 'mon', 'tue', 'wed', 'thu', 'fri'];
    var time = ['ot', 'dt', 'st'];
    var totalHours = [0 ,0 ,0]; // 0 - ot, 1 - dt, 2 - st
    var hours;

    for (var i = 0; i < days.length; i++) {
        for (var j = 0; j < time.length; j++) {
            hours = job.hours[days[i]][time[j]];
            if (isNumeric(hours)) {
                totalHours[j] += Number(hours);
            }
        }
    }

    return totalHours;
}

function isNumeric(num) {
    return !isNaN(num);
}

function generateReportEmployeeWeeklyTimecard(jsonObj, res) {
    var jobHours;
    for (var i = 0; i < jsonObj.rdata.data.employees.length; i++) {
        var totalHours = [0, 0, 0];
        var employee = jsonObj.rdata.data.employees[i];
        employee.noOfJobs = employee.jobs.length;

        var firstJob = employee.jobs.splice(0, 1);
        employee.firstJob = firstJob[0];
        jobHours = getJobHours(employee.firstJob);
        employee.firstJob.jobHours = Number(jobHours[0]) + Number(jobHours[1]) + Number(jobHours[2]);
        totalHours[0] += Number(jobHours[0]);
        totalHours[1] += Number(jobHours[1]);
        totalHours[2] += Number(jobHours[2]);
        
        for (var j = 0; j < employee.noOfJobs - 1; j++) {
            jobHours = getJobHours(employee.jobs[j]);
            employee.jobs[j].jobHours = Number(jobHours[0]) + Number(jobHours[1]) + Number(jobHours[2]);
            totalHours[0] += Number(jobHours[0]);
            totalHours[1] += Number(jobHours[1]);
            totalHours[2] += Number(jobHours[2]);
        }

        employee.totalOtHours = totalHours[0];
        employee.totalDtHours = totalHours[1];
        employee.totalStHours = totalHours[2];
        employee.totalHours = totalHours[0] + totalHours[1] + totalHours[2];
    }

    jsonObj.rdata.header_color = COLOR[WEEKLY_TIMECARD_HEADER];
    generatePdfAndRespond(REPORT_TYPE_EMPLOYEE_WEEKLY_TIMECARD, jsonObj.rdata, {margin:"0.5cm", orientation:"landscape", format:"A3"}, res);
}

//Returns employee colors code according to trade
function getEmployeeColorCode(employee) {
    var color = COLOR.DEFAULT;
    if (employee.trade.toLowerCase() == CARPENTER.toLowerCase()) {
        color = COLOR[CARPENTER];
    } else if (employee.trade.toLowerCase() == MASON.toLowerCase()) {
        color = COLOR[MASON];
    } else if (employee.trade.toLowerCase() == LABORER.toLowerCase()) {
        color = COLOR[LABORER];
    }
    return color;
}

function generateReportEmployeeWeeklyDispatch(jsonObj, res) {

    jsonObj.rdata.header_color = COLOR[WEEKLY_DISPATCH_HEADER];
    // convert array to map-array
    jsonObj.rdata.data.datesArray = function() {
        return this.dates.map(function (date) {
            return {src: date};
        });
    };

    // add color according to trade
    jsonObj.rdata.data.employeesArray = function() {
        return this.employees.map(function (employee) {
            employee.color = getEmployeeColorCode(employee);
            return employee;
        });
    };

    generatePdfAndRespond(REPORT_TYPE_EMPLOYEE_WEEKLY_DISPATCH, jsonObj.rdata, null, res);
}