module.exports = function (grunt) {
  'use strict';

  require('time-grunt')(grunt);

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /* Optimization */
    imagemin: {
      dist: {
        options: {
          progressive: true,
          optimizationLevel: 4
        },

        files: {
          '.app/peace.svg': 'src/peace.svg'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          minifyJS: true,
          minifyCSS: true,
          removeComments: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeEmptyAttributes: true,
          removeAttributeQuotes: true,
          collapseBooleanAttributes: true,
          removeRedundantAttributes: true
        },

        files: {
          '.app/index.html': 'src/index.html'
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          '.app/style.css': '.app/style.css',
        }
      }
    },

    uncss: {
      options: {
        htmlroot: '.app',
        ignoreSheets: [/fonts.googleapis.com/, /maxcdn.bootstrapcdn.com/],
      },

      dist: {
        files: {
          '.app/style.css': ['.app/index.html']
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '.app/app.js': [
            'bower_components/google-maps-polygon-moveto/js/google.maps.Polygon.getBounds.js',
            'bower_components/google-maps-polygon-moveto/js/google.maps.Polygon.moveTo.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'src/app.js'
          ]
        }
      }
    },

    /* Quality Control */

    jshint: {
      options: {
        jshintrc: '.config/jshintrc.json'
      },

      gruntfile: ['Gruntfile.js'],
      dist: ['src/app.js'],
    },

    csslint: {
      options: {
        csslintrc: '.config/csslintrc.json'
      },

      dist: {
        src: ['.app/style.css']
      }
    },

    /* Build Tools */

    clean: {
      dist: ['.app/*']
    },

    less: {
      dist: {
        files: {
          '.app/style.css': 'src/style.less'
        }
      }
    },

    autoprefixer: {
      options: {
        browsers: ['> 20%']
      },

      dist: {
        src: ['.app/style.css']
      }
    },

    'gh-pages': {
      options: {
        base: '.app'
      },
      src: '**/*'
    },

    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        hostname: 'localhost'
      },

      livereload: {
        options: {
          open: true,
          base: '.app'
        }
      }
    },

    watch: {
      less: {
        files: ['src/style.less'],
        tasks: ['less', 'autoprefixer', 'cssmin', 'csslint']
      },

      gruntfile: {
        files: ['Gruntfile.js'],
        tasks: ['jshint:gruntfile']
      },

      js: {
        files: ['Gruntfile.js', 'src/app.js'],
        tasks: ['jshint:dist', 'uglify']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      }
    }
  });

  /* Define Tasks */

  grunt.registerTask('check', [
    'csslint',
    'jshint'
  ]);

  grunt.registerTask('build', [
    'clean',
    'imagemin',
    'htmlmin',
    'less',
    'uncss',
    'autoprefixer',
    'cssmin',
    'uglify'
  ]);

  grunt.registerTask('default', [
    'build',
    'check'
  ]);

  grunt.registerTask('serve', [
    'default',
    'connect',
    'watch'
  ]);

  grunt.registerTask('deploy', [
    'default',
    'gh-pages'
  ]);
};
