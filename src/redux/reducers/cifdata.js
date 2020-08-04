const init_state = {
   cifData:[]
  };  
  
  export default (state = init_state, action) => {

    console.log(action.payload);

    
    switch (action.type) {
      case "UPLOAD_CIF_DATA":

        return { ...state, cifData: action.payload };
      default:
        return { ...state, };
    }
  };