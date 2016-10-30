module.exports = function(grunt) {

    grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	clean: ['build/'],
	copy: {
	    build: {
		files: [
		    {
			expand: true,
			cwd: 'src/img/',
			src: ['*.jpg', '*.png', '*.svg'],
			dest: 'build/assets/img/'
		    }
		] 
	    }
	},
	less: {
	    build: {
		options: {
		    paths: "src/less"
		},
		files: {
		    'build/assets/css/app.css': 'src/less/app.less'
		}
	    }
	},
 	uglify: {
 	    build: {
 		files: {
 		    'build/assets/js/app.js': ['src/js/*.js']
 		}
 	    }
 	},
	nunjucks: {
	    options: {
		data: grunt.file.readJSON("project.json"),
		paths: "src/html"
	    },
	    build: {
		files: [{
		    expand: true,
		    cwd: "src/html/templates",
		    src: [
			"*.html"
		    ],
		    dest: "build/",
		    ext: ".html"
		}]
	    }
	},
	connect: {
	    dev: {
		port: 8080,
		base: 'build'
	    }
	},
	watch: {
	    dev: {
		files: ['project.json', 'src/**/*'],
		tasks: ['clean', 'copy', 'less', 'uglify', 'nunjucks', 'connect']
	    }
	}
    });
    
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-nunjucks-2-html');
    grunt.loadNpmTasks('grunt-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [
	'clean', 'copy', 'less', 'uglify', 'nunjucks'
    ]);

};
