function download() {
  var link = document.createElement('a');
  link.download = 'filtercopy.png';
  link.href = document.querySelector('canvas').toDataURL();
  link.click();
}

export default download;
