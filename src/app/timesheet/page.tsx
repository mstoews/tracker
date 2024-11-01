'use client'
import { useRef, useState } from 'react';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { applyCategoryColor } from './helper';

import { extend } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import * as dataSource from './datasource.json';
import "./page.css";
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense('Ngo9BigBOggjHTQxAR8/V1NDaF5cWWtCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWH9fdnVUQ2VYUUJwWkQ=');

const ScheduleToGrid = () => {
  const scheduleObj = useRef(null);
  const data = extend([], dataSource.zooEventsData, null, true);
  const viewOptions = [
      { text: 'Day', value: 'Day' },
      { text: 'Week', value: 'Week' },
      { text: 'WorkWeek', value: 'WorkWeek' },
      { text: 'Month', value: 'Month' }
  ];
  const fields = { text: 'text', value: 'value' };
  const [currentView, setCurrentView] = useState("Week");
  const onViewChange = (args) => {
      setCurrentView(args.value);
      scheduleObj.current?.dataBind();
  };
  const onEventRendered = (args) => {
      applyCategoryColor(args, scheduleObj.current?.currentView);
  };
  return (
  <div className='flex container bg-center m-5 bg-slate-100'>
    <div className='flex'>
      <div className='flex-col'>
        <div className='flex text-4xl'>Time Tracker : Matthew</div>
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
