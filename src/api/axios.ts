import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { CodeConfig } from "./codeConfig";
import {
  ResponseModel,
  UploadFileItemModel,
  UploadRequestConfig,
} from "./index";
import { useUserStore } from "@/stores";
import { useSysConfigStore } from "@/stores/config";
import router from "@/router";
import notification from "antd/es/notification";

class HttpRequest {
  service: AxiosInstance;

  constructor() {
    this.service = axios.create({
      baseURL: import.meta.env.VITE_APP_API_BASEURL,
      timeout: 5 * 1000,
    });

    this.service.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        /**
         * set your config
         */
        if (
          import.meta.env.VITE_APP_TOKEN_KEY &&
          useUserStore.getState().token
        ) {
          config.headers[import.meta.env.VITE_APP_TOKEN_KEY] =
            useUserStore.getState().token;
        }
        const defaultLanguage = useSysConfigStore.getState().defaultLanguage;
        if (import.meta.env.VITE_APP_TOKEN_KEY && defaultLanguage) {
          config.headers[import.meta.env.VITE_APP_TOKEN_KEY] = defaultLanguage;
        }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      },
      {
        synchronous: false,
        runWhen: (config: InternalAxiosRequestConfig) => {
          console.log(config, "===config");

          return true;
        },
      },
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse<ResponseModel>): AxiosResponse["data"] => {
        const { data } = response;
        const { code } = data;
        if (code) {
          if (code != CodeConfig.success) {
            switch (code) {
              case CodeConfig.notLogin:
                useUserStore.setState({ token: "" });
                router.navigate("/login", { replace: true });
                break;
              case CodeConfig.notFound:
                notification.error({
                  message: "接口404了",
                  placement: "topRight",
                });
                break;
              case CodeConfig.noPermission:
                notification.error({
                  message: "没权限, 走你",
                  placement: "topRight",
                });
                setTimeout(() => {
                  useUserStore.setState({ token: "" });
                  router.navigate("/login", { replace: true });
                }, 4000);
                break;
              default:
                break;
            }
            return Promise.reject(data.message);
          } else {
            return data;
          }
        } else {
          return Promise.reject("Error! code missing!");
        }
      },
      (error: any) => {
        return Promise.reject(error);
      },
    );
  }

  request<T = any>(config: AxiosRequestConfig): Promise<ResponseModel<T>> {
    /**
     * TODO: execute other methods according to config
     */
    return new Promise((resolve, reject) => {
      try {
        this.service
          .request<ResponseModel<T>>(config)
          .then((res: AxiosResponse["data"]) => {
            resolve(res as ResponseModel<T>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T>> {
    return this.request({ method: "GET", ...config, url });
  }
  post<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T>> {
    return this.request({ method: "POST", ...config, url });
  }
  put<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T>> {
    return this.request({ method: "PUT", ...config, url });
  }
  delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ResponseModel<T>> {
    return this.request({ method: "DELETE", ...config, url });
  }
  upload<T = string>(
    fileItem: UploadFileItemModel,
    config?: UploadRequestConfig,
  ): Promise<ResponseModel<T>> | null {
    if (!import.meta.env.VITE_UPLOAD_URL) return null;

    let fd = new FormData();
    fd.append(fileItem.name, fileItem.value);
    let configCopy: UploadRequestConfig;
    if (!config) {
      configCopy = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
    } else {
      config.headers!["Content-Type"] = "multipart/form-data";
      configCopy = config;
    }
    return this.request({
      url: import.meta.env.VITE_UPLOAD_URL,
      data: fd,
      ...configCopy,
    });
  }
}

const httpRequest = new HttpRequest();
export default httpRequest;
