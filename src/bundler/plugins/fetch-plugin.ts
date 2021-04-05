import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
  name: 'filecache'
});

export const fetchPlugin = (inputCode: string) => {
    return {
        name: 'fetch-plugin',
        setup(build: esbuild.PluginBuild) {
            build.onLoad({ filter: /(^index\.js$)/ }, () => {
                //giving ESBuild the files and body directly
                return {
                    loader: 'jsx',
                    contents: inputCode,
                };
            });
            //catch all for other files not named otherwise
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                //return null so it keeps trying to build below and eventually return some result
                    //return null;
                
                //Check to see if we have already fetched this file
                //and if it is in the cache
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                //if it is, return it immediately
                if (cachedResult) {
                    return cachedResult;
                };
            })

            //for css files
            build.onLoad({ filter: /.css$/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);
                const escaped = data
                    .replace(/\n/g, '')
                    .replace(/"/g, '\\"')
                    .replace(/'/g, "\\'");
                
                //esbuild cannot handle css so this is a hacky workaround - however, we cant leverage all css advanced features
                const contents =
                    `
                    const style = document.createElement('style');
                    style.innerText = '${escaped}';
                    document.head.appendChild(style);
                    `;

                const result: esbuild.OnLoadResult =  {
                loader: 'jsx',
                contents,
                resolveDir: new URL('./', request.responseURL).pathname,
                };
                //store response in cache
                await fileCache.setItem(args.path, result);
                return result;
            });

            //load the file - plain js files
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                const { data, request } = await axios.get(args.path);

                const result: esbuild.OnLoadResult =  {
                loader: 'jsx',
                contents: data,
                resolveDir: new URL('./', request.responseURL).pathname,
                };
                //store response in cache
                await fileCache.setItem(args.path, result);
                return result;

            });
        }
    };
};

