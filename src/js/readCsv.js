import * as Papa from "papaparse"

const readCSV = (file) => {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.addEventListener('load', (event) => {
    const csvData = Papa.parse(reader.result, { header: true });

    if (csvData.errors.length) {
      console.error(JSON.stringify(csvData.errors))
      document.getElementById('errorMessage').innerHTML = "* Error parsing CSV: " + JSON.stringify(csvData.errors)
    } else {
      return csvData
    }
  });
}

export { readCSV };