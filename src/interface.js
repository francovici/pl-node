import arg from "arg";
import help from './help';
import build from './build';
import clean from './clean';
import compile from './compile';
import split from "./split";
const init = require('./init');
import { version } from '../package.json';

export function interfaceCommand(args) {
    const actions = argumentOptionsParser(args);

    if(actions.help){
        help();
    }
    if(actions.version){
        console.log('v' + version)
    }
    else if(actions.init){
        init(actions.parameters[0]);
    }
    else if(actions.build){
        build(actions.parameters[0]);
    }
    else if(actions.clean){
        clean(actions.parameters[0]);
    }
    else if(actions.compile){
        compile(actions.parameters[0]);
    }
    else if(actions.split){
        split(actions.parameters[0]);
    }
}

function argumentOptionsParser(rawArguments) {
    let args = arg(
      {
        "--init": Boolean,
        "--help": Boolean,
        "--build": Boolean,
        "--clean": Boolean,
        "--compile": Boolean,
        "--version" : Boolean,
        "--split": Boolean,
        "--h": "--help",
        "--i": "--init",
        "--b": "--build",
        "--d": "--clean",
        "--c": "--compile",
        "--v": "--version",
        "--s": "--split"
      },
      {
        argv: rawArguments.slice(2),
      }
    );

    return {
      init: args["--init"] || false,
      help: args["--help"] || false,
      build: args["--build"] || false,
      clean: args["--clean"] || false,
      compile: args["--compile"] || false,
      version: args["--version"] || false,
      split: args["--split"] || false,
      parameters: rawArguments.slice(3)
    };
  }