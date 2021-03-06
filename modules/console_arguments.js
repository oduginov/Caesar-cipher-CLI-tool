const ACTION = ['a', 'action']; // the required param
const INPUT_FILE = ['i', 'input'];
const OUTPUT_FILE = ['o', 'output'];
const SHIFT = ['s', 'shift']; // the required param

// Obtain the console arguments
const args = require('minimist')(process.argv.slice(2));

/**
 * Handle error as follows: we write the error message in process.stderr and
 * stop the process with code 1.
 *
 * @param err - Error object, which describe occurred error.
 */
function errorHandler(err) {
    if (err) {
        process.stderr.write(err.message + '\n');
        process.exit(1);
    }
}

/**
 * Obtain a path to an input file. If user did not assign the
 * value to the console argument <--input>, then we return <undefined>.
 *
 * @returns {*} - A path to an input file or <undefined>
 */
function getInputFile() {
    return args[INPUT_FILE[0]] || args[INPUT_FILE[1]];
}

/**
 * Obtain a path to an output file. If user did not assign the
 * value to the console argument <--output>, then we return <undefined>.
 *
 * @returns {*} - A path to an output file or <undefined>
 */
function getOutputFile() {
    return args[OUTPUT_FILE[0]] || args[OUTPUT_FILE[1]];
}

/**
 * Obtain an action, which can be <encode> or <decode>.
 *
 * @returns {*} - A string, which represents the action (<encode> or <decode>)
 * or <undefined>
 */
function getAction() {
    return args[ACTION[0]] || args[ACTION[1]];
}

/**
 * Obtain an shift.
 *
 * @returns {*} - A number, which represents the shift or <undefined>
 */
function getShift() {
    return args[SHIFT[0]] || args[SHIFT[1]];
}

/**
 * We check whether console arguments
 */
function validateArgs() {
    if (!getAction(args)) {
        errorHandler(new Error('there is no the following required argument: --action'));
    }
    if (!getShift(args)) {
        errorHandler(new Error('there is no the following required argument: --shift'));
    }
    const fs = require('fs');
    let file = getInputFile(args);
    if (file) {
        fs.access(file, fs.constants.R_OK, err => errorHandler(err));
    }
    file = getOutputFile(args);
    if (file) {
        fs.access(file, fs.constants.W_OK, err => errorHandler(err));
    }
}

module.exports = {
    validateArgs,
    getInputFile,
    getOutputFile,
    getAction,
    getShift
};
