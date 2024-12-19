import { callApi, callingApi } from './http.service';
import { API } from '@utils/enums';
import { ICreateLead, IPageParams } from '@/interfaces';
import { ApiError } from 'next/dist/server/api-utils';

class LeadsService{
    getLeadsByParams = async (pageParams:IPageParams) => {
      const url = `api/lead-app/lead/read/get-all?pageNum=${pageParams.pageNum}&pageSize=${pageParams.pageSize}`;
      return await callApi(url, API.GET);
    };

    getAttendance = async (userId:string) => {
      const url = `users/attendance?userId=${userId}`;
      return await callingApi(url,API.GET);
    }

    getFilteredStatuses = async (filters:URLSearchParams) => {
      const url = `/api/lead-app/lead/read/get-all?${filters.toString()}`;
      console.log("filters api",url);
      return await callApi(url,API.GET);
    }

    getLeadStats = async () => {
      const url = `api/lead-app/lead/read/get-lead-kpis`;
      return await callApi(url, API.GET);
    };

    getLeadsClass = async () => {
      const url ='api/standard/read/get-all';
      return await callApi(url,API.GET);
    }

    createLead = async (leadData:ICreateLead) => {
      const url = `api/lead-app/lead/write/create-or-update`; // The endpoint URL
      return await callApi(url, API.POST, leadData); // Assuming `callApi` handles POST requests
    };

    getLeadsCount = async () => {
      const url = 'api/lead-app/lead/read/get-lead-kpis';
      return await callApi(url,API.GET);
    }

    sendOtp = async (phoneNumber:object) => {
      const url = 'api/authentication/otp';
      return await callApi(url,API.POST,phoneNumber);
    }

    verifyOtp = async (phoneInfo:object) => {
      const url = 'api/authentication/verify';
      return await callApi(url,API.POST,phoneInfo);
    }

}

export const leadServiceInstance = new LeadsService();