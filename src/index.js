#!/usr/bin/env node

const commander = require('commander');
const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const { __root__, existsFile, copyFile, flexUtilVW } = require('./util');

commander.version('0.0.1')
         .description('init extension project')

inquirer
  .prompt([
    {
        type: 'confirm',
        message: 'install vuex ?',
        name: 'vuex',
        default: 'Y'
    },
    {
      type: 'list',
      message: 'choose your unit ?',
      name: 'units',
      choices: ['px', 'vw']
    },
    {
      type: 'input',
      message: 'please input your width and height, eg: 375,667 ?',
      name: 'flexWH',
      default: '375,667',
      when: function(answers){
         return answers.units === 'vw'
      }
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
    // 选择 vw 单位
    if(answers.units === 'vw'){
       var wh = answers.flexWH.split(',')
       shell.exec('npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano --S');
       shell.exec('npm install cssnano-preset-advanced --save-dev');
       flexUtilVW(parseFloat(wh[0]), parseFloat(wh[1]))
    }
  });