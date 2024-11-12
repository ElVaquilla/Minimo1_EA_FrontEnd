import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProperty } from '../models/property.model';
import { IReview } from '../models/reviews.model'

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = 'http://localhost:3001/review'
  
  constructor(private http: HttpClient) { }

  // Obtener la lista
  getReviews(propertyId: string, page: Number, limit: Number): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.apiUrl}/${propertyId}/${page}/${limit}`);
  }

  // Agregar una nueva al backend
  addReview(propertyId: string, rating: number): Observable<any> {
    const reviewData = { propertyId, rating }; // Crear el objeto con los datos de la review
    return this.http.post<any>(`${this.apiUrl}`, reviewData); // Enviar los datos en el cuerpo de la solicitud
  }

  // Actualizar un usuario existente
  updateReview(review: IReview): Observable<IReview> {
    return this.http.put<IReview>(`${this.apiUrl}/${review._id}`, review);
  }

  // Eliminar una por su ID
  deleteReview(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
