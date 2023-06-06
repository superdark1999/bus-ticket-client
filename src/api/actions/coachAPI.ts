import axiosAdmin from "api/apiAdmin";
import { ICoach } from "views/Admin/tabs/Assets";

const getCoachList = async () => {
    const url = '/coach/list';
    const res = await axiosAdmin.axiosAdminCoach.get(url);
    const {coachList} = res.data;

    return coachList;
}

const createNewCoach = async (model: any, capacity: any, registrationNumber: any) => {
    const url = '/coach/new-coach';
    const data = {model, capacity, registrationNumber};
    const res = await axiosAdmin.axiosAdminCoach.post(url, data);
    const {newCoach} = res.data;

    return newCoach;
}

export default {
    getCoachList,
    createNewCoach
}