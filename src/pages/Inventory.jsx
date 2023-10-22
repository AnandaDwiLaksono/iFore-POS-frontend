import React, { useState } from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, Edit, Filter, GridComponent, Group, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DataManager, Query } from '@syncfusion/ej2-data';
import axios from 'axios';
import { toast } from 'react-toastify';

import { ErrorAnimation, Header, LoadingAnimation } from '../components';
import { useStateContext } from '../contexts/ContextProvider';

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
        textAlign: 'Center',
        validationRules: { required: true }
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
        },
        validationRules: { required: true }
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
      return axios.get(`${process.env.REACT_APP_API_URL}/api/categories`);
    },
    onSuccess: (data) => {
      setCategories(data.data.data);
    },
    onError: (error) => {
      console.log("error");
    }
  });

  const fetchInventories = useQuery({
    queryKey: ['inventory'],
    queryFn: () => {
      return axios.get(`${process.env.REACT_APP_API_URL}/api/inventories`);
    }
  });

  const addInventory = useMutation({
    mutationFn: (newDataInventory) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/api/inventories`, newDataInventory);
    },
  });

  const editInventory = useMutation({
    mutationFn: (newDataInventory) => {
      return axios.put(`${process.env.REACT_APP_API_URL}/api/inventories/${newDataInventory.id}`, newDataInventory);
    },
  });

  // const deleteInventory = useMutation({
  //   mutationFn: (idInventory) => {
  //     return axios.delete(`${process.env.REACT_APP_API_URL}/api/inventories/${idInventory}`);
  //   },
  //   onSuccess: () => {
  //     toast.success('Item deleted successfully');
  //   }
  // });

  const addInventoryHistory = useMutation({
    mutationFn: (newDataInventoryHistory) => {
      return axios.post(`${process.env.REACT_APP_API_URL}/api/inventory_histories`, newDataInventoryHistory);
    },
  });

  const handleEditInventory = (newInventory, qtyOld) => {
    console.log(newInventory);
    console.log(qtyOld);

    const data = {
      id: newInventory.id,
      name: newInventory.name,
      category_id: categories.find(item => item.name === newInventory.category.name).id,
      purchase_price: newInventory.purchase_price,
      selling_price: newInventory.selling_price,
      qty_stock: newInventory.qty_stock,
      note: newInventory.note === undefined ? '' : newInventory.note
    };

    if (qtyOld !== newInventory.qty_stock) {
      const InventoryHistory = {
        item_id: newInventory.id,
        change_type: qtyOld > newInventory.qty_stock ? 'out' : 'in',
        quantity: newInventory.qty_stock,
        note: qtyOld > newInventory.qty_stock ? 'Reduce item' : 'Add item'
      }

      addInventoryHistory.mutate(InventoryHistory);
    }

    editInventory.mutate(data);
    
    toast.success(`Item named ${newInventory.name} has been edited!`);
  };

  if (fetchInventories.isLoading) return (<LoadingAnimation />);

  if (fetchInventories.isError) return (<ErrorAnimation />);
  
  if (fetchInventories.isSuccess) {
    const inventories = fetchInventories.data.data.data.sort((a, b) => a.name.localeCompare(b.name));
    const dataInventories = new DataManager(inventories);

    const handleAddInventory = (newInventory) => {
      if (inventories.filter(item => item.name === newInventory.name).length === 2) {
        toast.error(`Item named ${newInventory.name} already exists!`);
      } else {
        const data = {
          name: newInventory.name,
          category_id: categories.find(item => item.name === newInventory.category.name).id,
          purchase_price: newInventory.purchase_price,
          selling_price: newInventory.selling_price,
          qty_stock: newInventory.qty_stock,
          note: newInventory.note === undefined ? '' : newInventory.note
        };
    
        addInventory.mutate(data, {
          onSuccess: (data) => {
            const newDataInventoryHistory = {
              item_id: data.data.data.id,
              change_type: 'in',
              quantity: data.data.data.qty_stock,
              note: 'Add new item'
            };
    
            addInventoryHistory.mutate(newDataInventoryHistory);
          }
        });
        
        toast.success(`Item named ${newInventory.name} has been added!`);
      };
    };

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
          toolbar={['Search', 'Add', 'Edit']}
          editSettings={{
            // allowDeleting: true,
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
                handleAddInventory(args.data);
              }

              if (args.action === 'edit') {
                handleEditInventory(args.data, args.previousData.qty_stock);
              }
            }

            // if (args.requestType === 'delete') {
            //   args.data.forEach((item) => {
            //     deleteInventory.mutate(item.id);
            //   });    
            // }
          }}
        >
          <ColumnsDirective>
            {inventoryGrid.map((item, index) => (
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

export default Inventory;
