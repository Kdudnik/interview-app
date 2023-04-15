import * as Papa from "papaparse"

const csvRead = (file) => {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
  
    reader.addEventListener('load', (event) => {
      const csvData = Papa.parse(reader.result, { header: true });
  
      if (csvData.errors.length) {
        document.getElementById('errorMessage').innerHTML = "* Error parsing CSV: " + JSON.stringify(csvData.errors)
        reject(console.error(JSON.stringify(csvData.errors)))
      } else {
        resolve(csvData)
      }
    });
  })

  return promise
}

export { csvRead };