#!./node_modules/.bin/babel-node

// Backend
import Play from './src/backend/play';
import Test from './src/backend/test';


// List of all CLI arguments
const ARGVS = ['facebook', 'snapshot', 'snapshots', 'fps', 'dry', 'bundle'],
    ARGVS_DEFAULT = {
        bundle: './bundle.js',
        snapshots: './snapshots',
        fps: 10
    };

// Make sure errors are not silently swallowed by Promises
process.on('unhandledRejection', (err) => {
    console.log(err.stack);
    process.exit(1);
});

class Driver {
    constructor() {
        let args = this.parseArgvs(),
            drive;


        if (args.dry) {
            drive = new Test(args);
        } else {
            drive = new Play(args);
        }

        drive.start().then(() => {
            console.log('Done');
        });
    }

    parseArgvs() {
        let args = {};

        process.argv.forEach((arg) => {
            let option = arg.replace(/-/g, '').split('='),
                index = ARGVS.indexOf(option[0]);

            if (index >= 0) {
                args[ARGVS[index]] = option[1] || ARGVS_DEFAULT[ARGVS[index]] || true;
            }
        });

        return args;
    }
}

new Driver();
