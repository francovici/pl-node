import arg from "arg";
import help from './help'


export function interfaceCommand(args) {
    console.log(args);
    const actions = argumentOptionsParser(args);

    if(actions.help){
        help();
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
      init: args._[0],
      help: args["--help"] || false,
      build: args["--build"] || false,
      clean: args["--clean"] || false,
      compile: args["--compile"] || false,
    };
  }