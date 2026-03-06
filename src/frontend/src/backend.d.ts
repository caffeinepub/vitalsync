import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactForm {
    name: string;
    email: string;
    message: string;
}
export interface Signup {
    name: string;
    email: string;
}
export interface backendInterface {
    getAllContactForms(): Promise<Array<ContactForm>>;
    getAllSignups(): Promise<Array<Signup>>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    submitSignup(name: string, email: string): Promise<void>;
}
