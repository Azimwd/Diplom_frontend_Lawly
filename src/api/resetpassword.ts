import api from "./axios";


export const requestReset = async (email: string) =>{
    try{
        const response = await api.post('/users/request-reset-email/',
            {
                email
            }
        )

        return response.data;
    }catch(error:any){
        console.error(error);
    }
}

export const passwordComplete = async (uidb64: string, token: string, password: string) =>{
    try{
        const response = await api.post('/users/password-reset-complete/',
            {
                uidb64,
                token,
                password
            }
        )

        return response.data;
    }catch(error:any){
        console.error(error);
    }
}