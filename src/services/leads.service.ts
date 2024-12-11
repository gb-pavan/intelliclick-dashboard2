import { callApi } from './http.service';
import { API } from '@utils/enums';

class LeadsService{
    getLeads = async (pageNum: number, pageSize: number) => {
        const url = `api/lead-app/lead/read/get-all?pageNum=${pageNum}&pageSize=${pageSize}`;
        return await callApi(url, API.GET);
      };

    getLeadStats = async () => {
    const url = `api/lead-app/lead/read/get-lead-kpis`;
    return await callApi(url, API.GET);
  };
}

export const leadServiceInstance = new LeadsService();