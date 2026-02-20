import axios from 'axios';
import { 
  ApiResponse, 
  BusSummary, 
  ServiceDetail 
} from '@/types/trip.types';

const API_BASE_URL = '/api/proxy';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export interface BusSearchParams {
  srcCode: string;
  destCode: string;
  dt: string; 
}

export interface ServiceDetailParams {
  id: string;
  apiType: number;
  token?: string;
  srcCode: string;
  destCode: string;
}

export const tripService = {
  // دریافت لیست سفرها
  getBusSummaryList: async (params: BusSearchParams): Promise<BusSummary[]> => {
    try {
      const response = await apiClient.get<ApiResponse<BusSummary>>('/Trip/GetListBusSummarys', {
        params: {
          srcCode: params.srcCode,
          destCode: params.destCode,
          dt: params.dt, 
        },
      });

      if (response.data.status === 0 && response.data.listPayload) {
        return response.data.listPayload;
      }
      return [];
    } catch (error) {
      console.error('Error fetching bus list:', error);
      throw error;
    }
  },

  // ✅ دریافت جزئیات سرویس (با استراتژی کد Nuxt و داکیومنت)
  getServiceDetail: async (params: ServiceDetailParams): Promise<ServiceDetail> => {
    try {
      // 1. دیکد کردن توکن
      const safeToken = params.token ? decodeURIComponent(params.token) : '';

      // 2. آبجکت پایه با تمام پارامترهای ممکن (خالی)
      // دقیقاً مثل کد Nuxt عمل می‌کنیم تا بایندر سرور راضی شود
      const queryParams: any = {
        isPostBack: 'false', // طبق داکیومنت حتما باید false باشد
        srcCode: params.srcCode || '11320000',
        destCode: params.destCode || '31310000',
        busId: '',
        serviceId: '',  // d کوچک (طبق PDF)
        serviceID: '',  // D بزرگ (طبق کد Nuxt)
        tripId: '',
        tokenCompany: '', // توکن
        sellerId: '',
        sellerTicketId: '',
        userId: ''
      };

      const type = Number(params.apiType);
      const id = params.id;

      // 3. پر کردن پارامترها بر اساس Type
      switch (type) {
        case 1: // Payaneha
        case 4: // PayanehaWS
          queryParams.tripId = id;
          queryParams.sellerId = safeToken; 
          break;

        case 2: // Safar724
          // طبق داکیومنت فقط busId
          queryParams.busId = id;
          break;
          
        case 3: // Payaneh
          queryParams.serviceId = id;
          queryParams.serviceID = id; // محض احتیاط
          queryParams.tokenCompany = safeToken;
          break;
          
        case 5: // Payanehacom (Royal Safar)
          // ⚠️ استراتژی "همه رو بفرست":
          // چون سرور روی این تایپ حساس است و ID فرمت خاصی دارد.
          // ما ID را در هر دو مدل serviceId می‌فرستیم.
          queryParams.serviceId = id;
          queryParams.serviceID = id; // طبق کد Nuxt
          
          // داکیومنت گفته "بدون Token"، اما جیسون شما توکن داشت و کد Nuxt هم می‌فرستاد.
          // پس می‌فرستیم (اگر سرور نخواهد، نادیده می‌گیرد)
          queryParams.tokenCompany = safeToken;
          break;
          
        default:
          // پیش‌فرض: اگر تایپ ناشناخته بود، به busId و serviceId همزمان می‌فرستیم
          queryParams.busId = id;
          queryParams.serviceId = id;
      }

      console.log("📡 Sending Request (Final Logic):", { url: '/Buy/GetServiceDetail', params: queryParams });

      const response = await apiClient.get<ApiResponse<ServiceDetail>>('/Buy/GetServiceDetail', {
        params: queryParams,
      });

      if (response.data.status === 0 && response.data.data) {
        return response.data.data;
      }
      
      console.warn("⚠️ Backend Error:", response.data);
      throw new Error(response.data.message || 'خطا در دریافت اطلاعات سرویس');
      
    } catch (error) {
      console.error('Error in getServiceDetail:', error);
      throw error;
    }
  },
};