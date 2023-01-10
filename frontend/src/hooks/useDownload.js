function download() {
  var link = document.createElement('a');
  link.download = 'filtercopy.png';
  link.href = document.querySelector('canvas').toDataURL();
  link.click();
}

function copy() {
  let image = document.querySelector('canvas').toDataURL();
  try {
    navigator.clipboard.writeText(image);
    alert('Image has been copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy image: ', err);
  }
}

export { download, copy };
