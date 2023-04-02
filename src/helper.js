export function succesServiceResponse(data , message="success" ) {
     return {
         status:200 ,
         result:data ,
         error:false,
         message: message  
     }
     
    
}

export function failedServiceResponse(err , message="failed" ) {
     
    return {
        error:err,
        status:404 ,
        result:null ,
        error:true,
        message: message  
    }
    

    
}
