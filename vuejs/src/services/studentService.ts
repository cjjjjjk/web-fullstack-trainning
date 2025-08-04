import { baseNESTDemoAPI } from "./baseDemoAPI";
import { ClassEntity } from "./classService";

export interface StudentEntity {
    name: string;
    mssv: string;
    address: string;
    email: string;
    class: ClassEntity | null
}

export interface PaginationConfig {
    page: number;
    limit: number;
}
export interface SortConfig {
    sortField: 'name' | 'mssv' | 'address' | 'email',
    sortType: 'asc' | 'desc'
}

export const createStudent = async function (student: StudentEntity) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const res = await baseNESTDemoAPI.post('/student', student,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return res.data;
    } catch (error) {
        console.error('create error:', error);
    }
};

export const updateStudent = async function (mssv: string, studentUpdate: Partial<StudentEntity>) {

    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        errCode: 'token-require',
        message: "token require !"
    }

    try {
        const res = await baseNESTDemoAPI.patch(`/student/update?mssv=${mssv}`, studentUpdate,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        return res.data;
    } catch (error) {
        console.error('ipdate student error:', error);
    }
};

export const getAllStudents = async function (pagination: PaginationConfig) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const res = await baseNESTDemoAPI.get('/student/all', {
            params: pagination, headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data.isSuccess === true) {
            return res.data;
        }
    } catch (error) {
        console.error('all students error:', error);
    }
};

export const getStudentByMssv = async function (mssv: string) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const res = await baseNESTDemoAPI.get(`/student/${mssv}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        if (res.data.isSuccess === true) {
            return res.data.data;
        }
    } catch (error) {
        console.error('by MSSV error:', error);
    }
};

export const deleteStudent = async function (mssv: string) {
    const token = localStorage.getItem('access_token')
    if (!token) return {
        isSuccess: false,
        message: "token require !"
    }
    try {
        const res = await baseNESTDemoAPI.delete(`/student?mssv=${mssv}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        console.log('DELETE', res)
        if (res.data.isSuccess === true) {
            return res.data.data;
        }
    } catch (error) {
        console.error('delete student error:', error);
    }
};

export const filterStudents = async function (
    filters: Partial<StudentEntity>,
    pagination: PaginationConfig,
    sort: SortConfig
) {
    const token = localStorage.getItem('access_token');
    if (!token) {
        return {
            isSuccess: false,
            message: "token required!"
        };
    }

    const { class: classObj, ...restFilters } = filters;
    const queryParams = {
        ...restFilters,
        ...(classObj?.id ? { classId: classObj.id } : {}),
        ...pagination,
        ...sort
    };

    try {
        const res = await baseNESTDemoAPI.get('/student', {
            params: queryParams,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if (res.data) {
            return res.data;
        }
    } catch (error) {
        console.error('filter students error:', error);
    }
};

