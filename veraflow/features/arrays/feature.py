from veraflow.core.feature import CompilerFeature, FeatureContribution

class ArraysFeature(CompilerFeature):
    name = "arrays"
    def contribute(self):
        return FeatureContribution(
            name=self.name,
            grammar_files=["veraflow/grammar/veraflow.lark"] if self.name == "core" else [],
            ast_nodes=['ArrayTypeName', 'ArrayLiteralExpr', 'IndexExpr'],
            verifier_hooks=['array length/index'],
            interpreter_hooks=['array runtime'],
            test_filter="array",
        )
