import api from "./axios";

export const switchLanguage = async(id:number, language:string)=>{
    try{
        const response = await api.patch(`/settings/${id}/`,
            {
                language
            },
            {
                withCredentials:true
            }
        )

        return response.data
    }catch(error){
        console.error(error)
    }
}

export const switchTheme = async(id:number, theme:string)=>{
    try{
        const response = await api.patch(`/settings/${id}/`,
            {
                theme
            },
            {
                withCredentials:true
            }
        )

        return response.data
    }catch(error){
        console.error(error)
    }
}
