import { Command } from 'commander';
import { serve } from 'local-api';
import path from 'path';

//square brackets indicate valie is optional and angled brackets are required
export const serveCommand = new Command()
    .command('serve [filename]')
    .description('Open a file for editing')
    .option('-p, --port <number>', 'Port to run server on', '4005')
    .action((filename = 'notebook.js', options: { port: string }) => {
        const dir = path.join(process.cwd(), path.dirname(filename))
        serve(parseInt(options.port), path.basename(filename), dir)
    });