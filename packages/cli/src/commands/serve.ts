import { Command } from 'commander';
import { serve } from 'local-api';
import { PRIORITY_BELOW_NORMAL } from 'node:constants';
import path from 'path';

//square brackets indicate valie is optional and angled brackets are required
export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'Port to run server on', '4005')
    .action(async (filename = 'notebook.js', options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename))
            await serve(parseInt(options.port), path.basename(filename), dir)
            console.log(
                `Opened ${filename}. Navigate to http://localhost:${options.port} to edit file`
            )
        } catch (err) {
            if (err.code === 'EADDRINUSE') {
                console.log('Port is in use. Try running on different port');
            } else {
                console.log('Heres the problem', err.message)
            }
            //force exit program with status code of 1 - unsuccessful run of prgram
            process.exit(1);
        }
    });