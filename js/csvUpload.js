function readFile() {
  document.getElementById('errorMessage').innerHTML = ""
  const file = document.getElementById("csvUpload").files[0];
  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function () {
    const data = Papa.parse(reader.result, { header: true });

    if (data.errors.length) {
      document.getElementById('errorMessage').innerHTML = "* Error parsing CSV: " + JSON.stringify(data.errors)
      console.error(data.errors)
    } else {
      console.log( data, 'data' );

      generateTable(data.meta.fields, data.data)
    }
  };
}

function generateTable(columns, rows) {
  var result = `<table>
    <thead>
      <tr>
        @header
      <tr>
    </thead>
    <tbody>
      @body
    </tbody>
  </table>`;

  var header = "";
  columns.forEach((h) => (header += `<th>${h}</th>`));
  result = result.replace("@header", header);

  var body = "";
  rows.forEach((row) => {
    var keys = Object.keys(row)
    var b = "";
    keys.forEach((k) => {
      b += `<td>${row[k]}</td>`
    });
    body += "<tr>" + b + "</tr>"
  });
  result = result.replace("@body", body);

  console.log(result)
  document.getElementById("result").innerHTML = result;
}

export { readFile };