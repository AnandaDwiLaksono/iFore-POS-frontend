import React, { useState } from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, DetailRow, Edit, Filter, GridComponent, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { Header } from '../components';
import { API_URL } from '../config/apiConfig';

const TransactionHistory = () => {
  const [paymentType, setPaymentType] = useState([]);

  const fetchDataTransaction = useQuery({
    queryKey: ['transaction'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/transaction_histories`);
    },
  });

  useQuery({
    queryKey: ['paymentType'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/payment_types`);
    },
    onSuccess: (data) => {
      setPaymentType(data.data.data);
    },
  });

  const editTransaction = useMutation({
    mutationFn: (data) => {
      return axios.put(`${API_URL}/api/transaction_histories/${data.id}`, data);
    }
  });

  const deleteTransaction = useMutation({
    mutationFn: (id) => {
      return axios.delete(`${API_URL}/api/transaction_histories/${id}`)
    }
  })

  const handleEditTransaction = (data) => {
    const dataPayload = {
      id: data.id,
      payment_type: data.payment_type.name,
      status: data.status,
      note: data.note,
      total_discount: data.total_discount,
      subtotal: data.subtotal,
      total: data.total - data.total_discount,
      total_profit: data.total_profit - data.total_discount,
    };

    editTransaction.mutate(dataPayload);
  }

  if (!fetchDataTransaction.isLoading) {
    const transactionData = new DataManager(fetchDataTransaction.data.data.data);

    const gridName = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.inventory.name}</p>
          </div>
        ))}
      </div>
    );
    
    const gridCategory = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.inventory.category.name}</p>
          </div>
        ))}
      </div>
    );
    
    const gridPrice = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.inventory.selling_price}</p>
          </div>
        ))}
      </div>
    );
    
    const gridQuantity = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.qty}</p>
          </div>
        ))}
      </div>
    );
    
    const gridDiscount = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.discount}</p>
          </div>
        ))}
      </div>
    );
    
    const gridTotal = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.total - item.discount}</p>
          </div>
        ))}
      </div>
    );

    const gridOrderItems = (props) => (
      <div>
        {props.order_items.map((item, index) => (
          <div key={index}>
            <p>{item.qty}x {item.inventory.name}</p>
          </div>
        ))}
      </div>
    );

    const transactionGrid = [
      { type: 'checkbox', width: '50' },
      {
        field: 'id',
        headerText: 'Transaction ID',
        width: '100',
        textAlign: 'Center',
        isPrimaryKey: true,
        visible: false
      },
      {
        field: 'createdAt',
        headerText: 'Order Date Time',
        width: '100',
        textAlign: 'Center',
        type: 'datetime',
        format: 'dd MMM yyyy HH:mm',
        allowEditing: false
      },
      { 
        headerText: 'Order Items',
        template: gridOrderItems,
        width: '200',
        textAlign: 'Center',
        allowEditing: false
      },
      {
        field: 'payment_type.name',
        headerText: 'Payment Type',
        textAlign: 'Center',
        editType: 'dropdownedit',
        width: '100',
        edit: {
          params: {
            dataSource: new DataManager(paymentType),
            fields: { text: "name", value: "name" },
            query: new Query()
          }
        }
      },
      {
        field: 'status',
        headerText: 'Status',
        textAlign: 'Center',
        editType: 'dropdownedit',
        width: '100',
        edit: {
          params: {
            dataSource: [
              { status: 'pending' },
              { status: 'completed' },
              { status: 'canceled' }
            ],
            fields: { text: "status", value: "status" },
            query: new Query()
          }
        }
      },
      {
        headerText: 'Subtotal',
        field: 'subtotal',
        textAlign: 'Center',
        width: '100',
        format: 'N2', // Bug: The dot comma format
        visible: false,
        allowEditing: false
      },
      {
        headerText: 'Total Discount',
        field: 'total_discount',
        textAlign: 'Center',
        width: '100',
        format: 'N2', // Bug: The dot comma format
        visible: false,
      },
      {
        headerText: 'Total',
        field: 'total',
        textAlign: 'Center',
        width: '100',
        format: 'N2', // Bug: The dot comma format
        allowEditing: false
      },
      {
        field: 'note',
        headerText: 'Note',
        width: '150',
        textAlign: 'Center',
        visible: false
      }
    ];

    const childGrid = {
      dataSource: transactionData,
      queryString: 'id',
      allowPaging: true,
      pageSettings: { pageSize: true, pageCount: 2 },
      columns: [
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
          headerText: 'Total', 
          width: 50, 
          textAlign: 'Center', 
          template: gridTotal,
        },
        {
          field: 'Discount',
          textAlign: 'Center',
          width: 50, 
          template: gridDiscount
        },
      ]
    };

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
          sortSettings={{
            columns: [{ 
              field: 'createdAt',
              direction: 'Descending' 
            }] 
          }}
          actionComplete={(args) => {
            if (args.requestType === 'save') {
              if (args.action === 'edit') {
                handleEditTransaction(args.data);
              }
            }

            if (args.requestType === 'delete') {
              args.data.forEach((item) => {
                deleteTransaction.mutate(item.id);
              });    
            }
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
