export const knowledgeBaseI18n = {
  en: {
    knowledgeBaseType: "Type",
    knowledgeBaseName: "Name",
    knowledgeBaseDesc1: "Can fill in any",
    knowledgeBaseDesc2:
      "Business background, business knowledge, business processes, leadership's analytical tendency, management ideas, etc",
    knowledgeBaseDesc3:
      "Describe table associations directly in text. The following writing styles can be referenced.",
    knowledgeBaseDesc4:
      "[A table name].[X field] left join [B table name].[Y field]",
    knowledgeBaseDesc5:
      "[Order table a].[Order date] is associated with [Target table b].[Month]",
    knowledgeBaseDesc6:
      "First convert the order date field in the order table a to month format, and then associate it with the month field in the target table b.",
    knowledgeBaseJargon: "terminology jargon knowledge base",
    knowledgeBaseJargonDesc: "Supplementary term explanations and comparisons",
    knowledgeBaseJargonName: "Terminology name",
    knowledgeBaseJargonBusiness: "Business",
    knowledgeBaseJargonBusinessDesc:
      "The business classification to which the term belongs, multiple classifications can be written.",
    knowledgeBaseJargonIndicator: "Corresponding indicator",
    knowledgeBaseJargonIndicatorDesc:
      "Indicators related to this term, write those that require special correspondence, general indicators can be omitted",
    knowledgeBaseJargonField: "Corresponding field",
    knowledgeBaseJargonFieldDesc:
      "The table/field corresponding to this term. [Table].[Field] or just write the corresponding [Field].",
    knowledgeBaseCommonQuestion: "Common question",
    knowledgeBaseCommonQuestionsub: "Add common question file",
    knowledgeBaseCommonQuestionDesc:
      "Set common business questions, and use them directly in the conversation",
    knowledgeBaseCommonQuestionCategory: "Category",
    knowledgeBaseCommonQuestionCategoryDesc:
      "Use directly when asking Chat for data to solve the problem of not knowing what to ask or being too lazy to type...",
    createCommonQuestion: "Create Common Question",
    createKnowledge: "Add Knowledge",
    createTableFiled: "Add Table Field",
  },
  zh: {
    knowledgeBaseName: "名称",
    knowledgeBaseType: "类型",
    knowledgeBaseDesc1: "可填写任意的",
    knowledgeBaseDesc2:
      "业务背景、业务知识、业务流程、领导的分析倾向、管理思路等等",
    knowledgeBaseDesc3: "用文字直接描述表关联关系，以下写法都可参考",
    knowledgeBaseDesc4: "[A表名].[X字段] 左关联 [B表名].[Y字段]",
    knowledgeBaseDesc5: "[订单表a].[订单日期] 关联 [目标表b].[月份]",
    knowledgeBaseDesc6:
      "先将订单表a的订单日期字段转为月，再与目标表b的月份字段关联",
    knowledgeBaseJargon: "术语黑话知识库",
    knowledgeBaseJargonDesc: "补充术语解释和对照",
    knowledgeBaseJargonName: "术语名称",
    knowledgeBaseJargonBusiness: "所属业务",
    knowledgeBaseJargonBusinessDesc: "术语所属的业务分类，可写多个",
    knowledgeBaseJargonIndicator: "对应指标",
    knowledgeBaseJargonIndicatorDesc:
      "与此术语相关的指标，写需要特殊对应的，通用型指标可不用写",
    knowledgeBaseJargonField: "对应字段",
    knowledgeBaseJargonFieldDesc:
      "此术语对应的表/字段。[表].[字段] 或 只写对应[字段]",
    knowledgeBaseCommonQuestion: "常用问题",
    knowledgeBaseCommonQuestionsub: "添加常用问题文件",
    knowledgeBaseCommonQuestionDesc: "设置常用的业务问题，对话时直接用",
    knowledgeBaseCommonQuestionCategory: "分类",
    knowledgeBaseCommonQuestionCategoryDesc:
      "Chat问数时直接使用，解决不知道问啥，懒得打字….",
    createCommonQuestion: "新建常用问题",
    createKnowledge: "添加知识文件",
    createTableFiled: "添加数据表",
  },
};

export type KnowledgeBaseTranslations = typeof knowledgeBaseI18n.en;
