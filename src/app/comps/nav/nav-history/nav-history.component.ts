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
   ELEMENT_DATA: SchemeHistory[] = [
    // {
    //   schemeDate: '2024-11-11',
    //   rate: 101.93,
    // },
    // {
    //   schemeDate: '2025-02-25',
    //   rate: 102.16,
    // },
    // {
    //   schemeDate: '2024-11-11',
    //   rate: 101.93,
    // },
    // {
    //   schemeDate: '2025-02-25',
    //   rate: 102.16,
    // },
    // {
    //   schemeDate: '2024-11-11',
    //   rate: 101.93,
    // },
    // {
    //   schemeDate: '2025-02-25',
    //   rate: 102.16,
    // },
  ];
  constructor(private navService: NavService) {}
  @ViewChild('fundSelect') fundSelect!: MatSelect;
  @ViewChild('schemeSelect') schemeSelect!: MatSelect;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['serial', 'Date', 'Rate'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  ngOnInit(): void {
    this.navService.getFunds().subscribe((data: Fund[]) => {
      this.funds = data;
      this.options1 = data;
      this.filteredFunds = [...this.funds];
      this.filteredOptions1 = [...this.options1];
    });
  }

  ngAfterViewInit() {
    // setTimeout(() => {
    //   this.stateSelect.open(); // Automatically open dropdown
    // }, 500); // Add a slight delay to ensure rendering is complete
    this.dataSource.paginator = this.paginator;
  }

  getSerialNumber(index: number): number {
    const pageIndex = this.paginator?.pageIndex ?? 0; // Use optional chaining to avoid errors
    const pageSize = this.paginator?.pageSize ?? 5; // Provide a default value for page size
    return pageIndex * pageSize + index + 1;
  }

  searchQuery = '';
  isDropdownOpen = false;
  isSchemeDropdownOpen = false;
  funds: Fund[] = [];
  filteredFunds: Fund[] = [];
  filteredOptions1: Fund[] = [];
  filteredOptions2: Scheme[] = [];
  fundName: string | undefined;
  schemeName: string | undefined;
  openDropdown() {
    this.isDropdownOpen = true;
    if (this.filteredFunds.length == 0) {
      this.isDropdownOpen = false;
    }
  }

  closeDropdown() {
    setTimeout(() => (this.isDropdownOpen = false), 200);
  }

  filterFunds() {
    this.isDropdownOpen = true;
    this.filteredFunds = this.funds.filter((fund) =>
      fund.fundName.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    if (this.filteredFunds.length == 0) {
      this.isDropdownOpen = false;
    }
  }

  selectedFund(fund: Fund) {
    this.searchQuery = fund.fundName;
    alert(fund.fundId);
    this.isDropdownOpen = false;
  }

  resetSearch() {
    this.searchQuery = '';
    this.filteredFunds = [...this.funds];
    this.isDropdownOpen = true;
  }

  searchForm = new FormGroup({
    fundDropdown: new FormControl(),
    Schemedropdown: new FormControl(''),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
  });

  options1: Fund[] = [];
  options2: Scheme[] = [];

  filterDropdown1(event: Event) {
    this.fundSelect.open();
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredOptions1 = this.options1.filter((option) =>
      option.fundName.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  filterDropdown2(event: Event) {
    this.schemeSelect.open();
    const inputValue = (event.target as HTMLInputElement).value;
    this.filteredOptions2 = this.options2.filter((option) =>
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
      .getIndividualNav(fundId, schemeId!, formattedStartDate, formattedEndDate)
      .subscribe((response: IndividualNav) => {
        this.fundName = response.fundName;
        this.schemeName = response.schemeName;
       //this.ELEMENT_DATA = response.schemeHistory
       console.log(response.schemeHistory);
       
       this.ELEMENT_DATA = response.schemeHistory
       this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      });
      console.log(this.ELEMENT_DATA);
    console.log(this.searchForm.value);
  }

  onFundChange(selectedFundId: string) {
    this.navService.getScheme(selectedFundId).subscribe((data: Scheme[]) => {
      this.options2 = data;
      this.filteredOptions2 = [...this.options2];
    });
    this.isSchemeDropdownOpen = true;
  }
}
