import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../services/store.service';
import { Store } from '../../models/store.model';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css'],
})
export class StoreListComponent implements OnInit {
  logo: string = 'assets/logo.png';
  hidden: boolean = false;
  isNew: boolean = false;
  isNotNew: boolean = false;
  updateMessage: string = '';
  store: Store = {};
  sidebarVisible: boolean = false;
  stores!: Store[];

  constructor(
    private storeService: StoreService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.storeService.getStores().subscribe(
      (data) => {
        this.stores = data;
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
      }
    );
  }

  showEditStore(store: Store) {
    this.sidebarVisible = true;
    this.isNotNew = true;
    this.store = store;
  }

  showNewStore() {
    this.store = {};
    this.sidebarVisible = true;
    this.isNew = true;
  }

  filterStore(event: Event) {
    let searchTerm = (event.target as HTMLInputElement).value;
    searchTerm = searchTerm.toLowerCase();
    this.storeService.getStores().subscribe(
      (data) => {
        this.stores = data.filter(
          (store) =>
            store.name!.toLowerCase().includes(searchTerm) ||
            store.address!.toLowerCase().includes(searchTerm) ||
            store.phoneNumber!.toLowerCase().includes(searchTerm)
        );
        this.stores.length === 0 ? (this.hidden = true) : (this.hidden = false);
      },
      (error) => {
        console.error('Errore durante il recupero dei dati', error);
      }
    );
  }

  editStore(store: Store) {
    this.storeService.updateStore(store).subscribe({
      next: (updatedStore) => {
        const index = this.stores.findIndex((s) => s.id === updatedStore.id);
        if (index !== -1) {
          this.stores[index] = updatedStore;
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
    this.closeEditStore();
  }

  newStore() {
    this.storeService.newStore(this.store).subscribe({
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
    this.closeEditStore();
  }

  deleteStore(store: Store) {
    this.storeService.deleteStore(store).subscribe({
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

  confirm(store: Store, event: Event) {
    this.confirmationService.confirm({
      message:
        'Sicuro di voler rimuovere il negozio? Verranno rimossi TUTTI i prodotti correllati.',
      target: event.target as EventTarget,
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.deleteStore(store);
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

  viewStore(store: Store) {
    this.router.navigate(['/store-view', store.id]);
  }

  closeEditStore() {
    this.sidebarVisible = false;
    this.isNotNew = false;
    this.isNew = false;
  }
}
