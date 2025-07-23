import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
    state: () => ({
        profile: null as null | {
            name: string,
            email: string,
            phone: string,
            picture: string,
            gender: "male" | "female",
            country: string
        },
        loading: false,
        errorMsg: ""
    }),

    // Getter
    getters: {
        fullName: (state)=> state.profile?.name || "Unkown",
        email: (state)=> state.profile?.email || "unknown@gmai.com",
        phone: (state)=> state.profile?.phone || "phone_number",
        avatar: (state)=>state.profile?.picture || "",
        gender: (state)=>state.profile?.gender || "male",
        location: (state)=> state.profile?.country || "",
    },


    // Actions
    actions: {
        async fetchProfile() {
            this.loading = true;
            this.errorMsg = "";
            
            try {
                const res = await axios.get('https://randomuser.me/api/')
                const rs = res.data.results[0]
                console.log('Oke')
                this.profile = {
                    name: `${rs.name.title} ${rs.name.first} ${rs.name.last}`,
                    email: rs.email,
                    phone: rs.phone,
                    picture: rs.picture.large,
                    gender: rs.gender,
                    country: rs.location.country
                }
            } catch(err: any) {
                this.errorMsg = err.message || "Error";
                
            } finally {
                this.loading = false;
            }
        },

        clearProfile() {
            this.profile = null;
        }
    }

})