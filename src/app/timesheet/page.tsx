'use client'
import { useRef, useState } from 'react';
import { ScheduleComponent, 
         ViewsDirective, 
         ViewDirective, 
         Day, 
         Week, 
         WorkWeek, 
         Month, 
         Inject, 
         Resize, 
         DragAndDrop } from '@syncfusion/ej2-react-schedule';

import { applyCategoryColor } from './helper';

import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import * as dataSource from './datasource.json';
import "./page.css";
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH5ec3ZWRWheUkxzX0s=');


const ScheduleToGrid = () => {
  const scheduleObj = useRef(null);
  const data = extend([], dataSource.zooEventsData, '', true);
  const viewOptions = [
      { text: 'Day', value: 'Day' },
      { text: 'Week', value: 'Week' },
      { text: 'WorkWeek', value: 'WorkWeek' },
      { text: 'Month', value: 'Month' }
  ];
  
  const fields = { text: 'text', value: 'value' };
  
  const [currentView, setCurrentView] = useState("Week");
  
  const onViewChange = (args: any) => {
      setCurrentView(args.value);
      scheduleObj.current.dataBind();
  };
  
  const onEventRendered = (args: any) => {
      applyCategoryColor(args, scheduleObj.current?.currentView);
  };
  return (
  <div className='flex container bg-center m-5 bg-slate-100'>
    <div className='flex'>
      <div className='flex-col'>
      <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
            Time Tracker Schedule
          </p>
        <DropDownListComponent width='100%' id="scheduleview" popupHeight="350px" index={1} dataSource={viewOptions} fields={fields} change={onViewChange} value={currentView} placeholder="Select a view"/>
        <ScheduleComponent width='100%' height='800px' ref={scheduleObj} selectedDate={new Date(2024, 10, 1)} eventSettings={{ dataSource: data }} eventRendered={onEventRendered} currentView={currentView}>
          <ViewsDirective>
            <ViewDirective option='Day'/>
            <ViewDirective option='Week'/>
            <ViewDirective option='WorkWeek'/>
            <ViewDirective option='Month'/>
          </ViewsDirective>
          <Inject services={[Day, Week, WorkWeek, Month, Resize, DragAndDrop]}/>
        </ScheduleComponent>
      </div>
    </div>    
  </div>
  );
};

export default ScheduleToGrid;
