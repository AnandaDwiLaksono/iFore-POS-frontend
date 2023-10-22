import React from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, Edit, Filter, GridComponent, Group, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataManager } from '@syncfusion/ej2-data';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ErrorAnimation, Header, LoadingAnimation } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

const Customer = () => {
  const{ currentColor } = useStateContext();

  const gridCustomerName = (props) => (
      <div className='flex items-center gap-5'>
        <div 
          className='rounded-full h-10 min-w-[40px] text-white flex items-center justify-center font-medium tracking-[0.15em]'
          style={{backgroundColor: currentColor}}
        >
          {props.name.split(' ').slice(0,2).map(word => word.charAt(0))}
        </div>
        <div className='text-center w-full'>
          {props.name}
        </div>
      </div>
  );

  const customerGrid = [
    { 
      type: 'checkbox',
      width: '50'
    },
    {
      field: 'id',
      headerText: 'Customer ID',
      width: '100',
      textAlign: 'Center',
      isPrimaryKey: true,
      visible: false
    },
    {
      field: 'name',
      headerText: 'Name',
      template: gridCustomerName,
      width: '200',
      textAlign: 'Center',
      validationRules: { required: true }
    },
    { field: 'phone_number',
      headerText: 'Phone Number',
      width: '100',
      textAlign: 'Center',
      validationRules: { required: true }
    },
    {
      field: 'email',
      headerText: 'Email',
      textAlign: 'Center',
      width: '100',
    },
    {
      field: 'address',
      headerText: 'Address',
      textAlign: 'Center',
      editType: 'textareaedit',
      width: '100',
    },
  ];

  const fetchCustomers = useQuery({
    queryKey: ['customers'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/customers`);
    }
  });

  const addCustomer = useMutation({
    mutationFn: (newDataCustomer) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/api/customers`, newDataCustomer);
    },
  });

  const editCustomer = useMutation({
    mutationFn: (newDataCustomer) => {
      return axios.put(`${process.env.REACT_APP_API_URL}/api/customers/${newDataCustomer.id}`, newDataCustomer);
    },
  });

  const handleEditCustomer = (newCustomer) => {
    const data = {
      id: newCustomer.id,
      name: newCustomer.name,
      phone_number: newCustomer.phone_number,
      email: newCustomer.email === undefined ? '' : newCustomer.email,
      address: newCustomer.address === undefined ? '' : newCustomer.address,
    };

    editCustomer.mutate(data);
    
    toast.success(`Item named ${newCustomer.name} has been edited!`);
  };

  if (fetchCustomers.isLoading) return (<LoadingAnimation />);

  if (fetchCustomers.isError) return (<ErrorAnimation />);
  
  if (fetchCustomers.isSuccess) {
    const customers = fetchCustomers.data.data.data.sort((a, b) => a.name.localeCompare(b.name));
    const dataCustomers = new DataManager(customers);

    const handleAddCustomer = (newCustomer) => {
      if (customers.filter(customer => customer.name === newCustomer.name || customer.phone_number === newCustomer.phone_number).length > 0) {
        toast.error('Customer already exist!')
      } else {
        const data = {
          name: newCustomer.name,
          phone_number: newCustomer.phone_number,
          email: newCustomer.email === undefined ? '' : newCustomer.email,
          address: newCustomer.address === undefined ? '' : newCustomer.address,
        };
    
        addCustomer.mutate(data);
        
        toast.success(`Customer named ${newCustomer.name} has been added!`);
      };
    };

    return (
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='Page' title='Customer' />
        <GridComponent id='gridcomp'
          dataSource={dataCustomers}
          allowPaging
          allowSorting
          allowFiltering
          allowReordering
          showColumnMenu
          allowTextWrap
          enableStickyHeader
          toolbar={['Search', 'Add', 'Edit']}
          editSettings={{
            allowEditing: true,
            allowAdding: true,
            mode: 'Dialog'
          }}
          filterSettings={{ type: 'Menu' }}
          width='auto'
          groupSettings={{ showGroupedColumn: true }}
          pageSettings={{
            pageCount: 4,
            pageSizes: true
          }}
          actionComplete={(args) => {
            if (args.requestType === 'save') {
              if (args.action === 'add') {
                handleAddCustomer(args.data);
              }

              if (args.action === 'edit') {
                handleEditCustomer(args.data);
              }
            }
          }}
        >
          <ColumnsDirective>
            {customerGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[Sort, Filter, Page, Edit, Selection, Search, Toolbar, Reorder, Group, ColumnMenu, Resize]}
          />
        </GridComponent>
      </div>
    );
  }
};

export default Customer;
