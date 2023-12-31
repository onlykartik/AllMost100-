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
});


const listOfAllAssignees = atom({
  key : "listOfAllAssignees",
  default :[]
});

const filteredListOfAssignees = selector({
  key: "filteredListOfAssignees",
  get: ({ get }) => {
    const assignees = get(listOfAllAssignees);
    console.log("Inside filteredListOfAssignees")

    if(assignees){

     return assignees;
    }else{
      return [];
    }
  }
});

const listOfAllStudents = atom({
  key:"listOfAllStudents",
  default :[]
})

const listOfAllStuAndAssCreds = atom({
  key:"listOfAllStuAndAssCreds",
  default :[]
})


  export {
    logedInUser,
    newStujectDashboard,
    listOfAllAssignees,
    listOfAllStudents,
    listOfAllStuAndAssCreds,
    filteredListOfAssignees
  }