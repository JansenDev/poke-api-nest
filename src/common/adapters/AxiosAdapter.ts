import { Injectable } from '@nestjs/common';
import { HttpClient } from '../interfaces/httpClient.interface';
import axios, { AxiosInstance } from 'axios';


@Injectable()
export class AxiosAdapter implements HttpClient {
  private readonly axios: AxiosInstance = axios;

  constructor() {}
  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get(url);
      return data;
    } catch (error) {
      throw new Error('this is a error - check logs');
    }
  }
}
