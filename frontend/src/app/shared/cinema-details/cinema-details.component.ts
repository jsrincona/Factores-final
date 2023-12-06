import { Component } from "@angular/core";
import { Hall, proto_hall } from "@models/hall/hall.model";
import { Movie, proto_movie } from "@models/movies/movies.model";
import { Show, proto_show } from "@models/shows/show.model";
import { HallService } from "@services/halls/hall.service";
import { MovieService } from "@services/movies/movie.service";
import { ShowService } from "@services/show/show.service";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: "app-cinema-details",
  templateUrl: "./cinema-details.component.html",
  styleUrls: ["./cinema-details.component.scss"],
})
export class CinemaDetailsComponent {
  showDialog: boolean = false;

  shows!: Show[];
  show!: Show;
  selectedShows!: Show[] | null;
  submittedShow: boolean = false;
  statusesShow!: any[];

  movieDialog: boolean = false;
  
  movies!: Movie[];
  movie!: Movie;
  selectedMovies!: Movie[] | null;
  submittedMovie: boolean = false;
  statusesMovie!: any[];

  hallDialog: boolean = false;
  
  halls!: Hall[];
  hall!: Hall;
  selectedHalls!: Hall[] | null;
  submittedHall: boolean = false;
  statusesHall!: any[];

  constructor(
    private showService: ShowService,
    private movieService: MovieService,
    private hallService: HallService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.getShows();
    this.getMovies();
    this.getHalls();
  }

  getShows() {
    this.showService.getShows().subscribe((data) => (this.shows = data));
  }

  getMovies() {
    this.movieService.getMovies().subscribe((data) => (this.movies = data));
  }

  getHalls() {
    this.hallService.getHalls().subscribe((data) => (this.halls = data));
  }

  openNewShow() {
    this.show = proto_show;
    this.submittedShow = false;
    this.showDialog = true;
  }

