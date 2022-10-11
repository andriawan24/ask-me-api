const topicValidation = {
  name: {
    isEmpty: {
      negated: true,
      errorMessage: 'Please enter name',
    },
    in: ['body'],
  },
};

module.exports = {
  topicValidation,
};
