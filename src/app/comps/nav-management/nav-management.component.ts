import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface Student {
  name: string;
  selected: boolean;
}
@Component({
  selector: 'app-nav-management',
  standalone: false,
  templateUrl: './nav-management.component.html',
  styleUrl: './nav-management.component.css'
})
export class NavManagementComponent implements AfterViewInit {
  
  toggleChange(index: number, event: MatSlideToggleChange) {
    this.allItems[index].toggleState = event.checked;
  }
  
  toggleSelection(element: Student) {
    element.selected = !element.selected;
  }
 
  
  pageSize = 2;
  pageIndex = 0;
  paginatedItems: any[] = [];

  // List of all expansion panels
    allItems = [
    {
      title: 'HDFC Mutual Fund', toggleState: false, students: [
        { name: 'HDFC Equity Savings Fund - GROWTH PLAN', selected: false },
        { name: 'HDFC Balanced Advantage Fund - IDCW Plan - Direct Plan ', selected: false },
        { name: 'HDFC Liquid Fund - IDCW Daily - Direct Plan', selected: false },
        { name: 'HDFC FMP 1224D DECEMBER 2018 (1) - Growth Option - Direct Plan', selected: false },
        { name: 'HDFC FMP 1269D March 2023 - Quarterly IDCW Option', selected: false },
        { name: 'HDFC NIFTY SDL Plus G-Sec Jun 2027 40:60 Index Fund - Growth Option - Direct Plan', selected: false },
        { name: 'HDFC Equity Savings Fund - GROWTH PLAN', selected: false },
        { name: 'HDFC Balanced Advantage Fund - IDCW Plan - Direct Plan ', selected: false },
        { name: 'HDFC Liquid Fund - IDCW Daily - Direct Plan', selected: false },
        { name: 'HDFC FMP 1224D DECEMBER 2018 (1) - Growth Option - Direct Plan', selected: false },
        { name: 'HDFC FMP 1269D March 2023 - Quarterly IDCW Option', selected: false },
        { name: 'HDFC NIFTY SDL Plus G-Sec Jun 2027 40:60 Index Fund - Growth Option - Direct Plan', selected: false }
      ],
    },
    {
      title: 'Aditya Birla Sun Life Mutual Fund', toggleState: true, students: [
        { name: 'Aditya Birla Sun Life Regular Savings Fund - Growth / Payment - Regular Plan', selected: true },
        { name: 'Aditya Birla Sun Life International Equity Fund - Plan B - Direct - IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Nifty SDL Apr 2027 Index Fund-Direct Growth', selected: true },
        { name: 'Aditya Birla Sun Life Retirement Fund-The 40s Plan- Direct - Payout of IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth', selected: true },
        { name: 'Aditya Birla Sun Life Equity Advantage Fund - Growth - Direct Plan', selected: true },
        { name: 'Aditya Birla Sun Life Regular Savings Fund - Growth / Payment - Regular Plan', selected: true },
        { name: 'Aditya Birla Sun Life International Equity Fund - Plan B - Direct - IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Nifty SDL Apr 2027 Index Fund-Direct Growth', selected: true },
        { name: 'Aditya Birla Sun Life Retirement Fund-The 40s Plan- Direct - Payout of IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth', selected: true },
        { name: 'Aditya Birla Sun Life Equity Advantage Fund - Growth - Direct Plan', selected: true }
      ],
    },
    {
      title: 'Franklin Templeton Mutual Fund', toggleState: true, students: [
        { name: 'Franklin India Pension Plan-Growth', selected: false },
        { name: 'Franklin India Short-Term Income Plan-Growth', selected: true },
        { name: 'Franklin India Overnight Fund - Daily Dividend Plan - Daily - IDCW', selected: false },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan D 1238 days - IDCW ', selected: true },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan A 1273 days - IDCW ', selected: false },
        { name: 'Franklin India Short term Income Plan- Institutional Plan- Segregated Portfolio 2- 10.90% Vodafone Idea Ltd 02Sep2023-Growth Option', selected: true },
        { name: 'Franklin India Pension Plan-Growth', selected: false },
        { name: 'Franklin India Short-Term Income Plan-Growth', selected: true },
        { name: 'Franklin India Overnight Fund - Daily Dividend Plan - Daily - IDCW', selected: false },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan D 1238 days - IDCW ', selected: true },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan A 1273 days - IDCW ', selected: false },
        { name: 'Franklin India Short term Income Plan- Institutional Plan- Segregated Portfolio 2- 10.90% Vodafone Idea Ltd 02Sep2023-Growth Option', selected: true }
      ],
    },
    {
      title: 'HDFC Mutual Fund', toggleState: false, students: [
        { name: 'HDFC Equity Savings Fund - GROWTH PLAN', selected: false },
        { name: 'HDFC Balanced Advantage Fund - IDCW Plan - Direct Plan ', selected: false },
        { name: 'HDFC Liquid Fund - IDCW Daily - Direct Plan', selected: false },
        { name: 'HDFC FMP 1224D DECEMBER 2018 (1) - Growth Option - Direct Plan', selected: false },
        { name: 'HDFC FMP 1269D March 2023 - Quarterly IDCW Option', selected: false },
        { name: 'HDFC NIFTY SDL Plus G-Sec Jun 2027 40:60 Index Fund - Growth Option - Direct Plan', selected: false },
        { name: 'HDFC Equity Savings Fund - GROWTH PLAN', selected: false },
        { name: 'HDFC Balanced Advantage Fund - IDCW Plan - Direct Plan ', selected: false },
        { name: 'HDFC Liquid Fund - IDCW Daily - Direct Plan', selected: false },
        { name: 'HDFC FMP 1224D DECEMBER 2018 (1) - Growth Option - Direct Plan', selected: false },
        { name: 'HDFC FMP 1269D March 2023 - Quarterly IDCW Option', selected: false },
        { name: 'HDFC NIFTY SDL Plus G-Sec Jun 2027 40:60 Index Fund - Growth Option - Direct Plan', selected: false }
      ],
    },
    {
      title: 'Aditya Birla Sun Life Mutual Fund', toggleState: true, students: [
        { name: 'Aditya Birla Sun Life Regular Savings Fund - Growth / Payment - Regular Plan', selected: true },
        { name: 'Aditya Birla Sun Life International Equity Fund - Plan B - Direct - IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Nifty SDL Apr 2027 Index Fund-Direct Growth', selected: true },
        { name: 'Aditya Birla Sun Life Retirement Fund-The 40s Plan- Direct - Payout of IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth', selected: true },
        { name: 'Aditya Birla Sun Life Equity Advantage Fund - Growth - Direct Plan', selected: true },
        { name: 'Aditya Birla Sun Life Regular Savings Fund - Growth / Payment - Regular Plan', selected: true },
        { name: 'Aditya Birla Sun Life International Equity Fund - Plan B - Direct - IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Nifty SDL Apr 2027 Index Fund-Direct Growth', selected: true },
        { name: 'Aditya Birla Sun Life Retirement Fund-The 40s Plan- Direct - Payout of IDCW', selected: true },
        { name: 'Aditya Birla Sun Life Banking and Financial Services Fund - Direct Plan - Growth', selected: true },
        { name: 'Aditya Birla Sun Life Equity Advantage Fund - Growth - Direct Plan', selected: true }
      ],
    },
    {
      title: 'Franklin Templeton Mutual Fund', toggleState: true, students: [
        { name: 'Franklin India Pension Plan-Growth', selected: false },
        { name: 'Franklin India Short-Term Income Plan-Growth', selected: true },
        { name: 'Franklin India Overnight Fund - Daily Dividend Plan - Daily - IDCW', selected: false },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan D 1238 days - IDCW ', selected: true },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan A 1273 days - IDCW ', selected: false },
        { name: 'Franklin India Short term Income Plan- Institutional Plan- Segregated Portfolio 2- 10.90% Vodafone Idea Ltd 02Sep2023-Growth Option', selected: true },
        { name: 'Franklin India Pension Plan-Growth', selected: false },
        { name: 'Franklin India Short-Term Income Plan-Growth', selected: true },
        { name: 'Franklin India Overnight Fund - Daily Dividend Plan - Daily - IDCW', selected: false },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan D 1238 days - IDCW ', selected: true },
        { name: 'Franklin India Fixed Maturity Plans-Series 5 - Plan A 1273 days - IDCW ', selected: false },
        { name: 'Franklin India Short term Income Plan- Institutional Plan- Segregated Portfolio 2- 10.90% Vodafone Idea Ltd 02Sep2023-Growth Option', selected: true }
      ],
    }

  ];

  displayedColumns: string[] = ['id', 'name', 'status'];
  dataSources: { [key: string]: MatTableDataSource<Student> } = {};

  constructor() {
    this.allItems.forEach(item => {
      this.dataSources[item.title] = new MatTableDataSource(item.students);
    });
    this.updatePaginatedItems();
  }

  ngAfterViewInit() {}
  onAccordionPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePaginatedItems();
  }

  updatePaginatedItems() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.allItems.slice(startIndex, endIndex);
  }

  // Assign paginator to each table
  assignPaginator(paginator: MatPaginator, panelTitle: string) {
    this.dataSources[panelTitle].paginator = paginator;
  }
  applyFilter(event: Event, title: string) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSources[title].filter = filterValue;
  }

}