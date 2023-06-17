import React from 'react';
import { ColumnDirective, ColumnMenu, ColumnsDirective, Edit, Filter, GridComponent, Group, Inject, Page, Reorder, Resize, Search, Selection, Sort, Toolbar } from '@syncfusion/ej2-react-grids';

import { Header } from '../components';

const gridInventoryName = (props) => (
    <div className='flex items-center gap-5'>
      <img
        className="rounded-full h-10 md:ml-3"
        src={props.InventoryImage}
        alt={props.Name}
      />
        {props.Name}
    </div>
);

const inventoryGrid = [
    { type: 'checkbox', width: '50' },
    {
      field: 'ItemID',
      headerText: 'Item ID',
      width: '100',
      textAlign: 'Center',
      isPrimaryKey: true,
      visible: false
    },
    {
      field: 'Name',
      template: gridInventoryName,
      width: '200',
      textAlign: 'Center'
    },
    { field: 'Category',
      width: '100',
      textAlign: 'Center',
      editType: 'dropdownedit',
      edit: {
        params: {
          dataSource: [
            { Category: 'AIO' },
            { Category: 'Coil' },
            { Category: 'Baterai' },
            { Category: 'Mod' },
            { Category: 'RDA' },
            { Category: 'Freebase' },
            { Category: 'Salt' },
            { Category: 'Liquid' },
            { Category: 'Pod' },
            { Category: 'Tank' },
            { Category: 'Charger' },
            { Category: 'Accesories' }
          ]
        }
      }
    },
    {
      field: 'Purchase',
      headerText: 'Purchase Price',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '100',
      format: 'N2' // Bug: Can't add Rp format at the beginning and the dot comma format 
    },
    {
      field: 'Selling',
      headerText: 'Selling Price',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '100',
      format: 'N2' // Bug: Can't add Rp format at the beginning and the dot comma format 
    },
    {
      headerText: 'Qty Stock',
      field: 'QtyStock',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '100',
      format: 'N' // Bug: The dot comma format
    },
    {
      field: 'Note',
      width: '200',
      textAlign: 'Center',
      visible: false
    }
];
  
const inventoryData = [
    {
        ItemID: 123456,
        Name: 'Oxva Velocity',
        Category: 'AIO',
        Purchase: 400000,
        Selling: 500000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123457,
        Name: 'Oxva Unipro Coil',
        Category: 'Coil',
        Purchase: 25000,
        Selling: 45000,
        QtyStock: 20,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123458,
        Name: 'Baterai VTC6 18650',
        Category: 'Baterai',
        Purchase: 80000,
        Selling: 100000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123459,
        Name: 'Hotcig R233',
        Category: 'Mod',
        Purchase: 400000,
        Selling: 500000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123460,
        Name: 'RDA Nitrous',
        Category: 'RDA',
        Purchase: 280000,
        Selling: 330000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123461,
        Name: 'Max Coil',
        Category: 'Coil',
        Purchase: 25000,
        Selling: 35000,
        QtyStock: 15,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123462,
        Name: 'B1 Coil',
        Category: 'Coil',
        Purchase: 45000,
        Selling: 65000,
        QtyStock: 15,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123463,
        Name: 'Secret Tiramisu Nic 3',
        Category: 'Freebase',
        Purchase: 120000,
        Selling: 140000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123464,
        Name: 'Blondies Bread Butter Buns Nic 3',
        Category: 'Freebase',
        Purchase: 120000,
        Selling: 140000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123465,
        Name: 'Secret Tiramisu Nic 6',
        Category: 'Freebase',
        Purchase: 120000,
        Selling: 140000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123466,
        Name: 'Blondies Bread Butter Buns Nic 6',
        Category: 'Freebase',
        Purchase: 120000,
        Selling: 140000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123467,
        Name: 'A La Carte Cream Caramel Nic 6 60 ml',
        Category: 'Freebase',
        Purchase: 120000,
        Selling: 140000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123468,
        Name: 'Caliburn AK2',
        Category: 'POD',
        Purchase: 200000,
        Selling: 150000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: 'Warna pink tinggal 1, warna oren ada 3, warna hitam tinggal 1'
    },
    {
        ItemID: 123469,
        Name: 'Dotpod Nano by Dotmod',
        Category: 'POD',
        Purchase: 320000,
        Selling: 300000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123470,
        Name: 'Catridge Dotpod',
        Category: 'Coil',
        Purchase: 45000,
        Selling: 50000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123471,
        Name: 'Ketan Jinak 60 ml',
        Category: 'Freebase',
        Purchase: 100000,
        Selling: 110000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123472,
        Name: 'Foom Bacco Series 30 ml',
        Category: 'Saltnic',
        Purchase: 100000,
        Selling: 110000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123473,
        Name: 'Secret Banana 60 ml',
        Category: 'Freebase',
        Purchase: 1200000,
        Selling: 140000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123456,
        Name: 'Oxva Velocity',
        Category: 'AIO',
        Purchase: 400000,
        Selling: 500000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    },
    {
        ItemID: 123456,
        Name: 'Oxva Velocity',
        Category: 'AIO',
        Purchase: 400000,
        Selling: 500000,
        QtyStock: 5,
        InventoryImage:
        'https://cdn.shopclues.com/images1/thumbnails/104158/320/320/148648730-104158193-1592481791.jpg',
        Note: ''
    }
];

inventoryData.sort((a, b) => a.Name.localeCompare(b.Name));

const Inventory = () => {
  return (
    <div className='m-2 md:m-10 p-2 md:p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl'>
      <Header category='Page' title='Inventory' />
      <GridComponent id='gridcomp'
        dataSource={inventoryData}
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
        <Inject services={[Sort, Filter, Page, Edit, Selection, Search, Toolbar, Reorder, Group, ColumnMenu, Resize]} />
      </GridComponent>
    </div>
  );
};

export default Inventory;
