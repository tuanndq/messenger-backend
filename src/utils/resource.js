const resourceMessenger = {
  msg: {
    err: {
      notExistAccount:
        "Sorry, we cannot find an account with this email address. Please try again or create a new account.",
      wrongPassword:
        "Incorrect password. Please try again or you can reset your password.",
      notExistUser: "This user does not exist.",
      generalUserMsg: "Something went wrong, please contact us for help.",
      emailErrMsg: "Email is not in the correct format, please re-enter.",
      emailEmptyMsg: "You have not enter your email.",
      passEmptyMsg: "You have not enter your password.",
      emailExist: "This email has already existed, please try another email.",
      passNotDuplicatedMsg: "Password does not match.",
      fileNotFound: "Error: No files found.",
      generalEmpty: "is empty.",
      notFound: "(id): not found",
      missingInfo: "Missing infomation.",
      duplicated1vs1: "Duplicated 1vs1.",
      dateErrMsg: "Please enter a valid date (format MM/DD/YYYY)",
      nameMsg: "Name can only contain non-numeric characters.",
    },
    success: {
      register: "Registered successfully.",
      login: "Login successully.",
      logout: "Logged out.",
      updateInfo: "Update info successfully.",
      updatePrivacy: "Update privacy information of user successfully.",
      uploadFile: "File uploaded.",
      messageCreate: "Message successfully.",
      removeMessage: "The message has been removed",
    },
  },

  regex: {
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },

  number: {
    defaultMsg: 20,
    defaultConversation: 15,
    defaultUser: 20,
  },
};

module.exports = resourceMessenger;
