module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    copy: {
      main: {
        files: [
          // copy sources
          {
            expand: true,
            cwd: './src/functions/',
            src: ['**'],
            dest: './target/failure.lambda/',
            timestamp: true,
            nonull: true
          },
          {
            expand: true,
            src: ['package.json'],
            dest: './target/failure.lambda/',
            timestamp: true,
            nonull: true
          },
        ],
      },
    },
    'npm-command': {
      failurelambda: {
        options: {
          cwd: './target/failure.lambda/',
          args: ['--production']
        }
      }
    },
    compress: {
      main: {
        options: {
          mode: 'gzip',
          archive: 'failure.lambda.zip'
        },
        expand: true,
        cwd: './target/failure.lambda/',
        src: ['**'],
        dest: './target/'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-npm-command');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['copy', 'npm-command']);

};
