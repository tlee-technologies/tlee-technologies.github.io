document.getElementById('bulk-upload-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const fileInput = document.getElementById('jsonFile');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a JSON file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    try {
      const products = JSON.parse(event.target.result);
      fetch('/api/products/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products })
      })
        .then(res => {
          if (!res.ok) throw new Error('Failed to upload products.');
          return res.text();
        })
        .then(msg => {
          alert(msg || 'Products uploaded successfully!');
          window.location.href = '/admin-products';
        })
        .catch(err => {
          console.error(err);
          alert('Upload failed.');
        });
    } catch (err) {
      alert('Invalid JSON format.');
      console.error(err);
    }
  };

  reader.readAsText(file);
});