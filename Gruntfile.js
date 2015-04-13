/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.license.type %> */\n',

    // Task configuration.
    babel: {
      options: {
        modules: 'umd'
      },
      dist: {
        files: {
          'tmp/controls.js': 'src/controls.js',
          'tmp/main.js': 'src/main.js'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'tmp/controls.js',
          'tmp/main.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    jshint: {
      options: {
        'esnext': true
      },
      src: ['src/*.js']
    },
    jscs: {
      src: 'src/*.js',
      options: {
          config: '.jscsrc'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      scripts: {
        files: [
          'manifest.json',
          'src/*.js'
        ],
        tasks: ['default']
      },
    },
    clean: [
      'tmp',
      '<%= concat.dist.dest %>'
    ]
  });

  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks("grunt-jscs");
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jshint', 'jscs', 'babel', 'concat', 'uglify', 'clean']);
};
