var gulp = require('gulp')
var gutil = require('gulp-util')
var child_process = require('child_process')
var electronBuilder = require('electron-builder')

function exec(command, options, done) {
    var p = child_process.exec(command, options, (error, stderr, stdout) => {
        if (error) {
            gutil.log(stderr)
            return done('Command "' + command + '" Failed')
        }
        return done()
    })
}


gulp.task('pip-install', done => {
    return exec('pip install -r requirements.txt', {}, done)
})


gulp.task('cachebrowser-core', ['pip-install'], done => {
    return exec('pyinstaller -y ./cachebrowser.spec', {}, done)
})


gulp.task('ui-init', done => {
    return exec('npm install', {cwd: 'gui'}, done)
})


gulp.task('ui-build', ['ui-init'], done => {
    return exec('gulp build --conf ../env.json', {cwd: 'gui'}, done)
})


gulp.task('ui-bundle', ['ui-build'], done => {
    var buildConfig = require('./build.json')
    electronBuilder.build({
        devMetadata: buildConfig
    })
    .then(() => done())
    .catch((error) => done(error))
})


gulp.task('dist', ['cachebrowser-core', 'ui-bundle'])
