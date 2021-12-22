/*
 |--------------------------------------------------------------------------
 * Mix Asset Management
 |--------------------------------------------------------------------------
 |
 * Mix provides a clean, fluent API for defining some Webpack build steps
 * for your application. See https://github.com/JeffreyWay/laravel-mix.
 |
 */

// * Imports the proxy from config.js to avoid conflicts
const webpack = require("webpack");
const glob = require('glob');
const mix = require('laravel-mix');
const proxy = require('./config/config.js');
require('laravel-mix-copy-watched');
require('laravel-mix-critical');

/*
 |--------------------------------------------------------------------------
 * Configuration
 |--------------------------------------------------------------------------
 */
 mix
 .webpackConfig({
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
 })
 .setPublicPath('assets')
 .disableNotifications()
 .options({
   processCssUrls: false,
 });

/*
 |--------------------------------------------------------------------------
 * Browsersync: Watches CSS, JS and Twig
 |--------------------------------------------------------------------------
 */
mix.browserSync({
	proxy: proxy.proxy,
	files: [
		'assets/js/**/*.js',
		'assets/css/**/*.css',
		'assets/components/**/*.css',
		'assets/components/**/*.js',
		'src/components/**/*.twig',
		'templates/**/*.twig',
	],
	stream: true,
});

/*
 |--------------------------------------------------------------------------
 * SASS
 |--------------------------------------------------------------------------
 */
mix.sass('src/sass/main.style.scss', 'css');

glob.sync('src/components/**/*.scss').forEach((sourcePath) => {
	const destinationPath = sourcePath.replace(
		/^src\/(components\/.+)\/_?(.+)\.scss$/,
		'$1/$2.css'
	);

	mix.sass(sourcePath, destinationPath);
});

/*
 |--------------------------------------------------------------------------
 * JS
 |--------------------------------------------------------------------------
 */
mix.js('src/js/main.script.js', 'js');

glob.sync('src/components/**/*.js').forEach((sourcePath) => {
	const destinationPath = sourcePath.replace(
		/^src\/(components\/.+)\/(.+)\.js$/,
		'$1/$2.js'
	);

	if (sourcePath.includes('.stories.js')) return;

	mix.js(sourcePath, destinationPath);
});
/*
 |--------------------------------------------------------------------------
 * IMAGES / ICONS
 |--------------------------------------------------------------------------
 */
// * Directly copies the images, icons and fonts. Does not do any optimizations on the images
mix.copyDirectoryWatched('src/images', 'assets/images');
mix.copyDirectoryWatched('src/icons', 'assets/icons');
mix.copyDirectoryWatched('src/fonts/**/*', 'assets/fonts');

/*
 |--------------------------------------------------------------------------
 * Critical CSS - @see: https://laravel-mix.com/extensions/critical
 |--------------------------------------------------------------------------
 */
mix.critical({
	enabled: mix.inProduction(),
	urls: [
		{
			src: proxy.proxy + '/',
			dest: './assets/css/critical/front_critical.min.css',
		},
	],
	options: {
		minify: true,
	},
});
