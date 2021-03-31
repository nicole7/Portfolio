import * as esbuild from 'esbuild-wasm';
 
//function declaration
export const unpkgPathPlugin = () => {
  //that returns a function - that is a plugin that works inside ESBuild
  return {
    //this property will be printed out by ESBuild
    name: 'unpkg-path-plugin',
    //This function will be called by ESBuild - represents the bundling process
    setup(build: esbuild.PluginBuild) {
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResole', args);
        return { path: args.path, namespace: 'a' };
      });
 
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
 
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import message from './message';
              console.log(message);
            `,
          };
        } else {
          return {
            loader: 'jsx',
            contents: 'export default "hi there!"',
          };
        }
      });
    },
  };
};