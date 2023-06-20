export function getQsIndexByTopic(questions, topic) {
  return questions.findIndex(qsObj => {
      if (Object.keys(qsObj)[0].toLowerCase() === topic) {
          return qsObj
      }
  })
};