# VeraFlow CLI Toolchain

This adds a small command-line frontend without changing the VeraFlow language syntax.

## Commands

```bash
python -m veraflow run examples/hello_cli.vf
python -m veraflow verify examples/hello_cli.vf
python -m veraflow ast examples/hello_cli.vf
python -m veraflow test --log cli_test.log --json-summary cli_summary.json
python -m veraflow ebnf
```

Step-by-step source directory test command:

```powershell
.\test.ps1
.\test.ps1 --quick
.\test.ps1 01_core
```

Or from `cmd.exe`:

```cmd
test.cmd
test.cmd --quick
test.cmd 01_core
```

The step runner executes the CLI smoke test, the core language module tests, the full regression suite, and the example demos. Use `--quick` for the shorter loop while working on diagnostics.
Pass a language module name such as `01_core` to run only that module.

Short developer commands:

```powershell
.\vfenv.ps1
vfrun .\tests\language_modules\01_core\valid\minimal_module.vf
vfverify .\tests\language_modules\01_core\valid\minimal_module.vf
vfast .\tests\language_modules\01_core\valid\minimal_module.vf
vftest 01_core
```

From the workspace root `D:\works\Work-VeraFlow`, use:

```powershell
.\vfenv.ps1
vfrun .\veraflow_v11f_cli\veraflow_v10_5_modular\tests\language_modules\01_core\valid\minimal_module.vf
vftest 01_core
```

After `vfenv.ps1`, the same short commands also work from subfolders, for example inside `tests\language_modules\01_core\valid`:

```powershell
vfrun .\minimal_module.vf
vfverify .\minimal_module.vf
```

The core language module can also be tested directly from its folders:

```powershell
cd tests\language_modules\01_core
.\test.ps1

cd invalid_syntax
.\test.ps1
```

Optional Windows wrappers:

```cmd
veraflow.cmd run examples/hello_cli.vf
```

PowerShell:

```powershell
.\veraflow.ps1 run examples/hello_cli.vf
```
