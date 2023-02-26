import { generateTopics } from "./generateCSV.js"

function readFile() {
  document.getElementById('errorMessage').innerHTML = ""
  const file = document.getElementById("csvUpload").files[0];
  const reader = new FileReader();

  reader.readAsText(file);

  reader.onload = function () {
    const data = Papa.parse(reader.result, { header: true });

    if (data.errors.length) {
      document.getElementById('errorMessage').innerHTML = "* Error parsing CSV: " + JSON.stringify(data.errors)
    } else {
      generateTopics(data.meta.fields)

    }
  };
}

export { readFile };