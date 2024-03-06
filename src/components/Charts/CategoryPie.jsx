import { AccumulationChartComponent, AccumulationDataLabel, AccumulationLegend, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationTooltip, Inject, PieSeries } from '@syncfusion/ej2-react-charts'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import { useStateContext } from '../../contexts/ContextProvider';
import { LoadingAnimation, ErrorAnimation } from '../../components';
import { useEffect } from 'react';

const CategoryPie = ({ selectedDate }) => {
  const { currentMode } = useStateContext();

  const pieChartColor = ['#017aff', '#6c47ff', '#39c0c8', '#f96300', '#f34971', '#ff9382'];
  
  const { data, isLoading, isSuccess, isError, refetch } = useQuery(
    ['category', selectedDate],
    () => axios.post(`${process.env.REACT_APP_API_URL}/api/dashboard/category`, { startDate: selectedDate[0], endDate: selectedDate[1] }),
    { enabled: selectedDate !== null }
  );

  useEffect(() => {
    if (selectedDate) {
      refetch();
    }
  }, [selectedDate, refetch]);

  if (isLoading) return <LoadingAnimation />;

  if (isError) return <ErrorAnimation />;

  if (isSuccess) {
    const dataCategory = data?.data?.data;

    dataCategory.sort((a, b) => b.qty - a.qty);

    dataCategory.forEach((item, index) => {
      item.color = pieChartColor[index];
    });

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
            dataSource={dataCategory}
            pointColorMapping='color'
            xName="name"
            yName="qty"
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
}

export default CategoryPie
