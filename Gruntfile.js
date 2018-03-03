module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['./target/**', './deploy/**'],
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
            src: ['package.json', 'package-lock.json'],
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
          archive: './deploy/<%= pkg.version %>/failure.lambda.zip'
        },
        files: [
          {
            expand: true,
            cwd: './target/failure.lambda/',
            src: ['**/*'],
            dest: '/'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-npm-command');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'npm-command', 'compress']);
  grunt.registerTask('package', ['compress']);

};
