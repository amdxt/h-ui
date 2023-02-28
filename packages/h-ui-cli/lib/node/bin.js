#!/usr/bin/env node
import { Command } from 'commander';
import { getCliVersion } from './shared/fsUtils.js';
import { welcome } from './utils/programmeWelcome.js';
// 支持顶层 await
await welcome();
const program = new Command();
program.version(`varlet-cli ${getCliVersion()}`).usage('<command> [options]');
program
    .command('compile')
    .description('Compile varlet components library code')
    .action(async () => {
    const { compile } = await import('./commands/compile.js');
    return compile();
});
program.parse();
