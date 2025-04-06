// Helper function to parse CSV (assumes the first row is a header)
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const products = lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim());
      const product = {};
      headers.forEach((header, i) => {
        product[header] = values[i];
      });
      return product;
    });
    return { products };
  }
  
  // Helper function to parse XML and convert to JSON inventory format
  function parseXML(xmlText) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");
    const productNodes = xmlDoc.getElementsByTagName("product");
    const products = [];
    for (let i = 0; i < productNodes.length; i++) {
      const productNode = productNodes[i];
      const product = {
        id: parseInt(productNode.getElementsByTagName("id")[0].textContent),
        name: productNode.getElementsByTagName("name")[0].textContent,
        description: productNode.getElementsByTagName("description")[0].textContent,
        category: productNode.getElementsByTagName("category")[0].textContent,
        image: productNode.getElementsByTagName("image")[0].textContent,
        price: productNode.getElementsByTagName("price")[0].textContent
      };
      products.push(product);
    }
    return { products };
  }
  
  document.getElementById('upload-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const fileInput = document.getElementById('product-file');
    const file = fileInput.files[0];
    if (!file) {
      alert('Please select a file.');
      return;
    }
    
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const reader = new FileReader();
    
    reader.onload = function(event) {
      try {
        let data;
        if (fileExtension === 'json') {
          data = JSON.parse(event.target.result);
        } else if (fileExtension === 'csv') {
          data = parseCSV(event.target.result);
        } else if (fileExtension === 'txt') {
          // Assuming plain text file contains JSON data
          data = JSON.parse(event.target.result);
        } else if (fileExtension === 'xml') {
          data = parseXML(event.target.result);
        } else {
          alert('Unsupported file type.');
          return;
        }
        
        // Validate that data has a products array
        if (data.products && Array.isArray(data.products)) {
          localStorage.setItem('inventory', JSON.stringify(data));
          alert('Inventory updated successfully!');
        } else {
          alert('Invalid inventory format.');
        }
      } catch (err) {
        alert('Error parsing file. Please ensure it is valid.');
        console.error(err);
      }
    };
    
    reader.readAsText(file);
  });