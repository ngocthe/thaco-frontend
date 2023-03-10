const createMixin = (isCustomForm = false) => ({
  props: isCustomForm
    ? ['formLabelWidth', 'options', 'editing', 'errors', 'loading_search']
    : ['form', 'formLabelWidth', 'options', 'editing', 'errors', 'loading_search'],
  created() {
    if (this.rules) {
      const ruleConverted = this.rules

      for (const fieldName in ruleConverted) {
        ruleConverted[fieldName] = this.rules[fieldName].map(rule => {
          let newMergeObj = {
            message: rule.message
          }

          if (rule.messageParams) {
            for (const fieldParam in rule.messageParams) {
              newMergeObj = {
                message: newMergeObj.message.replace(`:${fieldParam}`, rule.messageParams[fieldParam])
              }
            }
          }

          if (rule.message) {
            newMergeObj = {
              message: newMergeObj.message.replace(':attribute', this.$t(fieldName))
            }
          }

          return { ...rule, ...newMergeObj }
        })
      }

      this.rules = ruleConverted
    }
  }
})

export default createMixin
