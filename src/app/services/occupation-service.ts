import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class OccupationService {

    constructor(private http: HttpClient) {
    }

    getOccupationRatings() {
        return this.http.get('assets/occupation-rating.json').pipe(
            map(res => {
                return res;
            })
        );
    }


    getOccupation() {
        return this.http.get('assets/occupation.json').pipe(
            map(res => {
                return res;
            })
        );
    }
}
