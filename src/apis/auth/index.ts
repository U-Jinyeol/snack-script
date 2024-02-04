import client, { HttpResponse } from "@/utils/httpClient";
import { showSuccessAlert, showErrorAlert } from "@/utils/alert";
import { SignRequestBody } from "./type";

export const _signUp = async (
  signUpRequestBody: SignRequestBody
): Promise<HttpResponse | null> => {
  try {
    const response = await client.post("/auth/signup", signUpRequestBody);
    showSuccessAlert();
    return response;
  } catch (error: any) {
    showErrorAlert({ text: error.message });
    return null;
  }
};

export const _signIn = async (
  signInRequestBody: SignRequestBody
): Promise<HttpResponse | null> => {
  try {
    const response = await client.post("/auth/signin", signInRequestBody);
    return response;
  } catch (error: any) {
    showErrorAlert({ text: error.message });
    return null;
  }
};
