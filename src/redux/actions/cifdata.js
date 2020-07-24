export const cifDataState = (cifData) => {
    return (dispatch) => {
            dispatch({
              type: "UPLOAD_CIF_DATA",
              payload:cifData,
            });
         
  }
}