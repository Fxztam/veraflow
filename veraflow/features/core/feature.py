from veraflow.core.feature import CompilerFeature, FeatureContribution

class CoreFeature(CompilerFeature):
    name = "core"
    def contribute(self):
        return FeatureContribution(
            name=self.name,
            grammar_files=["veraflow/grammar/veraflow.lark"] if self.name == "core" else [],
            ast_nodes=['Program', 'TypeDecl', 'RoutineDecl'],
            verifier_hooks=['base types', 'contracts'],
            interpreter_hooks=['function/procedure runtime'],
            test_filter="core",
        )
