module.exports = {
    default: {
        paths: ['features/**/*.feature'],
        require: [
            'features/step_definitions/**/*.js',
            'features/support/**/*.js'
        ],
        format: [
            'progress',
            'summary',
            'json:reports/cucumber-report.json',
            'junit:reports/junit/results.xml'
        ],
        publishQuiet: true,
        failFast: false,
        parallel: 1
    },

    smoke: {
        paths: ['features/**/*.feature'],
        require: [
            'features/step_definitions/**/*.js',
            'features/support/**/*.js'
        ],
        format: [
            'progress',
            'summary',
            'json:reports/cucumber-report.json',
            'junit:reports/junit/results.xml'
        ],
        tags: '@smoke',
        publishQuiet: true,
        parallel: 1
    },

    regression: {
        paths: ['features/**/*.feature'],
        require: [
            'features/step_definitions/**/*.js',
            'features/support/**/*.js'
        ],
        format: [
            'progress',
            'summary',
            'json:reports/cucumber-report.json',
            'junit:reports/junit/results.xml'
        ],
        tags: '@regression',
        publishQuiet: true,
        parallel: 1
    }
};