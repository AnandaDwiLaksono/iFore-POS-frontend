import { AccumulationChartComponent, AccumulationDataLabel, AccumulationLegend, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationTooltip, Inject, PieSeries } from '@syncfusion/ej2-react-charts'
import React from 'react'
import { useStateContext } from '../../contexts/ContextProvider';

const CategoryPie = () => {
  const { currentMode } = useStateContext();

  const pieChartData = [
    { x: 'Freebase', y: 34, color: '#017aff' },
    { x: 'Saltnic', y: 60, color: '#6c47ff' },
    { x: 'Coil', y: 49, color: '#39c0c8' },
    { x: 'Accessories', y: 15, color: '#f96300' },
    { x: 'Pod', y: 9, color: '#f34971' },
    { x: 'Mod', y: 1, color: '#ff9382' },
  ];

  return (
    <AccumulationChartComponent
      id='chart-pie'
      legendSettings={{ visible: true, textStyle: { color: currentMode === 'Dark' ? '#fff' : '#33373e' } }}
      height='324px'
      width='100%'
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      tooltip={{ enable: true }}
    >
      <Inject services={[AccumulationLegend, PieSeries, AccumulationDataLabel, AccumulationTooltip]} />
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          name="Category"
          dataSource={pieChartData}
          pointColorMapping='color'
          xName="x"
          yName="y"
          innerRadius="40%"
          startAngle={0}
          endAngle={360}
          radius="70%"
          explode
          explodeOffset="10%"
          explodeIndex={0}
          dataLabel={{
            visible: true,
            name: 'text',
            position: 'Inside',
            font: {
              fontWeight: '600',
              color: '#fff',
            },
          }}
        />
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  )
}

export default CategoryPie