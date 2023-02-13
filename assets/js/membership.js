const sheetLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQw9dnNTnqCVhqEiO9dL6YUc7ON8nn_lpeA3FT8keeC0MvKsmQg_VvsYQ-PUcRqEa2BXeBCsKgXL9XI/pubhtml?gid=1836798423&single=true";
const table = document.getElementById("leaders").getElementsByTagName("tbody")[0];

function makeHttpObject() {
    try { return new XMLHttpRequest(); }
    catch (error) { }
    try { return new ActiveXObject("Msxml2.XMLHTTP"); }
    catch (error) { }
    try { return new ActiveXObject("Microsoft.XMLHTTP"); }
    catch (error) { }
    throw new Error("Could not create HTTP request object.");
}

var request = makeHttpObject();
request.open("GET", sheetLink, true);
request.send(null);
request.onreadystatechange = function () {
    if (request.readyState == 4) {
        response = request.responseText;
        const parser = new DOMParser().parseFromString(response, "text/html");
        sheet = Array.from(parser.getElementsByTagName("tr"));
        sheet.splice(0, 1);
        header = sheet[0].getElementsByTagName("td");
        columns = [];
        for (let i = 0; i < header.length; i++) {
            columns.push(header[i].innerText);
        }
        sheet.splice(0, 2);
        for (let i = 0; i < sheet.length; i++) {
            const row = document.createElement("tr");
            row.setAttribute("scope", "row");
            const original = sheet[i].getElementsByTagName("td");

            // name
            const name = document.createElement("td");
            name.appendChild(document.createTextNode(original[0].innerText));
            row.appendChild(name);
            // grade
            const grade = document.createElement("td");
            grade.appendChild(document.createTextNode(original[2].innerText));
            row.appendChild(grade);
            // points
            const points = document.createElement("td");
            points.appendChild(document.createTextNode(original[3].innerText));
            row.appendChild(points);

            table.appendChild(row);
        }
        $('#leaders').DataTable({
            order: [[2, 'desc']],
        });;
    }
};