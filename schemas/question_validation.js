const questionValidation = {
  title: {
    isEmpty: {
      negated: true,
      errorMessage: 'Please enter title',
    },
    in: ['body'],
  },
  text: {
    isEmpty: {
      negated: true,
      errorMessage: 'Please enter text',
    },
    in: ['body'],
  },
  topics_id: {
    isEmpty: {
      negated: true,
      errorMessage: 'Please enter topics_id',
    },
    in: ['body'],
  },
};

module.exports = {
  questionValidation,
};
