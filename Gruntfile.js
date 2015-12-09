module.exports = function (grunt) {
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
      options: {
        banner: '/* build with grunt <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: [{
        src: 'src/<%= pkg.name %>.dev.js',
        dest: 'build/<%= pkg.name %>.min.js'
      },{
          src: 'src/<%= pkg.name %>.jquery.dev.js',
          dest: 'build/<%= pkg.name %>.jquery.min.js'
      }]
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
