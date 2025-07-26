import { baseNESTDemoAPI } from "./baseDemoAPI";

export interface LoginDTO {
    phone: string,
    password: string
}

export const onLoginAuthAPI = async function (loginDto: LoginDTO) {
    try {
        const res = await baseNESTDemoAPI.post('/auth/login', loginDto);
        if (res) {
            return res.data
        }
    } catch (err: any) {
        console.log(err)
        return {
            isSuccess: false,
            message: err.message
        }
    }
}

export const onGetAdminContent = async function () {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }

    try {
        const res = await baseNESTDemoAPI.get('admin/get-content',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data
    } catch (err: any) {
        return {
            isSuccess: false
        }
    }
}

export const onGetMe = async function () {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const res = await baseNESTDemoAPI.get('user/me',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return res.data
    } catch (err: any) {
        return {
            isSuccess: false
        }
    }
}

export interface createUserDto {
    name: string,
    password: string,
    address: string,
    phone: string,
}

export const onCreateNewUser = async function (newUser: createUserDto) {
    try {
        const res = await baseNESTDemoAPI.post('user',
            newUser
        )
        return res.data
    } catch (err: any) {
        return {
            isSccess: false
        }
    }
}


export const onDelete = async function (name: string) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const res = await baseNESTDemoAPI.delete(`user/delete?name=${name}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (err: any) {
        return {
            isSccess: false
        }
    }
}