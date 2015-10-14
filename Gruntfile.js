// First of all the source files runs throug jshint
// After that it gets minified 
// and last but not least it gets open via the browser
module.exports = function (grunt) {
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
    },
    
    open: {
      dev: {
        path: 'test/test_pages/boostrap_div.html',
        app: 'Google Chrome'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-open');

  grunt.registerTask('default', ['jshint', 'uglify', 'open']);
};