// import { Axios } from "axios";

// const api = new Axios({baseURL: "http://localhost:8085"});


// export interface IDataResponse {
//   status: number;
//   data?: any;
//   message: string;
//   }

//   export interface AxiosResponse{
//     data: any;
//     status: number;
//     statusText: string;
//     headers: any;
//     request?: any;
//   }

//   export enum STATUS_CODE{
//     OK = 200,
//     CREATED = 201,
//     NO_CONTENT = 204,
//     BAD_REQUEST = 400,
//     INTERNAL_SERVER_ERROR = 500,
//   }

// export const apiGet = async (url: string) : Promise<IDataResponse> =>{

//   try{
//     const response: AxiosResponse = await api.get(url);
//     if(response === undefined){
//       return{
//         status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//         message: "Erro não mapeado"
//       }
//     }
//     if(response.status === STATUS_CODE.NO_CONTENT){
//       return{
//         status: response.status,
//         message: "Nenhum conteúdo foi retornado"
//       }
//     }

//     return{
//       status: response.status,
//       message: "OK",
//       data: JSON.parse(response.data),
//     }
//   }catch (erro) {
//     return{
//       status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//       message: "Erro não mapeado"
      
//     }
//   }
// }

// export const apiPost = async (url: string, data: any) : Promise<IDataResponse> => {
 
//   try {
//       const response: AxiosResponse = await api.post(url, JSON.stringify(data), {
//           headers: {
//               "Content-Type": "application/json"
//           }
//       });

//       if(response === undefined){
//           return {
//               status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//               message: "Erro não mapeado",
//           }
//       }

//       if(response.status === STATUS_CODE.NO_CONTENT){
//           return {
//               status: response.status,
//               message: "Nenhum conteúdo foi retornado"
//           }
//       }

//       return {
//           status: response.status,
//           message: "OK",
//           data: JSON.parse(response.data),
//       }
//   } catch (e) {
//       return {
//           status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//           message: "Erro não mapeado"
//       }
//   }
// }

// export const apiPut = async (url: string, data: any): Promise<IDataResponse> => {
//   try {
//     const response: AxiosResponse = await api.put(url, JSON.stringify(data), {
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     if (response === undefined) {
//       return {
//         status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//         message: "Erro não mapeado",
//       };
//     }

//     if (response.status === STATUS_CODE.NO_CONTENT) {
//       return {
//         status: response.status,
//         message: "Nenhum conteúdo foi retornado"
//       };
//     }

//     return {
//       status: response.status,
//       message: "OK",
//       data: JSON.parse(response.data),
//     };
//   } catch (e) {
//     return {
//       status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//       message: "Erro não mapeado"
//     };
//   }
// };

// export const apiDelete = async (url: string): Promise<IDataResponse> => {
//   try {
//     const response: AxiosResponse = await api.delete(url);

//     if (response === undefined) {
//       return {
//         status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//         message: "Erro não mapeado",
//       };
//     }

//     return {
//       status: response.status,
//       message: "OK",
//       data: response.data,
//     };
//   } catch (e) {
//     return {
//       status: STATUS_CODE.INTERNAL_SERVER_ERROR,
//       message: "Erro não mapeado"
//     };
//   }
// };

import axios, { AxiosResponse } from "axios";

const api = axios.create({ baseURL: "http://localhost:8085" });

export interface IDataResponse {
  status: number;
  data?: any;
  message: string;
}

export enum STATUS_CODE {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

export const apiGet = async (url: string): Promise<IDataResponse> => {
  try {
    const response: AxiosResponse = await api.get(url);
    if (response === undefined) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Erro não mapeado",
      };
    }
    if (response.status === STATUS_CODE.NO_CONTENT) {
      return {
        status: response.status,
        message: "Nenhum conteúdo foi retornado",
      };
    }

    return {
      status: response.status,
      message: "OK",
      data: response.data, // Corrigido aqui
    };
  } catch (erro) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "Erro não mapeado",
    };
  }
};

export const apiPost = async (url: string, data: any): Promise<IDataResponse> => {
  try {
    const response: AxiosResponse = await api.post(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response === undefined) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Erro não mapeado",
      };
    }

    if (response.status === STATUS_CODE.NO_CONTENT) {
      return {
        status: response.status,
        message: "Nenhum conteúdo foi retornado",
      };
    }

    return {
      status: response.status,
      message: "OK",
      data: response.data, // Corrigido aqui
    };
  } catch (e) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "Erro não mapeado",
    };
  }
};

export const apiPut = async (url: string, data: any): Promise<IDataResponse> => {
  try {
    const response: AxiosResponse = await api.put(url, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response === undefined) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Erro não mapeado",
      };
    }

    if (response.status === STATUS_CODE.NO_CONTENT) {
      return {
        status: response.status,
        message: "Nenhum conteúdo foi retornado",
      };
    }

    return {
      status: response.status,
      message: "OK",
      data: response.data, // Corrigido aqui
    };
  } catch (e) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "Erro não mapeado",
    };
  }
};

export const apiDelete = async (url: string): Promise<IDataResponse> => {
  try {
    const response: AxiosResponse = await api.delete(url);

    if (response === undefined) {
      return {
        status: STATUS_CODE.INTERNAL_SERVER_ERROR,
        message: "Erro não mapeado",
      };
    }

    return {
      status: response.status,
      message: "OK",
      data: response.data, // Corrigido aqui
    };
  } catch (e) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      message: "Erro não mapeado",
    };
  }
};

