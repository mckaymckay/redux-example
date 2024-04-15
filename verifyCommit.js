import chalk from 'chalk';
import fs from 'fs';

const msgPath = process.argv[2];
if (!msgPath) process.exit();

function removeComment(msg) {
  return msg.replace(/^#.*[\n\r]*/gm, '');
}

const msg = removeComment(fs.readFileSync(msgPath, 'utf-8').trim());

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|dep|example|Merge)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(`提交的commit信息无效`)}\n\n` +
      chalk.red(`  Proper commit message format is required for automated changelog generation. Examples:\n\n`) +
      `    ${chalk.green(`feat(bundler-webpack): add 'comments' option`)}\n` +
      `    ${chalk.green(`fix(core): handle events on blur (close #28)`)}\n\n` +
      chalk.red(`  See .github/commit-convention.md for more details.\n`)
  );
  process.exit(1);
}