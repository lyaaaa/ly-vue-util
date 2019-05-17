#!/usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const { __root__, existsFile, copyFile } = require('./util');

commander.version('0.0.1')
         .description('init extension project')

inquirer
  .prompt([
    {
        type: 'confirm',
        message: 'install vuex ?',
        name: 'vuex',
        default: 'Y'
    }
  ])
  .then(answers => {
    // 是否需要vuex;
    if(answers.vuex){
      shell.exec('npm install vuex --save');
      var url = path.join(__root__, '/src/store');
      var src = path.join(__dirname, '../template/store');
      existsFile(src, url, copyFile);
    }
  });