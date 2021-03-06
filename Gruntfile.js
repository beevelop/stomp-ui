module.exports = function (grunt) {
  grunt.initConfig({
    clean: {
      all: ['dist/']
    },

    concat: {
      all: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/sockjs/sockjs.js',
          'bower_components/stomp-websocket/lib/stomp.js',
          'bower_components/ng-stomp/dist/ng-stomp.standalone.min.js'],
        dest: 'dist/deps.min.js'
      }
    },

    processhtml: {
      all: {
        files: {
          'dist/index.html': ['src/index.html']
        }
      }
    },

    uglify: {
      all: {
        files: {
          'dist/app.min.js': ['src/app.js']
        }
      }
    },
    standard: {
      app: {
        src: ['src/*.js']
      }
    }
  })

  grunt.loadNpmTasks('grunt-standard')
  grunt.loadNpmTasks('grunt-contrib-uglify')
  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-clean')
  grunt.loadNpmTasks('grunt-processhtml')

  grunt.registerTask('default', ['standard', 'clean', 'concat', 'uglify', 'processhtml'])
}
