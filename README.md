
# pl-node: Node+PL/SQL tool 

This package is a useful tool for working with PL/SQL packages.

It provides a command line interface you can use on your working directory for building, compiling and running tests on your PL/SQL packages.

<br>

# Installation

You can install the package via npm:
```
npm i -g pl-node
```
On your local machine.

<br>

# Getting started

First of all you can create the project scaffolding with:

```
pl --init
```
This will create the folders and files you need to get started.

- Packages/ *working dir for your packages*
- src/ *suggested space for your own node source code*
- tests/ *suggested space for your tests*
- .env *configurations should go in this file (more on this file later in this document)*

Then, you should place your PL/SQL packages inside the **Packages** folder.

In the current version, you can place one or more packages directly into the folder and then simply run the [split command](#split-command). This will split the packages and create the structure needed for working with pl-node.

<u>For example:</u>

If you want to work with a package named MY_PACKAGE.sql, all you have to do is place it inside the Packages folder and run the [split command](#split-command).

```
Packages/
└── MY_PACKAGE.sql
```

Your Packages folder will look like this:

```
Packages/
└── MY_PACKAGE.sql
└── MY_PACKAGE/
    └── MY_PACKAGE.sql
    └── MY_PACKAGE_BODY.sql
```

*Note: You will only need to do this once for every package you add to your project.*

Ok ! Now that we have our package (or packages) inside the project dir we can start coding.

<br>

## Split command

```
pl --split
```

This command will scan the Packages folder for your new Packages and split them into spec/body. 
It will create a new folder inside the Packages dir. It's a handy function for when you just added a package to the folder and don't want to split it manually.

You can send a package name as extra argument so you can choose which package will be split:

```
pl --split MY_PACKAGE
```

Otherwise, all found packages will be splitted.

<br>

## Build command

```
pl --build
```

This command will scan the Packages folder for your Packages and build them. 
The build process consists of merging head and body into one file with ANSI/ASCII encoding for better compatibility with Oracle.

You can send a package name as extra argument so you can choose which package will be built:

```
pl --build MY_PACKAGE
```

Otherwise, all packages will be built.

<br>

## Clean command

```
pl --clean
```

This command will scan the Packages folder for your Packages and clean (delete) all builded packages.

It will not delete your source code (package spec and body).

You can send a package name as extra argument so you can choose which package will be cleaned:

```
pl --clean MY_PACKAGE
```

Otherwise, all packages will be cleaned.

<br>

## Compile command

```
pl --compile
```

This command will scan the Packages folder for your Packages and compile them on Oracle, on the schema of the user specified in the environment variables.

You can send a package name as extra argument so you can choose which package will be compiled:

```
pl --compile MY_PACKAGE
```

Otherwise, all packages will be compiled.

*Note: the compilation process uses the source files, not the builded package. It compiles the spec first, then the body for each package. The builded package is useful when you need to compile it yourself or store it in another VCS, server, etc.*

<br>
<br>

# The .env file

This file contains the environment variables required to run certain commands. This is the configuration you'll get by default:

```javascript
ORACLE_USER=''
PASSWORD=''
CONNECTSTRING=''
PACKAGE_ENCODING='utf-8'
```

The PACKAGE_ENCODING should reflect the original encoding of your packages, for **pl-node** to read and convert into ASCII.

The output encoding will always be ASCII.

The ORACLE_USER, PASSWORD, and CONNECTSTRING variables are used to instantiate a connection with Oracle.

