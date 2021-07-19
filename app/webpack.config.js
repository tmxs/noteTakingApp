const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

const CopyWebpackPlugin = require('copy-webpack-plugin');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addEntry('app', './assets/js/app.js')

    .splitEntryChunks()
    .enableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    .autoProvideVariables({
        "jQuery.tagsinput": "bootstrap-tagsinput"
    })
    .enableSassLoader()
    .addPlugin(new CopyWebpackPlugin([
        {from: 'node_modules/tinymce/skins', to: 'skins'},
    ]))
    .enablePostCssLoader((options) => {
        options.config = {
            path: './postcss.config.js'
        };
    })

    .copyFiles({
        from: './assets/images',
        to: 'images/[path][name].[ext]',
    })
;

module.exports = Encore.getWebpackConfig();
