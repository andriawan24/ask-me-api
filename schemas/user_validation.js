const nameValidation = {
  name: {
    isEmpty: {
      negated: true,
      errorMessage: 'Name cannot empty',
    },
    in: ['body'],
  },
};

const emailValidation = {
  email: {
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: 'Email cannot empty',
    },
    isEmail: {
      bail: true,
      errorMessage: 'Email format is not valid',
    },
  },
};

const passwordValidation = {
  password: {
    isEmpty: {
      negated: true,
      bail: true,
      errorMessage: 'Password cannot empty',
    },
    isLength: {
      options: {
        min: 8,
        max: 14,
      },
      errorMessage: 'Password length must be 8-14',
    },
  },
};

module.exports = {
  nameValidation,
  emailValidation,
  passwordValidation,
};
