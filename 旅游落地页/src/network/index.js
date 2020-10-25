import Http from './http';

const http = new Http();

//真实接口
export const getRisk = data =>
  http.post(`/risk/submit`, data, '', { formData: true, dealData: false }); //获取风控的接口
