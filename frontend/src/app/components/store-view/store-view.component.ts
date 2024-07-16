import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';
import { Product } from '../../models/product.model';
import { switchMap } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-store-view',
  templateUrl: './store-view.component.html',
  styleUrls: ['./store-view.component.css'],
})
export class StoreViewComponent implements OnInit {
  logo: string = 'assets/logo.png';
  sidebarVisible: boolean = false;
  updateMessage: string = '';
  isNew: boolean = false;
  isNotNew: boolean = false;
  product: Product = { name: '' };
  layout: string = 'grid';
  store!: Store;
  products: Product[] = [];
  id!: string;
  visible: boolean = false;
  loading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeService: StoreService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.storeService
      .getStores()
      .pipe(
        switchMap((data) => {
          this.store = data.find((s) => '' + s.id === this.id)!;
          return this.storeService.getProductsByStore(this.store);
        })
      )
      .subscribe(
        (data) => {
          this.products = data;
          this.loading = false;
        },
        (error) => {
          console.error('Errore durante le chiamate API', error);
          this.loading = false;
        }
      );
  }

  editProduct(product: Product) {
    this.storeService.updateProduct(product).subscribe({
      next: (updatedStore) => {
        const index = this.products.findIndex((s) => s.id === updatedStore.id);
        if (index !== -1) {
          this.products[index] = updatedStore;
        }
        this.updateMessage = 'Aggiornamento riuscito!';
        this.messageService.add({
          severity: 'info',
          summary: this.updateMessage,
          life: 3000,
        });
      },
      error: (err) => {
        this.updateMessage = "Errore durante l'aggiornamento: " + err.message;
        this.messageService.add({
          severity: 'error',
          summary: this.updateMessage,
          life: 3000,
        });
      },
    });
    this.closeEditProduct();
  }

  newProduct() {
    this.product.store_id = this.store.id;
    this.storeService.newProduct(this.product).subscribe({
      next: () => {
        this.updateMessage = 'Creazione riuscita!';
        this.ngOnInit();
        this.messageService.add({
          severity: 'info',
          summary: this.updateMessage,
          life: 3000,
        });
      },
      error: (err) => {
        this.updateMessage = 'Errore durante la creazione: ' + err.message;
        this.messageService.add({
          severity: 'error',
          summary: this.updateMessage,
          life: 3000,
        });
      },
    });
    this.closeEditProduct();
  }

  deleteProduct(product: Product) {
    this.storeService.deleteProduct(product).subscribe({
      next: () => {
        this.updateMessage = 'Cancellazione riuscita!';
        this.ngOnInit();
        this.messageService.add({
          severity: 'info',
          summary: this.updateMessage,
          life: 3000,
        });
      },
      error: (err) => {
        this.updateMessage = 'Errore durante la cancellazione: ' + err.message;
        this.messageService.add({
          severity: 'error',
          summary: this.updateMessage,
          life: 3000,
        });
      },
    });
  }

  confirm(product: Product, event: Event) {
    this.confirmationService.confirm({
      message: 'Sicuro di voler cancellare il prodotto?',
      target: event.target as EventTarget,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteProduct(product);
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Operazione annullata"',
          life: 3000,
        });
      },
    });
  }

  showNewProduct() {
    this.product = {};
    this.sidebarVisible = true;
    this.isNew = true;
  }

  showEditProduct(product: Product) {
    this.sidebarVisible = true;
    this.isNotNew = true;
    this.product = product;
  }

  closeEditProduct() {
    this.sidebarVisible = false;
    this.isNotNew = false;
    this.isNew = false;
  }
  showDialog(product: Product) {
    this.product = product;
    this.visible = true;
  }
  goToStorePage() {
    this.router.navigate(['']);
  }
}
