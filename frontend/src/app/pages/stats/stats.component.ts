import { Component, OnInit } from '@angular/core';
import { StatsService } from '@services/stats/stats.service';
import { PurchaseStatistics } from '@models/stats/stats.model';
import { ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  constructor(private statsService:StatsService, private router: Router) {}
  
  purchaseStatistics: PurchaseStatistics;
  productCountData: ChartData;
  productCountOptions: ChartOptions;
  movieFunctionData: ChartData;
  movieFunctionOptions: ChartOptions;
  clientPurchaseData: ChartData;
  clientPurchaseOptions: ChartOptions;


  ngOnInit(): void {
    this.getStats();    
  }

  goToPDF(){
    window.open(environment.api+'stats/report/', '_blank');
  }

  getStats(){
    this.statsService.getStats().subscribe(
      (data:PurchaseStatistics)=>{
        this.purchaseStatistics = data;
        // Configuración de los gráficos de Producto - Cantidad
        this.productCountData = {
          labels: this.purchaseStatistics.purchase_product_count.map((item) => item.pk_id.toString()),
          datasets: [
            {
              label: 'Cantidad',
              data: this.purchaseStatistics.purchase_product_count.map((item) => item.product_count),
              backgroundColor: 'rgba(0, 123, 255, 0.5)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1,
            },
          ],
        };
        this.productCountOptions = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
    
        // Configuración de los gráficos de Función por Película
        this.movieFunctionData = {
          labels: this.purchaseStatistics.function_count_per_movie.map((item) => item.fk_movie.toString()),
          datasets: [
            {
              label: 'Funciones',
              data: this.purchaseStatistics.function_count_per_movie.map((item) => item.function_count),
              backgroundColor: 'rgba(255, 193, 7, 0.5)',
              borderColor: 'rgba(255, 193, 7, 1)',
              borderWidth: 1,
            },
          ],
        };
        this.movieFunctionOptions = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
    
        // Configuración de los gráficos de Compras por Cliente
        this.clientPurchaseData = {
          labels: this.purchaseStatistics.purchase_count_per_client.map((item) => item.fk_client.toString()),
          datasets: [
            {
              label: 'Compras',
              data: this.purchaseStatistics.purchase_count_per_client.map((item) => item.purchase_count),
              backgroundColor: 'rgba(76, 175, 80, 0.5)',
              borderColor: 'rgba(76, 175, 80, 1)',
              borderWidth: 1,
            },
          ],
        };
        this.clientPurchaseOptions = {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        };
      }
    )
  }
}
