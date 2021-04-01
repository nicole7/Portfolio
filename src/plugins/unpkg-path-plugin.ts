import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

//function declaration
export const unpkgPathPlugin = () => {
  //that returns a function - that is a plugin that works inside ESBuild
  return {
    //this property will be printed out by ESBuild
    name: 'unpkg-path-plugin',
    //This function will be called by ESBuild - represents the bundling process
    setup(build: esbuild.PluginBuild) {
      //resolve - find the file
      //filter is a regular expression - to control when resolve and load are executed 
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        console.log('onResovle', args);
        if (args.path === 'index.js') {
          return { path: args.path, namespace: 'a' };
        };

        if (args.path.includes('./') || args.path.includes('../').href) {
          return {
            namespace: 'a',
            path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
          };
        };
          
        //namespace here must be the same if applied to onLoad
        return { path: `https://unpkg.com/${args.path}`, namespace: 'a' };
      });
      //load the file
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log('onLoad', args);
        //giving ESBuild the files and body directly
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              import React, { useState } from 'react';
              console.log(React, useState);
            `,
          };
        }
        const { data, request } = await axios.get(args.path);
        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};