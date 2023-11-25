import { atom, selector } from "recoil";

const logedInUser = atom({
    key: "logedInUser",
    default: {
        user : "",
        access:"",
        email:"",
    }
  });

const newStujectDashboard = atom({
  key:"newStujectDashboard",
  default:[]
})

  export {
    logedInUser,
    newStujectDashboard
  }