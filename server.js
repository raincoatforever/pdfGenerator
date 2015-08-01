var express = require('express');


var app = express();
var conversion = require("phantom-html-to-pdf")();

//Constants

// make sure report type matches template file name
var REPORT_TYPE_DISPATCH_BOARD = "DispatchBoardReport";
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

var OPTIONS_A3_LANDSCAPE = {margin:"0.5cm", orientation:"landscape", format:"A3"};

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

cmp = function(x, y) {
    return x > y ? 1 : x < y ? -1 : 0; 
};

function createHTMLFromJSON(jsonData, res) {
    var jsonObj = JSON.parse(jsonData);
    var reportType = jsonObj.rtype;

    var htmlBody;
    switch(reportType.toLowerCase()) {
        case REPORT_TYPE_EMPLOYEE_WEEKLY_DISPATCH.toLowerCase():
            generateReportEmployeeWeeklyDispatch(jsonObj, res);
            break;
        case REPORT_TYPE_DISPATCH_BOARD.toLowerCase():
            generateDispatchBoardReport(jsonObj, res);
            break;
        case REPORT_TYPE_EMPLOYEE_WEEKLY_TIMECARD.toLowerCase():
            generateReportEmployeeWeeklyTimecard(jsonObj, res);
            break;
    }
}

function separateEmployeesAccordingToTrade(site) {
    var carpenters = [];
    var masons = [];
    var laborers = [];
    var cCount = mCount = lCount = 0;
    for (var j = 0; j < site.employees.length; j++) {
        var employee = site.employees[j];
        employee.color = getEmployeeColorCode(employee); // get color according to trade
        if (employee.trade.toLowerCase() == CARPENTER.toLowerCase()) {
            carpenters[cCount] = employee;
            cCount++;
        } else if (employee.trade.toLowerCase() == MASON.toLowerCase()) {
            masons[mCount] = employee;
            mCount++;
        } else if (employee.trade.toLowerCase() == LABORER.toLowerCase()) {
            laborers[lCount] = employee;
            lCount++;
        }
    }

    var max = Math.max(cCount, lCount, mCount);
    site.rows = [];
    for (var j = 0; j < max; j++) {
        var carpenter = carpenters[j];
        var mason = masons[j];
        var laborer = laborers[j];
        site.rows[j] = {};
        if (carpenter != null) {
            site.rows[j].carpenter = carpenter;
        }
        if (mason != null) {
            site.rows[j].mason = mason;
        }
        if (laborer != null) {
            site.rows[j].laborer = laborer;
        }
    }

    return site;
}

function generateDispatchBoardReport(jsonObj, res) {
    var sites = jsonObj.rdata.data.sites;
    var pages = [];
    var page = [];
    var pageCount = -1;

    var offEmployees = {};
    offEmployees.site_name = "Off";
    offEmployees.employees = jsonObj.rdata.data.off;
    sites.push(offEmployees);

    for (var i = 0; i < sites.length; i++) {
        sites[i].employees = sites[i].employees.sort(function(emp_a, emp_b) {
            return cmp(
                 [cmp(emp_a.trade, emp_b.trade), cmp(emp_a.emp_name, emp_b.emp_name)], 
                 [cmp(emp_b.trade, emp_a.trade), cmp(emp_b.emp_name, emp_a.emp_name)]
                );
        });
        var site = separateEmployeesAccordingToTrade(sites[i]);
        if ((i % 4) == 0) {
            if (pageCount != -1) {
                pages.push({"page": page});
                page = [];
            }
            pageCount++;
        }
        page.push(site);
    }

    pages.push({"page": page});
    jsonObj.rdata.data.pages = pages;
    generatePdfAndRespond(REPORT_TYPE_DISPATCH_BOARD, jsonObj.rdata, OPTIONS_A3_LANDSCAPE, res);
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

    jsonObj.rdata.data.employees=jsonObj.rdata.data.employees.sort(function(emp_a, emp_b) {
            return cmp(
                 [cmp(emp_a.trade, emp_b.trade), cmp(emp_a.emp_name, emp_b.emp_name)], 
                 [cmp(emp_b.trade, emp_a.trade), cmp(emp_b.emp_name, emp_a.emp_name)]
                );
    });

    for (var i = 0; i < jsonObj.rdata.data.employees.length; i++) {
        var totalHours = [0, 0, 0];
        var employee = jsonObj.rdata.data.employees[i];
        employee.noOfJobs = employee.jobs.length;
        employee.color = getEmployeeColorCode(employee);

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
    generatePdfAndRespond(REPORT_TYPE_EMPLOYEE_WEEKLY_TIMECARD, jsonObj.rdata, OPTIONS_A3_LANDSCAPE, res);
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

    // sort employees acc to trade and name
    jsonObj.rdata.data.employees=jsonObj.rdata.data.employees.sort(function(emp_a, emp_b) {
            return cmp(
                 [cmp(emp_a.trade, emp_b.trade), cmp(emp_a.emp_name, emp_b.emp_name)],
                 [cmp(emp_b.trade, emp_a.trade), cmp(emp_b.emp_name, emp_a.emp_name)]
                );
    });

    // sort work_sites acc to dates
    jsonObj.rdata.data.employees.forEach( function(employee) {
        employee.work_sites.sort(function(work_site_a, work_site_b) {
            return cmp( new Date(work_site_a.date) , new Date(work_site_b.date) );
        });
    });

    var data = [];
    var datesHeader = [];
    var datesCount = 0;
    var pageCount = 0;
    var employee = jsonObj.rdata.data.employees[0];
    if (employee != null) {
        var work_sites = employee.work_sites;
        for (var i = 0; i < work_sites.length; i++) {
            datesHeader[datesCount] = {header : work_sites[i].day + " " + work_sites[i].date};
            datesCount++;

            if ((i % 7) == 6) {
                data[pageCount] = {};
                data[pageCount].datesHeader = datesHeader;
                datesHeader = [];
                datesCount = 0;
                pageCount++;
            }
        }

        if ((i % 7) != 0) {
            data[pageCount] = {};
            data[pageCount].datesHeader =  datesHeader;
            pageCount++;
        }
    }

    for (var i = 0; i < pageCount; i++) {
        var employees = [];
        for (var j = 0; j < jsonObj.rdata.data.employees.length; j++) {
            employee = {};
            employee = jsonObj.rdata.data.employees[j];
            var start = i * 7;
            var end = start + 7;
            var tmpSites = employee.work_sites;
            employee.work = tmpSites.slice(start, end);
            employee.color = getEmployeeColorCode(employee);
            employees[j] = employee;
        }

        data[i].employeesArray = employees;
    }

    jsonObj.rdata.data = data;
    jsonObj.rdata.header_color = COLOR[WEEKLY_DISPATCH_HEADER];
    generatePdfAndRespond(REPORT_TYPE_EMPLOYEE_WEEKLY_DISPATCH, jsonObj.rdata, OPTIONS_A3_LANDSCAPE, res);
}