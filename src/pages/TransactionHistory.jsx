import React, { useState } from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, DetailRow, Edit, Filter, GridComponent, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { DataManager, Query } from '@syncfusion/ej2-data';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

import { Header } from '../components';

const TransactionHistory = () => {
  const [paymentType, setPaymentType] = useState([]);
  const [selectedDate, setSelectedDate] = useState([new Date(), new Date()]);

  const fetchDataTransaction = useQuery({
    queryKey: ['transaction'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/transaction_histories`);
    },
  });

  useQuery({
    queryKey: ['paymentType'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/payment_types`);
    },
    onSuccess: (data) => {
      setPaymentType(data.data.data);
    },
  });

  const editTransaction = useMutation({
    mutationFn: (data) => {
      return axios.put(`${process.env.REACT_APP_API_URL}/api/transaction_histories/${data.id}`, data);
    }
  });

  const deleteTransaction = useMutation({
    mutationFn: (id) => {
      return axios.delete(`${process.env.REACT_APP_API_URL}/api/transaction_histories/${id}`);
    }
  });

  const deleteOrderItem = useMutation({
    mutationFn: (id) => {
      return axios.delete(`${process.env.REACT_APP_API_URL}/api/order_items/${id}`);
    }
  });

  const updateInventory = useMutation({
    mutationFn: (data) => {
      return axios.put(`${process.env.REACT_APP_API_URL}/api/inventories/${data.id}`, data);
    }
  });

  const handleEditTransaction = (data) => {
    console.log(data)
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

    if (data.status === 'canceled') {
      data.order_items.forEach((item) => {
        const inventory = {
          id: item.item_id,
          name: item.inventory.name,
          category_id: item.inventory.category_id,
          purchase_price: item.inventory.purchase_price,
          selling_price: item.inventory.selling_price,
          qty_stock: item.inventory.qty_stock + item.qty,
          note: item.inventory.note
        }

        updateInventory.mutate(inventory);
      });
    }

    editTransaction.mutate(dataPayload);

    toast.success('Transaction updated successfully');
  }

  const handleDeleteTransaction = (args) => {
    args.data.forEach((item) => {
      item.order_items.forEach((orderItem) => {
        const inventory = {
          id: orderItem.item_id,
          name: orderItem.inventory.name,
          category_id: orderItem.inventory.category_id,
          purchase_price: orderItem.inventory.purchase_price,
          selling_price: orderItem.inventory.selling_price,
          qty_stock: orderItem.inventory.qty_stock + orderItem.qty,
          note: orderItem.inventory.note
        }

        updateInventory.mutate(inventory);
        
        deleteOrderItem.mutate(orderItem.id);
      });

      deleteTransaction.mutate(item.id);
    });

    toast.success('Transaction deleted successfully');
  }

  if (!fetchDataTransaction.isLoading) {
    const dataTransaction = fetchDataTransaction.data.data.data;
    
    const formattedDate = (date) => {
      const newDate = new Date(date);
      
      const day = String(newDate.getDate()).padStart(2, '0');
      const month = String(newDate.getMonth() + 1).padStart(2, '0');
      const year = newDate.getFullYear();
      
      return `${year}-${month}-${day}`;
    };
    
    const transactionDataFiltered = dataTransaction.filter((item) => moment(formattedDate(item.createdAt)).isSameOrAfter(formattedDate(selectedDate[0])) && moment(formattedDate(item.createdAt)).isSameOrBefore(formattedDate(selectedDate[1])));
    
    const transactionData = new DataManager(transactionDataFiltered);

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

    const gridStatus = (props) => (
      <div>
        {props.status === 'canceled' ? (
          <div>
            <p style={{ color: 'red' }}>{props.status}</p>
          </div>
        ) : props.status === 'pending' ? (
          <div>
            <p style={{ color: 'orange' }}>{props.status}</p>
          </div>
        ) : (
          <div>
            <p style={{ color: 'green' }}>{props.status}</p>
          </div>
        )}
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
        headerText: 'Status',
        template: gridStatus,
        field: 'status',
        textAlign: 'Center',
        editType: 'dropdownedit',
        width: '100',
        edit: {
          params: {
            dataSource: new DataManager([
              { status: 'pending' },
              { status: 'completed' },
              { status: 'canceled' }
            ]),
            fields: { text: "status", value: "status" },
            query: new Query()
          }
        },
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

    console.log(selectedDate)

    return (
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='Page' title='Transaction History' />
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
              handleDeleteTransaction(args);
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
