import arg from "arg";
import help from './help';
import init from './init';
import build from './build';
import clean from './clean';
import compile from './compile';

export function interfaceCommand(args) {
    const actions = argumentOptionsParser(args);

    if(actions.help){
        help();
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
}

function argumentOptionsParser(rawArguments) {
    let args = arg(
      {
        "--init": Boolean,
        "--help": Boolean,
        "--build": Boolean,
        "--clean": Boolean,
        "--compile": Boolean,
        "--h": "--help",
        "--i": "--init",
        "--b": "--build",
        "--d": "--clean",
        "--c": "--compile",
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
      parameters: rawArguments.slice(3)
    };
  }