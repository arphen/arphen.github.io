var ESLINTRC = {

  // [JSON]
  //
  // An .eslintrc starter file with all rules (set to 0) and envs (set to false) listed.
  // Up-to-date as of 2017-08-24.
  //
  // ESLint docs -- Configuring ESLint:      https://eslint.org/docs/user-guide/configuring
  // ESLint docs -- List of available rules: https://eslint.org/docs/rules/
  //
  // Credits:
  // Inspired by, and an update of, "ESLint Reset" by cletusw:
  //      https://gist.github.com/cletusw/e01a85e399ab563b1236

  "parserOptions": {

    "ecmaVersion": 8, // set to 3, 5 (default), 6, 7, or 8 to specify the version of ECMAScript syntax you want to use.
    //                                         // You can also set to 2015 (same as 6), 2016 (same as 7), or 2017 (same as 8) to use the year-based naming.

    "sourceType": "script", // set to "script" (default) or "module" if your code is in ECMAScript modules.

    "ecmaFeatures": {
      "globalReturn": false, // allow return statements in the global scope
      "impliedStrict": false, // enable global strict mode (if ecmaVersion is 5 or greater)
      "jsx": false, // enable JSX

      // (IMPORTANT: This is an experimental feature that may change significantly in the future.
      // It’s recommended that you do not write rules relying on this functionality unless you are
      // willing to incur maintenance cost when it changes.)

      "experimentalObjectRestSpread": false // enable support for the experimental object rest/spread properties
    }
  },

  "env": {

    "browser": true, // browser global variables
    "node": true, // Node.js global variables and Node.js scoping.
    "commonjs": false, // CommonJS global variables and CommonJS scoping (use this for browser-only code that uses Browserify/WebPack).
    "shared-node-browser": false, // Globals common to both Node and Browser.
    "es6": true, // enable all ECMAScript 6 features except for modules (this automatically sets the ecmaVersion parser option to 6).
    "worker": false, // web workers global variables.
    "amd": false, // defines require() and define() as global variables as per the amd spec
    "mocha": false, // adds all of the Mocha testing global variables
    "jasmine": false, // adds all of the Jasmine testing global variables for version 1.3 and 2.0
    "jest": false, // Jest global variables.
    "phantomjs": false, // PhantomJS global variables
    "protractor": false, // Protractor global variables
    "qunit": false, // QUnit global variables.
    "jquery": true, // jQuery global variables
    "prototypejs": false, // Prototype.js global variables
    "shelljs": false, // ShellJS global variables
    "meteor": false, // Meteor global variables.
    "mongo": false, // MongoDB global variables.
    "applescript": false, // AppleScript global variables.
    "nashorn": false, // Java 8 Nashorn global variables.
    "serviceworker": false, // Service Worker global variables.
    "atomtest": false, // Atom test helper globals.
    "embertest": false, // Ember test helper globals.
    "webextensions": false, // WebExtensions globals.
    "greasemonkey": true // GreaseMonkey globals.

  },

  "globals": {

    // e.g. "angular": true
    "APLTOOL": true,
    "log": true,
    "VIDEOTOOL": true
  },

  "plugins": [

      // e.g. "react" (must run `npm install eslint-plugin-react` first)

    ],

  "rules": {

    // Usage:
    //    "off" or 0 - turn the rule off
    //    "warn" or 1 - turn the rule on as a warning (doesn’t affect exit code)
    //    "error" or 2 - turn the rule on as an error (exit code is 1 when triggered)


    ////////// Possible Errors //////////

    "for-direction": 2, // enforce “for” loop update clause moving the counter in the right direction
    "getter-return": 2, // enforce return statements in getters
    "no-await-in-loop": 2, // disallow await inside of loops
    "no-compare-neg-zero": 2, // disallow comparing against -0
    "no-cond-assign": 2, // disallow assignment operators in conditional expressions
    "no-console": 1, // disallow the use of console
    "no-constant-condition": 2, // disallow constant expressions in conditions
    "no-control-regex": 2, // disallow control characters in regular expressions
    "no-debugger": 0, // disallow use of debugger
    "no-dupe-args": 2, // disallow duplicate arguments in function definitions
    "no-dupe-keys": 2, // disallow duplicate keys in object literals
    "no-duplicate-case": 2, // disallow duplicate case labels
    "no-empty": 2, // disallow empty block statements
    "no-empty-character-class": 2, // disallow empty character classes in regular expressions
    "no-ex-assign": 2, // disallow reassigning exceptions in catch clauses
    "no-extra-boolean-cast": 2, // disallow unnecessary boolean casts
    "no-extra-parens": 0, // disallow unnecessary parentheses
    "no-extra-semi": 2, // disallow unnecessary semicolons
    "no-func-assign": 2, // disallow reassigning function declarations
    "no-inner-declarations": 2, // disallow variable or function declarations in nested blocks
    "no-invalid-regexp": 2, // disallow invalid regular expression strings in the RegExp constructor
    "no-irregular-whitespace": 2, // disallow irregular whitespace outside of strings and comments
    "no-obj-calls": 2, // disallow calling global object properties as functions
    "no-prototype-builtins": 1, // disallow calling some Object.prototype methods directly on objects
    "no-regex-spaces": 2, // disallow multiple spaces in regular expressions
    "no-sparse-arrays": 2, // disallow sparse arrays
    "no-template-curly-in-string": 2, // disallow template literal placeholder syntax in regular strings
    "no-unexpected-multiline": 2, // disallow confusing multiline expressions
    "no-unreachable": 2, // disallow unreachable code after return, throw, continue, and break statements
    "no-unsafe-finally": 2, // disallow control flow statements in finally blocks
    "no-unsafe-negation": 2, // disallow negating the left operand of relational operators
    "use-isnan": 2, // require calls to isNaN() when checking for NaN
    "valid-jsdoc": 0, // enforce valid JSDoc comments
    "valid-typeof": 2, // enforce comparing typeof expressions against valid strings


    ////////// Best Practices //////////

    "accessor-pairs": 2, // enforces getter/setter pairs in objects
    "array-callback-return": 2, // enforce return statements in callbacks of array methods
    "block-scoped-var": 2, // enforce the use of variables within the scope they are defined
    "class-methods-use-this": 2, // enforce that class methods utilize this
    "complexity": 0, // enforce a maximum cyclomatic complexity allowed in a program
    "consistent-return": 0, // require return statements to either always or never specify values
    "curly": 2, // enforce consistent brace style for all control statements
    "default-case": 2, // require default cases in switch statements
    "dot-location": 0, // enforces consistent newlines before and after dots
    "dot-notation": 2, // enforce dot notation whenever possible
    "eqeqeq": 2, // require the use of === and !==
    "guard-for-in": 2, // require for-in loops to include an if statement
    "no-alert": 0, // disallow the use of alert, confirm, and prompt
    "no-caller": 2, // disallow use of arguments.caller or arguments.callee
    "no-case-declarations": 2, // disallow lexical declarations in case clauses
    "no-div-regex": 2, // disallow division operators explicitly at beginning of regular expression
    "no-else-return": 0, // disallow else blocks after return statements in if statements
    "no-empty-function": 2, // disallow empty functions
    "no-empty-pattern": 2, // disallow empty destructuring patterns
    "no-eq-null": 2, // disallow null comparisons without type-checking operators
    "no-eval": 0, // disallow use of eval()
    "no-extend-native": 1, // disallow extending native types
    "no-extra-bind": 2, // disallow unnecessary calls to .bind()
    "no-extra-label": 2, // disallow unnecessary labels
    "no-fallthrough": 2, // disallow fallthrough of case statements
    "no-floating-decimal": 2, // disallow leading or trailing decimal points in numeric literals
    "no-global-assign": 1, // disallow assignments to native objects or read-only global variables
    "no-implicit-coercion": 2, // disallow shorthand type conversions
    "no-implicit-globals": 0, // disallow variable and function declarations in the global scope
    "no-implied-eval": 2, // disallow the use of eval()-like methods
    "no-invalid-this": 1, // disallow this keywords outside of classes or class-like objects
    "no-iterator": 2, // disallow the use of the __iterator__ property
    "no-labels": 2, // disallow labeled statements
    "no-lone-blocks": 2, // disallow unnecessary nested blocks
    "no-loop-func": 1, // disallow function declarations and expressions inside loop statements
    "no-magic-numbers": 0, // disallow magic numbers
    "no-multi-spaces": 2, // disallow multiple spaces
    "no-multi-str": 2, // disallow multiline strings
    "no-new": 2, // disallow new operators outside of assignments or comparisons
    "no-new-func": 2, // disallow new operators with the Function object
    "no-new-wrappers": 2, // disallow new operators with the String, Number, and Boolean objects
    "no-octal": 2, // disallow octal literals
    "no-octal-escape": 2, // disallow octal escape sequences in string literals
    "no-param-reassign": 2, // disallow reassigning function parameters
    "no-proto": 2, // disallow the use of the __proto__ property
    "no-redeclare": 2, // disallow variable redeclaration
    "no-restricted-properties": 2, // disallow certain properties on certain objects
    "no-return-assign": 2, // disallow assignment operators in return statements
    "no-return-await": 2, // disallow unnecessary return await
    "no-script-url": 2, // disallow javascript: urls
    "no-self-assign": 2, // disallow assignments where both sides are exactly the same
    "no-self-compare": 2, // disallow comparisons where both sides are exactly the same
    "no-sequences": 2, // disallow comma operators
    "no-throw-literal": 2, // disallow throwing literals as exceptions
    "no-unmodified-loop-condition": 2, // disallow unmodified loop conditions
    "no-unused-expressions": 2, // disallow unused expressions
    "no-unused-labels": 2, // disallow unused labels
    "no-useless-call": 2, // disallow unnecessary calls to .call() and .apply()
    "no-useless-concat": 2, // disallow unnecessary concatenation of literals or template literals
    "no-useless-escape": 1, // disallow unnecessary escape characters
    "no-useless-return": 1, // disallow redundant return statements
    "no-void": 2, // disallow void operators
    "no-warning-comments": 1, // disallow specified warning terms in comments
    "no-with": 2, // disallow with statements
    "prefer-promise-reject-errors": 2, // require using Error objects as Promise rejection reasons
    "radix": 2, // enforce the consistent use of the radix argument when using parseInt()
    "require-await": 2, // disallow async functions which have no await expression
    "vars-on-top": 0, // require var declarations be placed at the top of their containing scope
    "wrap-iife": 2, // require parentheses around immediate function invocations
    "yoda": 2, // require or disallow “Yoda” conditions


    ////////// Strict Mode //////////

    "strict": 0, // require or disallow strict mode directives


    ////////// Variables //////////

    "init-declarations": 0, // require or disallow initialization in variable declarations
    "no-catch-shadow": 0, // disallow catch clause parameters from shadowing variables in the outer scope
    "no-delete-var": 0, // disallow deleting variables
    "no-label-var": 0, // disallow labels that share a name with a variable
    "no-restricted-globals": 0, // disallow specified global variables
    "no-shadow": 0, // disallow variable declarations from shadowing variables declared in the outer scope
    "no-shadow-restricted-names": 0, // disallow identifiers from shadowing restricted names
    "no-undef": 2, // disallow the use of undeclared variables unless mentioned in a /*global */ block
    "no-undef-init": 0, // disallow initializing variables to undefined
    "no-undefined": 0, // disallow the use of undefined as an identifier
    "no-unused-vars": 1, // disallow unused variables
    "no-use-before-define": 0, // disallow the use of variables before they are defined


    ////////// Node.js and CommonJS //////////

    "callback-return": 0, // require return statements after callbacks
    "global-require": 0, // require require() calls to be placed at top-level module scope
    "handle-callback-err": 0, // enforces error handling in callbacks
    "no-buffer-constructor": 0, // disallow use of the Buffer() constructor
    "no-mixed-requires": 0, // disallow require calls to be mixed with regular variable declarations
    "no-new-require": 0, // disallow new operators with calls to require
    "no-path-concat": 0, // disallow string concatenation with __dirname and __filename
    "no-process-env": 0, // disallow use of process.env
    "no-process-exit": 0, // disallow process.exit()
    "no-restricted-modules": 0, // disallow specified modules when loaded by require
    "no-sync": 0, // disallow synchronous methods


    ////////// Stylistic Issues //////////

    "array-bracket-newline": 1, // enforce linebreaks after opening and before closing array brackets
    "array-bracket-spacing": 1, // enforce consistent spacing inside array brackets
    "array-element-newline": 0, // enforce line breaks after each array element
    "block-spacing": 1, // enforce consistent spacing inside single-line blocks
    "brace-style": 1, // enforce consistent brace style for blocks
    "camelcase": 2, // enforce camelcase naming convention
    "capitalized-comments": 0, // enforce or disallow capitalization of the first letter of a comment
    "comma-dangle": 1, // require or disallow trailing commas
    "comma-spacing": 1, // enforce consistent spacing before and after commas
    "comma-style": 1, // enforce consistent comma style
    "computed-property-spacing": 1, // enforce consistent spacing inside computed property brackets
    "consistent-this": 1, // enforces consistent naming when capturing the current execution context
    "eol-last": 1, // require or disallow newline at the end of files
    "func-call-spacing": 1, // require or disallow spacing between function identifiers and their invocations
    "func-name-matching": 1, // require function names to match the name of the variable or property to which they are assigned
    "func-names": 0, // require or disallow named function expressions
    "func-style": 0, // enforce the consistent use of either function declarations or expressions
    "function-paren-newline": 1, // enforce consistent line breaks inside function parentheses
    "id-blacklist": 2, // disallow specified identifiers
    "id-length": 0, // enforce minimum and maximum identifier lengths
    "id-match": 2, // require identifiers to match a specified regular expression
    "indent": 0, // enforce consistent indentation
    "jsx-quotes": 2, // enforce the consistent use of either double or single quotes in JSX attributes
    "key-spacing": 2, // enforce consistent spacing between keys and values in object literal properties
    "keyword-spacing": 2, // enforce consistent spacing before and after keywords
    "line-comment-position": 0, // enforce position of line comments
    "linebreak-style": 2, // enforce consistent linebreak style
    "lines-around-comment": 2, // require empty lines around comments
    "max-depth": 0, // enforce a maximum depth that blocks can be nested
    "max-len": 0, // enforce a maximum line length
    "max-lines": 0, // enforce a maximum number of lines per file
    "max-nested-callbacks": 1, // enforce a maximum depth that callbacks can be nested
    "max-params": 1, // enforce a maximum number of parameters in function definitions
    "max-statements": 0, // enforce a maximum number of statements allowed in function blocks
    "max-statements-per-line": 0, // enforce a maximum number of statements allowed per line
    "multiline-ternary": 0, // enforce newlines between operands of ternary expressions
    "new-cap": 0, // require constructor names to begin with a capital letter
    "new-parens": 1, // require parentheses when invoking a constructor with no arguments
    "newline-per-chained-call": 1, // require a newline after each call in a method chain
    "no-array-constructor": 2, // disallow Array constructors
    "no-bitwise": 0, // disallow bitwise operators
    "no-continue": 0, // disallow continue statements
    "no-inline-comments": 0, // disallow inline comments after code
    "no-lonely-if": 0, // disallow if statements as the only statement in else blocks
    "no-mixed-operators": 2, // disallow mixed binary operators
    "no-mixed-spaces-and-tabs": 2, // disallow mixed spaces and tabs for indentation
    "no-multi-assign": 0, // disallow use of chained assignment expressions
    "no-multiple-empty-lines": 1, // disallow multiple empty lines
    "no-negated-condition": 0, // disallow negated conditions
    "no-nested-ternary": 1, // disallow nested ternary expressions
    "no-new-object": 1, // disallow Object constructors
    "no-plusplus": 0, // disallow the unary operators ++ and --
    "no-restricted-syntax": 2, // disallow specified syntax
    "no-tabs": 0, // disallow all tabs
    "no-ternary": 0, // disallow ternary operators
    "no-trailing-spaces": 2, // disallow trailing whitespace at the end of lines
    "no-underscore-dangle": 2, // disallow dangling underscores in identifiers
    "no-unneeded-ternary": 2, // disallow ternary operators when simpler alternatives exist
    "no-whitespace-before-property": 2, // disallow whitespace before properties
    "nonblock-statement-body-position": 2, // enforce the location of single-line statements
    "object-curly-newline": 0, // enforce consistent line breaks inside braces
    "object-curly-spacing": 2, // enforce consistent spacing inside braces
    "object-property-newline": 2, // enforce placing object properties on separate lines
    "one-var": 0, // enforce variables to be declared either together or separately in functions
    "one-var-declaration-per-line": 2, // require or disallow newlines around variable declarations
    "operator-assignment": 2, // require or disallow assignment operator shorthand where possible
    "operator-linebreak": 2, // enforce consistent linebreak style for operators
    "padded-blocks": 0, // require or disallow padding within blocks
    "padding-line-between-statements": 2, // require or disallow padding lines between statements
    "quote-props": 0, // require quotes around object literal property names
    "quotes": 0, // enforce the consistent use of either backticks, double, or single quotes
    "require-jsdoc": 0, // require JSDoc comments
    "semi": 2, // require or disallow semicolons instead of ASI
    "semi-spacing": 2, // enforce consistent spacing before and after semicolons
    "semi-style": 2, // enforce location of semicolons
    "sort-keys": 0, // require object keys to be sorted
    "sort-vars": 0, // require variables within the same declaration block to be sorted
    "space-before-blocks": 2, // enforce consistent spacing before blocks
    "space-before-function-paren": 0, // enforce consistent spacing before function definition opening parenthesis
    "space-in-parens": 1, // enforce consistent spacing inside parentheses
    "space-infix-ops": 2, // require spacing around infix operators
    "space-unary-ops": 2, // enforce consistent spacing before or after unary operators
    "spaced-comment": 1, // enforce consistent spacing after the // or /* in a comment
    "switch-colon-spacing": 2, // enforce spacing around colons of switch statements
    "template-tag-spacing": 2, // require or disallow spacing between template tags and their literals
    "unicode-bom": 2, // require or disallow Unicode byte order mark (BOM)
    "wrap-regex": 2, // require parenthesis around regex literals


    ////////// ECMAScript 6 //////////

    "arrow-body-style": 0, // require braces around arrow function bodies
    "arrow-parens": 0, // require parentheses around arrow function arguments
    "arrow-spacing": 0, // enforce consistent spacing before and after the arrow in arrow functions
    "constructor-super": 0, // require super() calls in constructors
    "generator-star-spacing": 0, // enforce consistent spacing around * operators in generator functions
    "no-class-assign": 0, // disallow reassigning class members
    "no-confusing-arrow": 0, // disallow arrow functions where they could be confused with comparisons
    "no-const-assign": 0, // disallow reassigning const variables
    "no-dupe-class-members": 0, // disallow duplicate class members
    "no-duplicate-imports": 0, // disallow duplicate module imports
    "no-new-symbol": 0, // disallow new operators with the Symbol object
    "no-restricted-imports": 0, // disallow specified modules when loaded by import
    "no-this-before-super": 0, // disallow this/super before calling super() in constructors
    "no-useless-computed-key": 0, // disallow unnecessary computed property keys in object literals
    "no-useless-constructor": 0, // disallow unnecessary constructors
    "no-useless-rename": 0, // disallow renaming import, export, and destructured assignments to the same name
    "no-var": 0, // require let or const instead of var
    "object-shorthand": 0, // require or disallow method and property shorthand syntax for object literals
    "prefer-arrow-callback": 0, // require using arrow functions for callbacks
    "prefer-const": 0, // require const declarations for variables that are never reassigned after declared
    "prefer-destructuring": 0, // require destructuring from arrays and/or objects
    "prefer-numeric-literals": 0, // disallow parseInt() and Number.parseInt() in favor of binary, octal, and hexadecimal literals
    "prefer-rest-params": 0, // require rest parameters instead of arguments
    "prefer-spread": 0, // require spread operators instead of .apply()
    "prefer-template": 0, // require template literals instead of string concatenation
    "require-yield": 0, // require generator functions to contain yield
    "rest-spread-spacing": 0, // enforce spacing between rest and spread operators and their expressions
    "sort-imports": 0, // enforce sorted import declarations within modules
    "symbol-description": 0, // require symbol descriptions
    "template-curly-spacing": 0, // require or disallow spacing around embedded expressions of template strings
    "yield-star-spacing": 0 // require or disallow spacing around the * in yield* expressions

  }

};
