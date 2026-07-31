import { runCommand } from '../shared/toolkit.mts'

process.exit(runCommand('node', ['--experimental-strip-types', 'scripts/build/verify.mts']))
