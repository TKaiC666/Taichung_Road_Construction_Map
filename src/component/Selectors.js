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
            center: {lat : 24.1512535, lng : 120.6617366},
            polygon: null,
            zoom: 12 + (Math.random() / 10000), //cluster的顯示問題
            selectMarker: mapParameters.selectMarker,
            closeInfoWindow: true
        });
    }

    //回傳值用destructuring assignment接
    const changeConditionPara = (target, para)=>{
        let _target = target;
        let _para = para;
        let [_workingState, _dist, _startDate, _endDate, _dateOnPicker] = [...para];
        if(_target === 'distriction'){
            _dist = 0;
        }else if(_target === 'date'){
            _startDate = null;
            _endDate = null;
            _dateOnPicker = '';
        }else if(_target === 'workingState'){
            _workingState = 0;
        }
        return([_workingState, _dist, _startDate, _endDate, _dateOnPicker]);
    }

    /**
     * 將指定變數從condition stack pop out
     * @param {*} target 要從condition stack pop out的條件
     * @param {*} para handler會用到的parameter
     * @returns 回傳pop後的condition stack和handler parameter
     */
    const popStack = (target, para)=>{
        console.log('popStack() : ');
        console.log([target, para]);
        let _stack = [...condition.stack]; //shallow copy
        let _para = para;
        let _target = target;
        //假設順序，distriction、date、workingState
        while(_stack.indexOf(_target) !== -1){
            let popElement = _stack.pop();
            if(popElement === _target){
                if(popElement === 'date'){
                    _para = changeConditionPara('date', _para);
                    setDateRange([null,null]);
                }else{
                    _para = changeConditionPara(popElement, _para);
                    document.getElementById(popElement+'Select').value = 0;
                }    
                break;
            }else if(popElement === 'date'){
                _para = changeConditionPara('date', _para);
                setDateRange([null,null]);
            }else{
                _para = changeConditionPara(popElement, _para);
                document.getElementById(popElement+'Select').value = 0;
            }    
        }
        console.log([_stack, _para]);
        return [_stack, _para];
    }

    console.log('Selectors : '+condition.distriction);
    //e.target.value的資料型別是string，testApp的searchData是用型別做判斷式。
    //判斷方式有變再改寫。

    const handleWorkingState = (e)=>{
        console.log('handle working state change : ');
        let dist = condition.distriction;
        let workingState = Number(e.target.value) === 0 ? 0 : e.target.value;
        let startDate = condition.date.start === null ? null : {...condition.date.start};
        let endDate = condition.date.end === null ? null : {...condition.date.end};
        let _dateOnPicker = dateOnPicker;
        let stack = condition.stack;

        if(stack.indexOf('workingState') === -1) stack.push('workingState');
        else if(workingState === 0){
            [stack, [workingState, dist, startDate, endDate, _dateOnPicker]] = popStack('workingState',[workingState, dist, startDate, endDate, _dateOnPicker]);
        }

        clearMapInfo();
        setPageIndex(0);
        if(_dateOnPicker !== '') setDateOnPicker(`${startDate.year}/${addZero2String(startDate.month)}/${addZero2String(startDate.day)} - ${endDate.year}/${addZero2String(endDate.month)}/${addZero2String(endDate.day)}`);
        else setDateOnPicker('');
        setCondition({workingState: workingState,
                      distriction:dist,
                      date:{
                        start: startDate === null ? null : {...startDate},
                        end: endDate === null ? null : {...endDate}
                      },
                      stack:stack});
    }
    
    const handleDistChange = (e)=>{
        console.log('handle dist change');
        let dist = Number(e.target.value) === 0 ? 0 : e.target.value;
        let workingState = condition.workingState;
        let startDate = condition.date.start === null ? null : {...condition.date.start};
        let endDate = condition.date.end === null ? null : {...condition.date.end};
        let _dateOnPicker = dateOnPicker;
        let stack = condition.stack;

        if(stack.indexOf('distriction') === -1) stack.push('distriction');
        else if(dist === 0){
            [stack, [workingState, dist, startDate, endDate, _dateOnPicker]] = popStack('distriction',[workingState, dist, startDate, endDate, _dateOnPicker]);
        }

        clearMapInfo();
        setPageIndex(0);
        if(_dateOnPicker !== '') setDateOnPicker(`${startDate.year}/${addZero2String(startDate.month)}/${addZero2String(startDate.day)} - ${endDate.year}/${addZero2String(endDate.month)}/${addZero2String(endDate.day)}`);
        else setDateOnPicker('');
        setCondition({workingState: workingState,
                      distriction:dist,
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
            let _workingState = condition.workingState;
            [stack, [_workingState, _dist, , , ,]] = popStack('date',[_workingState, _dist, null, null, null])

            clearMapInfo();
            setDateOnPicker('');
            setCondition({workingState:_workingState, distriction:_dist, date:{start: null, end: null}, stack:stack});
            return;
        }

        let dist = condition.distriction;
        let workingState = condition.workingState;
        let startDate = {year: update[0].getFullYear(), month: update[0].getMonth() + 1, day: update[0].getDate()}
        let endDate = {year: update[1].getFullYear(), month: update[1].getMonth() + 1, day: update[1].getDate()}
        let stack = condition.stack;
        if(stack.indexOf('date') === -1) stack.push('date');
        clearMapInfo();
        setPageIndex(0);
        setDateOnPicker(`${startDate.year}/${addZero2String(startDate.month)}/${addZero2String(startDate.day)} - ${endDate.year}/${addZero2String(endDate.month)}/${addZero2String(endDate.day)}`);
        setCondition({workingState:workingState, distriction:dist, date:{start: {...startDate}, end: {...endDate}}, stack:stack});
    }

    let workingStateArr = Array.from({length: options.workingState.length},(_,index)=>index);
    let distArr = Array.from({length: options.distriction.length},(_,index)=>index);
    console.log('Selectors : render start');
    return(
        <div className='selectors'>
            <select name='workingState'
                    id='workingStateSelect'
                    defaultValue='是'
                    onChange={handleWorkingState}
            >
                <option value={0}>全案件</option>
                {
                    workingStateArr.map((i)=>(
                        <option value={options.workingState[i]} key={options.workingState[i]}>
                            {options.workingState[i]==='是' ? '施工中' : '未施工'}
                        </option>
                    ))
                }
            </select>
            <select name='distriction'
                    id='districtionSelect'
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
                maxDate={new Date(Object.values(options.date.end))}
                isClearable
                shouldCloseOnSelect={false}
                onChange={handleDateChange}
                onFocus={e => e.target.blur()}
            />
        </div>
    );
}

export default Selectors;