import React, { useState } from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, Edit, Filter, GridComponent, Group, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { DateRangePickerComponent, Inject } from '@syncfusion/ej2-react-calendars';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataManager, Query } from '@syncfusion/ej2-data';
import moment from 'moment';

import { Header } from '../components';

const InventoryHistory = () => {
  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);

  const fetchDataInventoryHistory = useQuery({
    queryKey: ['inventoryHistory'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/inventory_histories`);
    },
  });

  if (!fetchDataInventoryHistory.isLoading) {
    const dataInventoryHistory = fetchDataInventoryHistory.data.data.data;

    const formattedDate = (date) => {
      const newDate = new Date(date);
      
      const day = String(newDate.getDate()).padStart(2, '0');
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const year = newDate.getFullYear();
      
      return `${year}-${month}-${day}`;
    };

    const inventoryHistoryDataFiltered = dataInventoryHistory.filter((item) => moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(selectedDate[0])) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(selectedDate[1])));

    const inventoryHistoryData = new DataManager(inventoryHistoryDataFiltered);

    const inventoryHistoryGrid = [
      { type: 'checkbox', width: '50' },
      {
        field: 'id',
        headerText: 'ID',
        width: '100',
        textAlign: 'Center',
        isPrimaryKey: true,
        visible: false
      },
      {
        field: 'createdAt',
        headerText: 'Date Time',
        width: '100',
        textAlign: 'Center',
        type: 'datetime',
        format: 'dd MMM yyyy HH:mm',
        allowEditing: false
      },
      {
        field: 'inventory.name',
        headerText: 'Name',
        width: '200',
        textAlign: 'Center',
        allowEditing: false
      },
      {
        field: 'change_type',
        headerText: 'Change Type',
        width: '100',
        textAlign: 'Center',
        editType: 'dropdownedit',
        edit: {
          params: {
            dataSource: new DataManager([
              { change_type: 'in' },
              { change_type: 'out' }
            ]),
            fields: { text: 'change_type', value: 'change_type' },
            query: new Query()
          }
        },
      },
      {
        field: 'quantity',
        headerText: 'Quantity',
        width: '100',
        textAlign: 'Center',
        editType: 'numericedit',
        format: 'N'
      },
      {
        field: 'note',
        headerText: 'Note',
        width: '200',
        textAlign: 'Center',
        editType: 'textareaedit'
      },
    ];

    return (
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='Page' title='Inventory History' />
          <div className='flex justify-end w-full sm:w-auto'>
            <div className='md:w-1/6 w-auto'>
              <DateRangePickerComponent
                placeholder={new Date().toLocaleDateString()}
                max={new Date()}
                format='dd/MM/yyyy'
                onChange={(e) => e.value ? setSelectedDate(e.value) : setSelectedDate([new Date(), new Date()])}
              />
            </div>
          </div>
        <GridComponent
          id='gridcomp'
          dataSource={inventoryHistoryData}
          allowPaging
          allowSorting
          allowFiltering
          allowReordering
          showColumnMenu
          allowTextWrap
          enableStickyHeader
          toolbar={['Search', 'Edit', 'Delete']}
          editSettings={{
            allowDeleting: true,
            allowEditing: true,
            mode: 'Dialog'
          }}
          filterSettings={{ type: 'Menu' }}
          width='auto'
          pageSettings={{
            pageCount: 4,
            pageSizes: true
          }}
          sortSettings={{
            columns: [{
              field: 'createdAt',
              direction: 'Descending'
            }]
          }}
        >
          <ColumnsDirective>
            {inventoryHistoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Sort, Filter, Page, Edit, Selection, Search, Toolbar, Reorder, Group, ColumnMenu, Resize]} />
        </GridComponent>
      </div>
    )
  }
};

export default InventoryHistory;
