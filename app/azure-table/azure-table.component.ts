import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AzureTableService } from '../shared/azure-table.service';

class TableConfiguration {
    public tableName:string;
}

@Component({
  selector: 'azure-table',
  styleUrls: ['./azure-table.component.css'],
  templateUrl: './azure-table.component.html'
})
export class AzureTableComponent {
    
    private tables:Observable<any>;
    private tableConfiguration:TableConfiguration;

    constructor(private azuretable:AzureTableService) {
        this.tableConfiguration = new TableConfiguration();
    }

    ngOnInit() {
        this.azuretable.getTables()
            .subscribe(response => {
                this.tables = response;
            });
    }

    public createTable() {
        this.azuretable.createTable(this.tableConfiguration.tableName);
    }

}
