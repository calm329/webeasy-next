import axios from "axios";
// import { AppError } from "../errors/app-error";
// import { store } from "../store";
// import { router } from "../router";
// import { parseISO } from "date-fns";
export const BASEURL = process.env.REACT_APP_API_URL;
const appAxios = axios.create({
    baseURL: "/",
});
// appAxios.interceptors.request.use((conf) => {
//     const user = store.getState().authSlice.user;
//     if (user) {
//         conf.headers = {
//             ...conf.headers,
//             Authorization: `Bearer ${user.tokens?.accessToken}`,
//         } as any;
//     }
//     return conf;
// });
// appAxios.interceptors.response.use(
//     (resp) => {
//         if (resp.status === 401) {
//             router.navigate("/login", {
//                 replace: true,
//             });
//         }
//         return resp;
//     },
//     (err) => {
//         if (err?.response?.status === 401) {
//             router.navigate("/login", {
//                 replace: true,
//             });
//             throw new AppError(
//                 401,
//                 "Your session has expired. Please login to continue..."
//             );
//         }
//         throw err;
//     }
// );

// function dateTransformer(data: any): any {
//     if (Array.isArray(data)) {
//         return data.map((val) => dateTransformer(val));
//     }
//     if (typeof data === "object" && data !== null) {
//         return Object.fromEntries(
//             Object.entries(data).map(([key, val]) => [
//                 key,
//                 dateTransformer(val),
//             ])
//         );
//     }
//     // eslint-disable-next-line no-useless-escape
//     let reg = RegExp(
//         `^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(\\.[0-9]+)?(Z)?$`
//     );

//     if (reg.test(data)) {
//         return parseISO(data);
//     }
//     return data;
// }
export const GetPhoto = (photo: string) => {
    return `${BASEURL}/${photo}`;
};
export { appAxios };