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
    traceur: {
      options: {
        experimental: true,
        copyRuntime: 'tmp',
        moduleNaming: {
          stripPrefix: "tmp",
        }
      },
      custom: {
        files: [{
          expand: true,
          cwd: 'src',
          src: ['*.js'],
          dest: 'tmp'
        }]
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          // `traceur_runtime.js` must be concatenated first...
          'tmp/traceur_runtime.js',

          'tmp/*.js',

          // ...`init.js` must be concatenated last
          'init.js'
        ],
        dest: 'dist/<%= pkg.name %>.js'
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
        files: ['src/**/*.js'],
        tasks: ['default']
      },
    },
    clean: [
      'tmp',
      '<%= concat.dist.dest %>'
    ]
  });

  grunt.loadNpmTasks('grunt-traceur');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['traceur', 'concat', 'uglify', 'clean']);
};
