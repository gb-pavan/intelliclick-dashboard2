import { callApi } from './http.service';
import { API } from '@utils/enums';
import { IPageParams } from '@/interfaces';

class LeadsService{
    getLeadsByParams = async (pageParams:IPageParams) => {
        const url = `api/lead-app/lead/read/get-all?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`;
        return await callApi(url, API.GET);
      };

    getLeadStats = async () => {
    const url = `api/lead-app/lead/read/get-lead-kpis`;
    return await callApi(url, API.GET);
  };
}

export const leadServiceInstance = new LeadsService();