import { AxiosError, AxiosResponse } from "axios";
// import { appAxios } from "../configs/api-config";
// import { AppError } from "../errors/app-error";
import qs from "qs";
import { appAxios } from "../utils/axios.config";
// import {HandleError as showError } from "../errors/handler";

export const _post = async <T>(api: string, data: any, headers: any = null) => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.post<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.post<T>(api, data);
    }
    if (response.status === 200 || response.status === 201) {
      return response.data;
    } else {
      //   throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _put = async <T>(api: string, data: any, headers: any = null) => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.put<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.put<T>(api, data);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      //   throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _get = async <T>(
  api: string,
  data: any = null,
  headers: any = null,
) => {
  try {
    let url = api;
    if (data) {
      url += `?${qs.stringify(data, {
        arrayFormat: "repeat",
        skipNulls: true,
      })}`;
    }
    console.log(url);
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.get<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.get<T>(url);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      //   throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _patch = async <T>(
  api: string,
  data: any,
  headers: any = null,
) => {
  try {
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.patch<T>(api, data, {
        headers,
      });
    } else {
      response = await appAxios.patch<T>(api, data);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      //   throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

export const _delete = async <T>(
  api: string,
  data: any = null,
  headers: any = null,
) => {
  try {
    let url = api;
    if (data) {
      url += "?";
      for (let key in data) {
        url = `${url}${key}=${data[key]}&`;
      }
      url = url.substring(0, url.length - 1);
    }
    let response: AxiosResponse<T, any>;
    if (headers) {
      response = await appAxios.delete<T>(url, {
        headers,
      });
    } else {
      response = await appAxios.delete<T>(url);
    }
    if (response.status === 200) {
      return response.data;
    } else {
      //   throw new AppError(response.status, response.statusText, response.data);
    }
  } catch (error) {
    throw HandleError(error);
  }
};

const HandleError = (error: any) => {
  if (error instanceof AxiosError) {
    console.log("errrrr", error);
    if (error.response?.status) {
      //   const err = new AppError(
      //     error.response?.status,
      //     "Validation Errors...",
      //     error.response.data
      //   );
      //   showError(err);
      //   return err;
    }
  }
  //   showError(error);
  return error;
};
