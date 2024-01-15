export interface BaseRequestJson<T = void> {
session_id: string;
request_id: string;
request_source: string;
data?: T;
}