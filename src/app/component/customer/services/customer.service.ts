import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserStorageService } from '../../../auth/component/storage/user-storage.service';
import { Observable } from 'rxjs';

const BASIC_URL = 'http://localhost:3030/';
@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getAllRooms(pageNumber: number): Observable<any> {
    const token = UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(BASIC_URL + `api/customer/rooms/${pageNumber}`, {
      headers,
      responseType: 'json',
    });
  }
  getRoom(pageNumber: number, roomType?: string): Observable<any> {
    let params = new HttpParams().set('pageNumber', pageNumber.toString());
    if (roomType) {
      params = params.set('roomType', roomType);
      return this.http.get(
        'http://localhost:3030/api/customer/rooms/filterBy',
        {
          params,
        }
      );
    }
    return this.getAllRooms(pageNumber);
  }

  bookRoom(bookingDto: any): Observable<any> {
    const token = UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(BASIC_URL + `api/customer/book`, bookingDto, {
      headers,
      responseType: 'json',
    });
  }

  getMyBookings(pageNumber: number): Observable<any> {
    const userId = UserStorageService.getUserId();
    const token = UserStorageService.getToken();
    const headers = new HttpHeaders({
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      BASIC_URL + `api/customer/bookings/${userId}/${pageNumber}`,
      {
        headers,
        responseType: 'json',
      }
    );
  }
}
