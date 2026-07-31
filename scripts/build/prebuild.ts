import { runCommand } from '../shared/toolkit.ts'

process.exit(runCommand('node', ['--experimental-strip-types', 'scripts/build/prepare.ts']))
