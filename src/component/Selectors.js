import { useState } from "react";
import DatePicker, { registerLocale } from 'react-datepicker';
import zh_TW from 'date-fns/locale/zh-TW';
import "react-datepicker/dist/react-datepicker.css";

const Selectors = (props)=>{

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [dateOnPicker,setDateOnPicker] = useState('');
    const {options, condition, mapParameters, setCondition, setPageIndex, setMapParameters}= props;

    registerLocale('zh-TW',zh_TW);

    const addZero2String = (time)=>{
        let _time = typeof time === "number" ? time.toString() : time;
        if(_time.length === 1) _time = '0'+_time;
        return _time;
    }

    const clearMapInfo = ()=>{
        setMapParameters({
            center: mapParameters.center,
            polygon: null,
            zoom: 11,
            selectMarker: mapParameters.selectMarker,
            closeInfoWindow: true
        });
    }

    console.log('Selectors : '+condition.distriction);
    //e.target.value的資料型別是string，testApp的searchData是用型別做判斷式。
    //判斷方式有變再改寫。
    const handleDistChange = (e)=>{
        console.log('handle dist change');
        let dist = Number(e.target.value) === 0 ? 0 : e.target.value;
        let startDate = condition.date.start === null ? null : {...condition.date.start};
        let endDate = condition.date.end === null ? null : {...condition.date.end};
        let _dateOnPicker = dateOnPicker;

        let stack = condition.stack;
        if(stack.indexOf('distriction') === -1) stack.push('distriction');
        else if(dist === 0){
            while(stack.indexOf('distriction') !== -1){
                let popedConditioned = stack.pop();
                if(popedConditioned === 'date'){
                    startDate = null;
                    endDate = null;
                    _dateOnPicker = '';
                    setDateOnPicker('');
                }
            }
        }

        clearMapInfo();
        setPageIndex(0);
        if(_dateOnPicker !== '') setDateOnPicker(`${startDate.year}/${addZero2String(startDate.month)}/${addZero2String(startDate.day)} - ${endDate.year}/${addZero2String(endDate.month)}/${addZero2String(endDate.day)}`);
        setCondition({distriction:dist,
                      date:{
                          start: startDate === null ? null : {...startDate},
                          end: endDate === null ? null : {...endDate}
                      },
                      stack:stack});
    }

    const handleDateChange = (update)=>{
        console.log(update);
        setDateRange(update);
        //如果結束日期尚未選擇，只更新date range。
        if(update[0] !== null && update[1] === null){
            console.log(update[0]);
            setDateOnPicker(`${update[0].getFullYear()}/${addZero2String(update[0].getMonth() + 1)}/${addZero2String(update[0].getDate())} -`);
            return;
        }
        //datepicker按清空時執行，日期沒選完不會到這邊。
        if(update[0] === null && update[1] === null){
            console.log('clear date');
            let stack = condition.stack;
            let _dist = condition.distriction;
            while(stack.indexOf('date') !== -1){
                let popedConditioned = stack.pop();
                if(popedConditioned === 'distriction'){
                    _dist = 0;
                    document.getElementById('districtionSelects').value = 0;
                }
            }

            clearMapInfo();
            setDateOnPicker('');
            setCondition({distriction:_dist, date:{start: null, end: null}, stack:stack});
            return;
        }
        let dist = condition.distriction;
        let startDate = {year: update[0].getFullYear(), month: update[0].getMonth() + 1, day: update[0].getDate()}
        let endDate = {year: update[1].getFullYear(), month: update[1].getMonth() + 1, day: update[1].getDate()}
        let stack = condition.stack;
        if(stack.indexOf('date') === -1) stack.push('date');
        clearMapInfo();
        setDateOnPicker(`${startDate.year}/${addZero2String(startDate.month)}/${addZero2String(startDate.day)} - ${endDate.year}/${addZero2String(endDate.month)}/${addZero2String(endDate.day)}`);
        setCondition({distriction:dist, date:{start: {...startDate}, end: {...endDate}}, stack:stack});
    }

    let distArr = Array.from({length: options.distriction.length},(_,index)=>index);
    console.log('Selectors : render start');
    return(
        <div className='selectors'>
            <select name='distriction'
                    id='districtionSelects'
                    onChange={handleDistChange}
            >
                <option value={0}>全地區</option>
                {
                    distArr.map((i)=>(
                        <option value={options.distriction[i]} key={options.distriction[i]}>{options.distriction[i]}</option>
                    ))
                }
            </select>
            <DatePicker
                value={dateOnPicker}
                locale='zh-TW'
                wrapperClassName='wrapperTaker'
                className='hellTacker'
                placeholderText='日期範圍'
                dateFormat='yyyy/MM/dd'
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                minDate={new Date(Object.values(options.date.start))}
                maxDat
                e={new Date(Object.values(options.date.end))}
                isClearable
                shouldCloseOnSelect={false}
                onChange={handleDateChange}
                onFocus={e => e.target.blur()}
            />
        </div>
    );
}

export default Selectors;