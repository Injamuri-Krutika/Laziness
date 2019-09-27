/* eslint-disable require-jsdoc */
function validate() {
  if (document.getElementById('roll').value !== '' && document.getElementById('uploadFile').value !== '') {
    document.getElementById('uploadDetails').disabled = false;
    return;
  }
  document.getElementById('uploadDetails').disabled = true;
}

document.getElementById('uploadBtn').onchange = function () {
  const filename = this.files[0].name;
  const extension = filename.split('.').pop();
  if (extension === 'tar') { document.getElementById('uploadFile').value = filename; }
  validate();
};
