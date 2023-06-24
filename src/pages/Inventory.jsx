import React, { useState } from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, Edit, Filter, GridComponent, Group, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataManager, Query } from '@syncfusion/ej2-data';

import { Header } from '../components';
import { useStateContext } from '../contexts/ContextProvider';
import { API_URL } from '../config/apiConfig';
import axios from 'axios';

const Inventory = () => {
  const{ currentColor } = useStateContext();

  const [categories, setCategories] = useState([]);

  const gridInventoryName = (props) => (
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

  const inventoryGrid = [
      { type: 'checkbox', width: '50' },
      {
        field: 'id',
        headerText: 'Item ID',
        width: '100',
        textAlign: 'Center',
        isPrimaryKey: true,
        visible: false
      },
      {
        field: 'name',
        headerText: 'Name',
        template: gridInventoryName,
        width: '200',
        textAlign: 'Center'
      },
      { field: 'category.name',
        headerText: 'Category',
        width: '100',
        textAlign: 'Center',
        editType: 'dropdownedit',
        edit: {
          params: {
            dataSource: new DataManager(categories),
            fields: { text: "name", value: "name" },
            query: new Query()
          }
        }
      },
      {
        field: 'purchase_price',
        headerText: 'Purchase Price',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '100',
        format: 'N2' // Bug: Can't add Rp format at the beginning and the dot comma format 
      },
      {
        field: 'selling_price',
        headerText: 'Selling Price',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '100',
        format: 'N2' // Bug: Can't add Rp format at the beginning and the dot comma format 
      },
      {
        headerText: 'Qty Stock',
        field: 'qty_stock',
        textAlign: 'Center',
        editType: 'numericedit',
        width: '100',
        format: 'N' // Bug: The dot comma format
      },
      {
        field: 'note',
        width: '200',
        textAlign: 'Center',
        visible: false
      }
  ];

  useQuery({
    queryKey: ['category'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/categories`);
    },
    onSuccess: (data) => {
      setCategories(data.data.data.map(item => ({
        name: item.name
      })));
    },
    onError: (error) => {
      console.log("error");
    }
  });

  const fetchInventories = useQuery({
    queryKey: ['inventory'],
    queryFn: () => {
      return axios.get(`${API_URL}/api/inventories`);
    }
  });

  // const addInventory = useMutation({
  //   mutationFn: (newInventory) => {
  //     return axios.post(`${API_URL}/api/inventories`, newInventory);
  //   },
  // });
  
  if (!fetchInventories.isLoading) {
    const inventories = fetchInventories.data.data.data.sort((a, b) => a.name.localeCompare(b.name));
    const dataInventories = new DataManager(inventories);

    return (
      <div className='m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
        <Header category='Page' title='Inventory' />
        <GridComponent id='gridcomp'
          dataSource={dataInventories}
          allowPaging
          allowSorting
          allowFiltering
          allowReordering
          allowGrouping
          showColumnMenu
          allowTextWrap
          enableStickyHeader
          toolbar={['Search', 'Add', 'Edit', 'Delete']}
          editSettings={{
            allowDeleting: true,
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
        >
          <ColumnsDirective>
            {inventoryGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[Sort, Filter, Page, Edit, Selection, Search, Toolbar, Reorder, Group, ColumnMenu, Resize]}
            toolbarClick={(args) => {
              console.log(args.item.id)
              if (args.item.id === 'gridcomp_add') {
                console.log('add')
              } else if (args.item.id === 'gridcomp_edit') {
                console.log('edit')
              } else if (args.item.id === 'gridcomp_delete') {
                console.log('delete')
              }

            }}
          />
        </GridComponent>
      </div>
    );
  }
};

export default Inventory;
