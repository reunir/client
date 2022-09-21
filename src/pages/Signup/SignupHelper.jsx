import YourProfile from "./YourProfile";

export default function SignupHelper({whichPart,setisNextDisabled}){
    if(whichPart===0){
        return(<YourProfile setisNextDisabled={setisNextDisabled}/>);
    }
}