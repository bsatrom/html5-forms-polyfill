module.exports = function(grunt) {
  var browsers;
  (function() {
    var os = require('os');
    browsers = ['Chrome', 'Firefox', 'Opera'];
    if (os.type() === 'Darwin') {
      browsers.push('ChromeCanary');
      browsers.push('Safari');
    }
    if (os.type() === 'Windows_NT') {
      browsers.push('IE');
    }
  })();

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
        banner: '// kendo-ui-forms v<%= pkg.version %> \n'
      },
      dist: {
        src: [ 'src/js/*.js' ],
        dest: 'dist/js/kendo.forms.js'
      }
    },
    uglify: {
      options: {
        banner: '// kendo-ui-forms v<%= pkg.version %> \n'
      },
      dist: {
        files: {
          'dist/js/kendo.forms.min.js': '<%= concat.dist.dest %>'
        }
      }
    },
    cssmin: {
      options: {
        banner: '// kendo-ui-forms v<%= pkg.version %> \n'
      },
      combine: {
        files: {
          'dist/css/kendo.forms.css': 'src/css/*.css'
        }
      },
      minify: {
        expand: true,
        cwd: 'src/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/',
        ext: '.forms.min.css'
      }
    },
    jshint: {
      files: ['gruntfile.js', 'src/**/*.js', 'spec/js/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    karma: {
      options: {
        configFile: 'conf/karma.conf.js',
        keepalive: true
      },
      forms: {
        browsers: browsers
      }
    },
    watch: {
      scripts: {
        files: ['<%= jshint.files %>'],
        tasks: ['test'],
        options: {
          nospawn: true
        }
      }
    },
    jasmine: {
      src: ['lib/**/*.js', 'dist/js/kendo.forms.js'],
      options: {
        specs: 'spec/javascripts/*.js',
        vendor: [
          'spec/lib/jasmine-jquery.js'
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('minify', ['jshint', 'concat', 'uglify']);
  grunt.registerTask('test', ['minify', 'jasmine']);
  grunt.registerTask('x-test', ['minify', 'jasmine', 'karma:forms']);
};