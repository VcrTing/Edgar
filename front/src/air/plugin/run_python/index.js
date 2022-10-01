const { apply } = require('file-loader')


const spawn = require('child_process').spawn
app.get('process_data', (req, res) => {
    const m = 'HELLO'

    spawn('python3', [ './python3/run_csv.py', m ])
})