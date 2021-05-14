module.exports = function (grunt) {
  'use strict'

  require('load-grunt-tasks')(grunt)

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
          '.app/style.css': '.app/style.css'
        }
      }
    },

    uglify: {
      dist: {
        files: {
          '.app/app.js': [
            'bower_components/google-maps-polygon-moveto/js/google.maps.Polygon.getBounds.js',
            'bower_components/google-maps-polygon-moveto/js/google.maps.Polygon.moveTo.js',
            'bower_components/google-maps-polygon-rotate/dist/google.maps.Polygon.rotate.min.js',
            'bower_components/jquery/dist/jquery.js',
            'bower_components/bootstrap/dist/js/bootstrap.js',
            'src/app.js'
          ]
        }
      }
    },

    /* Quality Control */

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
        tasks: ['less', 'autoprefixer', 'cssmin']
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      js: {
        files: ['Gruntfile.js', 'src/app.js'],
        tasks: ['uglify']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },

        files: [
          '.app/index.html',
          '.app/style.css',
          '.app/app.js'
        ]
      }
    }
  })

  /* Define Tasks */

  grunt.registerTask('build', [
    'clean',
    'imagemin',
    'htmlmin',
    'less',
    'autoprefixer',
    'cssmin',
    'uglify'
  ])

  grunt.registerTask('default', [
    'build'
  ])

  grunt.registerTask('serve', [
    'default',
    'connect',
    'watch'
  ])

  grunt.registerTask('deploy', [
    'default',
    'gh-pages'
  ])
};
