import {Injectable} from '@angular/core';
/**
 * import manual
 *
 *
 */
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

/**
  * add header
  */
 const httpOptions ={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class HttpServerServiceService {

  constructor(private httpClient: HttpClient) { }
  getAll(apiUrl: string):Observable<any>{
    return this.httpClient.get<any>(apiUrl).pipe(
    )
  }
  authen(authenUrl: string, data:any){
    this.httpClient.post(authenUrl, data).pipe();
  }
}
