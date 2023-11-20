import { atom, selector } from "recoil";

const logedInUser = atom({
    key: "logedInUser",
    default: {
        user : "",
        access:"",
        email:"",
    }
  });

  export {
    logedInUser
  }