import * as esbuild from 'esbuild-wasm';

//invoke right away by wrapping with paranthesis
  //(async () => {
  //color is key and its value is red, the secon arg
    //await fileCache.setItem('color', 'red');
    //const color = await fileCache.getItem('color');

  //also find this is Application under local storage
    //console.log(color);
//})()

//function declaration
export const unpkgPathPlugin = () => {
  //that returns a function - that is a plugin that works inside ESBuild
  return {
    //this property will be printed out by ESBuild
    name: 'unpkg-path-plugin',
    //This function will be called by ESBuild - represents the bundling process
    setup(build: esbuild.PluginBuild) {
      //Handle root enter file of 'index.js'
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return { path: 'index.js', namespace: 'a' }
      })
      //resolve - find the file 
      //filter is a regular expression - to control when resolve and load are executed 
      //now split in two onResolve functions
      
      //Handle relative paths in a module
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
        };
      });
      //Handle main file of a module
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        //namespace here must be the same if applied to onLoad
        return { path: `https://unpkg.com/${args.path}`, namespace: 'a' };
      });
    },
  };
};