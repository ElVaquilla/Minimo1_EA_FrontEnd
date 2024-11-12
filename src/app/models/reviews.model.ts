export interface IReview {
    _id?: string;  // ID de la review
    owner: string; // ID del usuario que publica la review
    property: string; // Propiedad
    rating: number; // Puntuación del usuario
  }