  deleteSelectedShows() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected shows?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.shows = this.shows.filter(
          (val) => !this.selectedShows?.includes(val)
        );
        this.selectedShows = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Shows Deleted",
          life: 3000,
        });
      },
    });
  }

  editShow(show: Show) {
    this.show = { ...show };
    this.showDialog = true;
  }

  deleteShow(show: Show) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + show.pk_id + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.showService.deleteShow(show).subscribe(
          (show) => {
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Show Deleted",
              life: 3000,
            }); 
            this.getShows(); 
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Show not Delete",
              life: 3000,
            });
          }
        )
      },
    });
  }

  hideDialogShow() {
    this.showDialog = false;
    this.submittedShow = false;
  }

  saveShow() {
    this.submittedShow = true;

    if (this.show.pk_id) {
      if (this.show.pk_id) {
        this.showService.updateShow(this.show).subscribe(
          (show : Show) => {
           this.shows[this.findIndexByIdShow(show.pk_id)] = show;
           this.messageService.add({
             severity: "success",
             summary: "Successful",
             detail: "Show Updated",
             life: 3000,
           });
         },
         (error) =>{
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Show not Update",
            life: 3000,
          });
        } 
        )
      } else {
        this.showService.setShow(this.show).subscribe(
          (show: Show) => {
            this.shows.push(show);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Show Created",
              life: 3000,
            });
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Show not Created",
              life: 3000,
            });
          }
        )
      }

      this.shows = [...this.shows];
      this.showDialog = false;
      this.show = proto_show;
    }
  }

  findIndexByIdShow(id: number): number {
    let index = -1;
    for (let i = 0; i < this.shows.length; i++) {
      if (this.shows[i].pk_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  getSeverity(status: number) {
    if (status > 50) {
      return "success";
    } else {
      if (status >= 10 && status <= 50) {
        return "warning";
      } else {
        return "danger";
      }
    }
  }

  openNewMovie() {
    this.movie = proto_movie;
    this.submittedMovie = false;
    this.movieDialog = true;
  }

  deleteSelectedMovies() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected movies?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.movies = this.movies.filter(
          (val) => !this.selectedMovies?.includes(val)
        );
        this.selectedMovies = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Movies Deleted",
          life: 3000,
        });
      },
    });
  }

  editMovie(movie: Movie) {
    this.movie = { ...movie };
    this.movieDialog = true;
  }

  deleteMovie(movie: Movie) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + movie.t_title + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.movieService.deleteMovie(movie).subscribe(
          (movie)=>{
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Movie Deleted",
              life: 3000,
            });
            this.getMovies();
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Movie not Delete",
              life: 3000,
            });
          }
        )
      },
    });
  }

  hideDialogMovie() {
    this.movieDialog = false;
    this.submittedMovie = false;
  }

  saveMovie() {
    this.submittedMovie = true;

    if (this.movie.t_title?.trim()) {
      if (this.movie.pk_id) {
        this.movieService.updateMovie(this.movie).subscribe(
          (movie : Movie) => {
            this.movies[this.findIndexByIdMovie(movie.pk_id)] = movie;
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Movie Updated",
              life: 3000,
            });

          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Movie not Update",
              life: 3000,
            });
          }
        )
      }
      
      else {
        this.movieService.setMovie(this.movie).subscribe(
          (movie : Movie) => {
            this.movies.push(movie);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Movie Created",
              life: 3000,
            });
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Movie not Created",
              life: 3000,
            });
          }
        )
      }

      this.movies = [...this.movies];
      this.movieDialog = false;
      this.movie = proto_movie;
    }
  }

  findIndexByIdMovie(id: number): number {
    let index = -1;
    for (let i = 0; i < this.movies.length; i++) {
      if (this.movies[i].pk_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }


  openNewHall() {
    this.hall = proto_hall;
    this.submittedHall = false;
    this.hallDialog = true;
  }

  deleteSelectedHalls() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected halls?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.halls = this.halls.filter(
          (val) => !this.selectedHalls?.includes(val)
        );
        this.selectedHalls = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Halls Deleted",
          life: 3000,
        });
      },
    });
  }

  editHall(hall: Hall) {
    this.hall = { ...hall };
    this.hallDialog = true;
  }

  deleteHall(hall: Hall) {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete " + hall.pk_id + "?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.hallService.deleteHall(hall).subscribe(
          (hall) => {
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Hall Deleted",
              life: 3000,
            }); 
            this.getHalls(); 
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Hall not Delete",
              life: 3000,
            });
          }
        )
      },
    });
  }

  hideDialogHall() {
    this.hallDialog = false;
    this.submittedHall = false;
  }

  saveHall() {
    this.submittedHall = true;

    if (this.hall.pk_id) {
      if (this.hall.pk_id) {
        this.hallService.updateHall(this.hall).subscribe(
          (hall : Hall) => {
           this.halls[this.findIndexByIdHall(hall.pk_id)] = hall;
           this.messageService.add({
             severity: "success",
             summary: "Successful",
             detail: "Hall Updated",
             life: 3000,
           });
         },
         (error) =>{
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Hall not Update",
            life: 3000,
          });
        } 
        )
      } else {
        this.hallService.setHall(this.hall).subscribe(
          (hall: Hall) => {
            this.halls.push(hall);
            this.messageService.add({
              severity: "success",
              summary: "Successful",
              detail: "Hall Created",
              life: 3000,
            });
          },
          (error) =>{
            this.messageService.add({
              severity: "error",
              summary: "Error",
              detail: "Hall not Created",
              life: 3000,
            });
          }
        )
      }

      this.halls = [...this.halls];
      this.hallDialog = false;
      this.hall = proto_hall;
    }
  }

  findIndexByIdHall(id: number): number {
    let index = -1;
    for (let i = 0; i < this.halls.length; i++) {
      if (this.halls[i].pk_id === id) {
        index = i;
        break;
      }
    }

    return index;
  }
}
