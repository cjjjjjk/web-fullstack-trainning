import { baseNESTDemoAPI } from "./baseDemoAPI";
import { PaginationConfig, SortConfig } from "./studentService";

export interface ClassEntity {
    id: number,
    code: string,
    name: string,
    totalStudent?: number
}

export const createClass = async function (
    newClass: ClassEntity
) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }

    try {
        const res = await baseNESTDemoAPI.post('/class', newClass, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (err: any) {
        console.log(err)
    }
}
export const updateClass = async function (
    newClass: ClassEntity
) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
}


export const filterClasses = async function (
    filters: Partial<ClassEntity>,
    pagination: PaginationConfig,
    soft: SortConfig
) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }

    try {
        const res = await baseNESTDemoAPI.get('/class', {
            params: {
                ...filters,
                ...pagination,
                ...soft
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (res.data) {
            return res.data;
        }
    } catch (error) {
        console.error('filter class er:', error);
    }
};

export const getAllClassAPI = async function (): Promise<any> {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }

    try {
        const apiRes = await baseNESTDemoAPI.get('/class/all', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if (apiRes) {
            return apiRes.data
        }
    } catch (err: any) {
        return {
            isSuccess: false,
            data: []
        }
    }
}

export const deleteClassByCode = async function (code: string): Promise<any> {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const apiRes = await baseNESTDemoAPI.delete(`/class?code=${code}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },

        })
        if (apiRes) {
            return apiRes.data
        }
    } catch (err: any) {
        return {
            isSuccess: false,
            data: []
        }
    }
}

export const getAllClassesSortedByTotalStudent = async function (): Promise<any> {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }

    try {
        const res = await baseNESTDemoAPI.get('/class', {
            params: {
                limit: 999999, // No limit
                sortOrder: 'desc' // Descending order
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res.data
    } catch (err: any) {
        console.error('getAllClassesSortedByTotalStudent error:', err)
        return {
            isSuccess: false,
            data: [],
            message: err.message
        }
    }
}