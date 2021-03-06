var fs = require('fs');

// Read the contents of a file out synchronously and return the file contents.
function read(filename) {
  // https://nodejs.org/docs/latest-v6.x/api/fs.html#fs_fs_access_path_mode_callback

  // test for required file's existence first. output error if missing.
  if (exists(filename)) {
    return fs.readFileSync(filename, 'utf8', function (err, data) {
      if (err) {
        return console.error(err);
      }
      return data;
    });
  }
  else {
    // expected file doesn't exist, output error
    console.error('Project file "'+ filename +'" not found. Create one with the "new" command.');
    process.exit(1);
  }
}

// Write the contents of a file out synchronously and return the file contents.
function write(contents, outputFilename) {
  // https://stackoverflow.com/questions/33525463/fs-writefile-with-wx-flag-does-not-fail-if-file-exists
  return fs.writeFile(outputFilename, contents, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;
    return true;
  });
}

// Implements a poor content-copy operation. Working with smaller files and the
// fs.copyFileSync doesn't exist in Node 6.x LTS.
function copy(fromFile, toFile) {
  var contents = read(fromFile);
  return write(contents, toFile);
}

// Check if a file currently exists with the targetFile name. Used to prevent
// overwriting existing files.
function exists(targetFile) {
  // console.log(fs.statSync(targetFile))
  try {
    fs.accessSync(targetFile)
    return true
  }
  catch(err) {
    if (err.code == "ENOENT") {
      return false
    }
  }
}

module.exports = {
  read: read,
  write: write,
  copy: copy,
  exists: exists
};
