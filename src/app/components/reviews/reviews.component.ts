import { Component, Inject, Input, OnInit } from '@angular/core';
import { IReview } from '../../models/reviews.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReviewsService } from '../../services/reviews.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { NgxPaginationModule} from 'ngx-pagination';


@Component({
  selector: 'app-reviews',
  standalone: true,
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  imports: [FormsModule, CommonModule, HttpClientModule, TruncatePipe, NgxPaginationModule]
})
export class ReviewsComponent implements OnInit {
  @Input() property: any;
  @Input() userRating: number = 0;
  reviews: any; // Array para almacenar las valoraciones de los usuarios
  page: number = 1; // Página actual
  limit: number = 5; // Número de reviews por página
  totalReviews: number = 0; // Total de reviews
  totalPages: number = 1; // Total de páginas de reviews
  ratings: number[] = []; // Lista de valoraciones
  errorMessage: string = '';

  newReview: IReview = {
    owner: '',
    property: '',
    rating: 0,
  };

  constructor(
    private dialogRef: MatDialogRef<ReviewsComponent>,
    private dialog: MatDialog,
    private reviewService: ReviewsService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.property = data.property;
  }

  ngOnInit(): void {
    this.loadReviews(); // Cargar reviews al inicializar el componente
  }

  // Método para cargar las reviews desde el servicio con paginado
  private loadReviews(): void {
    // Verifica si `this.property` es un objeto y tiene un `_id`
    if (this.property && this.property._id) {
      this.reviewService.getReviews(this.property._id, this.page, this.limit).subscribe(
        (reviewsData) => {
          this.reviews = reviewsData; // Asignar las reviews
          this.totalReviews = reviewsData.length; // Asignar el total de reviews
          this.totalPages = this.reviews.totalpages; // Asignar el total de páginas
          console.log('Reviews cargadas:', reviewsData);
        },
        (error) => {
          console.error('Error al cargar las reviews:', error);
        }
      );
    } else {
      console.error('No se encontró la propiedad.');
    }
  }

  // Método para cambiar de página
  changePage(page: number): void {
    this.page = page; // Cambiar la página actual
    this.loadReviews(); // Recargar las reviews para la nueva página
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  submitRating(): void {
    this.reviewService.addReview(this.property._id, this.userRating).subscribe(() => {
      this.dialogRef.close({ rating: this.userRating });
      this.loadReviews(); // Recargar las reviews después de añadir una nueva
    });
  }

  deleteReview(reviewID: string): void {
    const dialogRef = this.dialog.open(ConfirmationModalComponent, {
      width: '350px',
      data: { mensaje: `¿Estás seguro de que deseas eliminar la reseña?` }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.reviewService.deleteReview(reviewID).subscribe(
          () => {
           console.log(`Reseña con ID ${reviewID} eliminada`);
            this.loadReviews(); 
         },
         (error) => {
            console.error('Error al eliminar la reseña:', error);
         }
       );
     }
   });
  }

  resetForm(): void {
    this.newReview = {
      owner: '',
      property: '',
      rating: 0,
    };
    this.errorMessage = ''; // Limpiar el mensaje de error
  }
}
