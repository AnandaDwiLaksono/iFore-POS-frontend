import React from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, DetailRow, Edit, Filter, GridComponent, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { DataManager } from '@syncfusion/ej2-data';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Header } from '../components';
import { API_URL } from '../config/apiConfig';

const gridOrderItems = (props) => (

  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>{item.Quantity}x {item.Name}</p>
      </div>
    ))}
  </div>
);

const gridItemID = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>{item.ItemID}</p>
      </div>
    ))}
  </div>
);

const gridName = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>{item.Name}</p>
      </div>
    ))}
  </div>
);

const gridCategory = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>{item.Category}</p>
      </div>
    ))}
  </div>
);

const gridPrice = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>Rp {item.Price}</p>
      </div>
    ))}
  </div>
);

const gridQuantity = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>{item.Quantity}</p>
      </div>
    ))}
  </div>
);

const gridDiscount = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>Rp {item.Discount}</p>
      </div>
    ))}
  </div>
);

const gridTotal = (props) => (
  <div>
    {props.OrderItems.map((item) => (
      <div key={item.ItemID}>
        <p>Rp {item.Total}</p>
      </div>
    ))}
  </div>
);

const transactionGrid = [
  { type: 'checkbox', width: '50' },
  {
    field: 'TransactionID',
    headerText: 'Transaction ID',
    width: '100',
    textAlign: 'Center',
    isPrimaryKey: true
  },
  {
    field: 'OrderDateTime',
    headerText: 'Order Date Time',
    width: '100',
    textAlign: 'Center',
    type: 'datetime',
    format: 'dd MMM yyyy HH:mm'
  },
  { 
    headerText: 'Order Items',
    template: gridOrderItems,
    width: '200',
    textAlign: 'Center'
  },
  {
    field: 'PaymentType',
    headerText: 'Payment Type',
    textAlign: 'Center',
    editType: 'dropdownedit',
    width: '100'
  },
  {
    field: 'Status',
    textAlign: 'Center',
    editType: 'dropdownedit',
    width: '100'
  },
  {
    headerText: 'Total Amount',
    field: 'TotalAmount',
    textAlign: 'Center',
    width: '100',
    format: 'N2' // Bug: The dot comma format
  },
  {
    headerText: 'Total Discount',
    field: 'TotalDiscount',
    textAlign: 'Center',
    width: '100',
    format: 'N2', // Bug: The dot comma format
    visible: false
  },
  {
    field: 'Note',
    headerText: 'Note',
    width: '150',
    textAlign: 'Center',
    visible: false
  }
];

const transactionData = [
  {
    TransactionID: 180323165900,
    OrderDateTime: '2023-03-18T16:59:00+07:00',
    OrderItems: [
      {
        ItemID: 123467,
        Name: 'A La Carte Cream Caramel Nic 6 60 ml',
        Category: 'Freebase',
        Price: 140000,
        Quantity: 1,
        Discount: 0,
        Total: 140000
      }
    ],
    PaymentType: 'BCA',
    Status: 'Complete',
    TotalDiscount: 0,
    TotalAmount: 140000,
    Note: '',
  },
  {
    TransactionID: 180323155400,
    OrderDateTime: '2023-03-18T15:54:00+07:00',
    OrderItems: [
      {
        ItemID: 123472,
        Name: 'Foom Bacco Series 30 ml',
        Category: 'Saltnic',
        Price: 110000,
        Quantity: 1,
        Discount: 0,
        Total: 110000
      },
      {
        ItemID: 123467,
        Name: 'A La Carte Cream Caramel Nic 6 60 ml',
        Category: 'Freebase',
        Price: 140000,
        Quantity: 1,
        Discount: 0,
        Total: 140000
      }
    ],
    PaymentType: 'BCA',
    Status: 'Complete',
    TotalDiscount: 0,
    TotalAmount: 110000,
    Note: '',
  },
  {
    TransactionID: 180323144300,
    OrderDateTime: '2023-03-18T14:43:00+07:00',
    OrderItems: [
      {
        ItemID: 123471,
        Name: 'Ketan Jinak 60 ml',
        Category: 'Freebase',
        Price: 110000,
        Quantity: 1,
        Discount: 0,
        Total: 110000
      }
    ],
    PaymentType: 'Cash',
    Status: 'Complete',
    TotalDiscount: 0,
    TotalAmount: 110000,
    Note: '',
  },
  {
    TransactionID: 180323134500,
    OrderDateTime: '2023-03-18T13:45:00+07:00',
    OrderItems: [
      {
        ItemID: 123470,
        Name: 'Catridge Dotpod',
        Category: 'Coil',
        Price: 50000,
        Quantity: 1,
        Discount: 0,
        Total: 50000
      }
    ],
    PaymentType: 'BCA',
    Status: 'Complete',
    TotalDiscount: 0,
    TotalAmount: 50000,
    Note: '',
  },
  {
    TransactionID: 130323134100,
    OrderDateTime: '2023-03-13T13:41:00+07:00',
    OrderItems: [
      {
        ItemID: 123473,
        Name: 'Secret Banana 60 ml',
        Category: 'Freebase',
        Price: 140000,
        Quantity: 1,
        Discount: 0,
        Total: 140000
      }
    ],
    PaymentType: 'Cash',
    Status: 'Complete',
    TotalDiscount: 0,
    TotalAmount: 140000,
    Note: '',
  }
];

const childGrid = {
  dataSource: transactionData,
  queryString: 'TransactionID',
  allowPaging: true,
  pageSettings: { pageSize: true, pageCount: 2 },
  columns: [
    { 
      headerText: 'Item ID', 
      textAlign: 'Center', 
      template: gridItemID,
      width: 50,
    },
    { 
      headerText: 'Name', 
      width: 150 , 
      textAlign: 'Center', 
      template: gridName,
    },
    { 
      headerText: 'Category', 
      width: 50, 
      textAlign: 'Center', 
      template: gridCategory,
    },
    { 
      headerText: 'Price', 
      width: 50, 
      textAlign: 'Center', 
      template: gridPrice
    },
    { 
      headerText: 'Quantity', 
      width: 50, 
      textAlign: 'Center', 
      template: gridQuantity,
    },
    {
      field: 'Discount',
      textAlign: 'Center',
      width: 50, 
      template: gridDiscount
    },
    { 
      headerText: 'Total', 
      width: 50, 
      textAlign: 'Center', 
      template: gridTotal,
    }
  ]
};

const TransactionHistory = () => {
  const fetchDataTransaction = useQuery({
    queryKey: ['transaction'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/transaction_histories`);
    },
  });

  if (!fetchDataTransaction.isLoading) {
    // const transactionData = new DataManager(fetchDataTransaction.data.data.data);
    console.log(fetchDataTransaction.data.data.data);

    return (
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='Page' title='Transaction History' />
        <GridComponent id='gridcomp'
          dataSource={transactionData}
          childGrid={childGrid}
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
        >
          <ColumnsDirective>
            {transactionGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject services={[Sort, Filter, Page, Edit, Selection, Search, Toolbar, Reorder, ColumnMenu, Resize, DetailRow]} />
        </GridComponent>
      </div>
    );
  }
};

export default TransactionHistory;
