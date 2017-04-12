#!/usr/bin/env node

const readline = require('readline');
const path = require('path');
const fs = require('fs');
const exec = require('child_process').exec;
const chalk = require('chalk');
const log = console.log;
const ora = require('ora');
const currentPath = process.cwd();
if (fs.existsSync(currentPath + "/config.xml")) {
		chalk.green('Cordova Project');
		exec('ios-sim showdevicetypes', (error, stdout, stderr) => {
				if (error) {
						console.error(`exec error: ${error}`);
						return;
				}
				var deviceList = stdout.split(/\n/);
				var deviceObj = [];
				for (var i = 1; i <= deviceList.length - 2; i++) {
						var arr = i + ". ) " + deviceList[i];
						deviceObj.push(arr);
				}
				const rl = readline.createInterface({input: process.stdin, output: process.stdout});
				rl.question(chalk.green('Please Select Device \n'), (answer) => {
						log(chalk.green("Your selected Device => " + deviceList[answer]));
						exec('cordova emulate ios --target="' + deviceList[answer] + '"', (error, stdout, stderr) => {
								console.log(stdout);
								if (stderr == null) {
										const spinner = ora('Running on Simulator').start();
								}
								console.log("" + stderr);
						});
						rl.close();
				});
				console.log(deviceObj.join('\r\n'));
				console.log('\r\n');
		});

} else {
		chalk.red('Not cordova project \n');
}
