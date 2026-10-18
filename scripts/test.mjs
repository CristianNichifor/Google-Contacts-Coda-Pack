import {mkdtempSync, mkdirSync, readFileSync, writeFileSync, rmSync} from 'node:fs';
import {spawnSync} from 'node:child_process';
import {resolve, dirname} from 'node:path';
import ts from 'typescript';

// Transpile only: the SDK CLI remains the pack build/validation authority.
const root = resolve(import.meta.dirname, '..');
mkdirSync(resolve(root, '.tmp'), {recursive: true});
const output = mkdtempSync(resolve(root, '.tmp/tests-'));
try {
  for (const file of ['pack.ts', 'tests/pack.test.ts']) {
    const target = resolve(output, file.replace(/\.ts$/, '.js'));
    mkdirSync(dirname(target), {recursive: true});
    const result = ts.transpileModule(readFileSync(resolve(root, file), 'utf8'), {
      fileName: file,
      compilerOptions: {target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, esModuleInterop: true},
    });
    writeFileSync(target, result.outputText);
  }
  const run = spawnSync(process.execPath, [resolve(output, 'tests/pack.test.js')], {stdio: 'inherit'});
  if (run.error) throw run.error;
  process.exitCode = run.status ?? 1;
} finally {
  rmSync(output, {recursive: true, force: true});
}
