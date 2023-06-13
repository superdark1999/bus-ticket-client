import axiosAdmin from 'api/apiAdmin';

const getCoachList = async () => {
  const url = '/coach/list';
  const res = await axiosAdmin.axiosAdminCoach.get(url);
  const { coachList } = res.data;

  return coachList;
};

const createNewCoach = async (model: any, capacity: any, registrationNumber: any) => {
  const url = '/coach/new-coach';
  const data = { model, capacity, registrationNumber };
  const res = await axiosAdmin.axiosAdminCoach.post(url, data);
  const { newCoach } = res.data;

  return newCoach;
};

const deleteCoach = async (id: any) => {
  const url = `/coach/delete/${id}`;
  await axiosAdmin.axiosAdminCoach.delete(url);
};

const updateCoach = async (id: any, capacity: any, model: any, registrationNumber: any) => {
  const url = '/coach/update';
  const res = await axiosAdmin.axiosAdminCoach.patch(url, { id, capacity, model, registrationNumber });

  const { newCoach } = res.data;
  return newCoach;
};

export default {
  getCoachList,
  createNewCoach,
  deleteCoach,
  updateCoach,
};
