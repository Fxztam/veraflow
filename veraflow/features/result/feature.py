from veraflow.core.feature import CompilerFeature, FeatureContribution

class ResultFeature(CompilerFeature):
    name = "result"
    def contribute(self):
        return FeatureContribution(
            name=self.name,
            grammar_files=["veraflow/grammar/veraflow.lark"] if self.name == "core" else [],
            ast_nodes=['ResultTypeName', 'ResultValue'],
            verifier_hooks=['Result<T,E> returns'],
            interpreter_hooks=['ResultValue runtime'],
            test_filter="result",
        )
