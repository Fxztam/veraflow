from veraflow.core.feature import CompilerFeature, FeatureContribution

class ControlFeature(CompilerFeature):
    name = "control"
    def contribute(self):
        return FeatureContribution(
            name=self.name,
            grammar_files=["veraflow/grammar/veraflow.lark"] if self.name == "core" else [],
            ast_nodes=['IfStmt', 'WhileStmt'],
            verifier_hooks=['branch + loop checks'],
            interpreter_hooks=['if/while execution'],
            test_filter="control",
        )
