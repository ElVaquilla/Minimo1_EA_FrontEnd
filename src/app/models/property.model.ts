import { IReview } from '../models/reviews.model'

export interface IProperty {
  _id?: string;  // Propiedad opcional _id para el ID de la experiencia
  owner: string; // ID del propietario (usuario)
  address: string; 
  reviews?: IReview[]
  description?: string; // Descripción de la experiencia
}

  