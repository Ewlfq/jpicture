module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      files: ['src/<%= pkg.name %>.dev.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
      
    uglify: {
      options: {
        banner: '/* build with grunt <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.dev.js',
        dest: 'build/<%= pkg.name %>-<%= pkg.version %>.min.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['jshint', 'uglify']);
};