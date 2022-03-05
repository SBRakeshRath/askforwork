const initialState = {
  bio: "I am very good at my job. ",
  name: { fName: false, lName: false, mName: false },

  profilePhoto: "https://picsum.photos/200",
  dob: {
    date: new Date().getDate(),
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  loading: true,
  email: "example@example.com",
  email_verified: false,
  phoneNo: "1234567890",
  phoneNo_verified: false,
  token: false,
  additional: {},

  account_disabled: true,
};

class userProfileData {
  constructor(state, action) {
    this.state = state;
    this.action = action;
    this.type = action.type || "default";
  }

  setData(data) {
    this.state = {
      ...this.state,
      ...data,
    };
  }

  reducer() {
    switch (this.action.type) {
      case "SET_DATA":
        this.setData(this.action.data);

        break;

      default:
        break;
    }

    return this.state;
  }
}

const reducerFunction = (state = initialState, action) => {
  return new userProfileData(state, action).reducer();
};
const changeUserDataReducer = reducerFunction;
export default changeUserDataReducer;
