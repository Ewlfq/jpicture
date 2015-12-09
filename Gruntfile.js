module.exports = function (grunt) {
  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: [
          'src/<%= pkg.name %>.jquery.dev.js',
          'src/<%= pkg.name %>.dev.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },

    uglify: {
      build: {
        options: {
          banner: '/* build with grunt <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        files: [{
          src: 'src/<%= pkg.name %>.dev.js',
          dest: 'build/<%= pkg.name %>.min.js'
        },{
          src: 'src/<%= pkg.name %>.jquery.dev.js',
          dest: 'build/<%= pkg.name %>.jquery.min.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify']);
};
