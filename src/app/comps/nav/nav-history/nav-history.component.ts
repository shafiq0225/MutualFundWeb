import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NavService } from '../service/nav-service';
import { Fund } from '../models/Fund';
import { FormControl, FormGroup } from '@angular/forms';
import { Scheme } from '../models/Scheme';
import { MatSelect } from '@angular/material/select';
import { IndividualNav } from '../models/IndividualNav';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { SchemeHistory } from '../models/SchemeHistory';

@Component({
  selector: 'app-nav-history',
  standalone: false,
  templateUrl: './nav-history.component.html',
  styleUrl: './nav-history.component.css',
})
export class NavHistoryComponent implements OnInit, AfterViewInit {
  filteredFunds: Fund[] = [];
  filteredSchemes: Scheme[] = [];
  fundName: string | undefined;
  schemeName: string | undefined;
  ELEMENT_DATA: SchemeHistory[] = [];

  constructor(private navService: NavService) { }

  @ViewChild('fundSelect') fundSelect!: MatSelect;
  @ViewChild('schemeSelect') schemeSelect!: MatSelect;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['serial', 'Date', 'Rate'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.navService.getFunds().subscribe((data: Fund[]) => {
      this.fundOptions = data;
      this.filteredFunds = [...this.fundOptions];
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getSerialNumber(index: number): number {
    const pageIndex = this.paginator?.pageIndex ?? 0; // Use optional chaining to avoid errors
    const pageSize = this.paginator?.pageSize ?? 5; // Provide a default value for page size
    return pageIndex * pageSize + index + 1;
  }

  searchForm = new FormGroup({
    fundDropdown: new FormControl(),
    Schemedropdown: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  fundOptions: Fund[] = [];
  schemeOptions: Scheme[] = [];

  fundDropdown(event: Event) {
    this.fundSelect.open();
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredFunds = this.fundOptions.filter((option) =>
      option.fundName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  schemeDropdown(event: Event) {
    this.schemeSelect.open();
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredSchemes = this.schemeOptions.filter((option) =>
      option.schemeName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString().split('T')[0]; // Outputs YYYY-MM-DD
  }

  onSubmit() {
    const startDate = new Date(this.searchForm.value.startDate!);
    const endDate = new Date(this.searchForm.value.endDate!);

    const formattedStartDate = this.formatDate(new Date(startDate));
    const formattedEndDate = this.formatDate(new Date(endDate));

    const fundId = this.searchForm.value.fundDropdown;
    const schemeId = this.searchForm.value.Schemedropdown;

    this.navService
      .getIndividualNav(fundId, schemeId!, formattedStartDate, formattedEndDate).subscribe((response: IndividualNav) => {
        this.fundName = response.fundName;
        this.schemeName = response.schemeName;
        this.ELEMENT_DATA = response.schemeHistory;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      });
  }

  onFundChange(selectedFundId: string) {
    this.navService.getScheme(selectedFundId).subscribe((data: Scheme[]) => {
      this.schemeOptions = data;
      this.filteredSchemes = [...this.schemeOptions];
    });
  }
}
