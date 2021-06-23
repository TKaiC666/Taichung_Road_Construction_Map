import { useState } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Selectors = (props)=>{

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const {options, condition, setCondition, setPageIndex}= props;

    console.log('Selectors : '+condition.distriction);
    console.log(condition.date.start);
    console.log(condition.date.end);
    //e.target.value的資料型別是string，testApp的searchData是用型別做判斷式。
    //判斷方式有變再改寫。
    const handleDistChange = (e)=>{
        console.log('handle dist change');
        let dist = Number(e.target.value) === 0 ? 0 : e.target.value;
        let startDate = condition.date.start === null ? null : {...condition.date.start};
        let endDate = condition.date.end === null ? null : {...condition.date.end};

        let stack = condition.stack;
        if(stack.indexOf('distriction') === -1) stack.push('distriction');
        else if(dist === 0){
            while(stack.indexOf('distriction') !== -1){
                let popedConditioned = stack.pop();
            }
        }
        setPageIndex(0);
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
        if(update[0] !== null && update[1] === null) return;
        //datepicker按清空時執行，日期沒選完不會到這邊。
        if(update[0] === null && update[1] === null){
            console.log('clear date');
            let stack = condition.stack;
            while(stack.indexOf('date') !== -1){
                let popedConditioned = stack.pop();
            }
            setCondition({distriction:condition.distriction, date:{start: null, end: null}, stack:condition.stack});
            return;
        }
        let dist = condition.distriction;
        let startDate = {year: update[0].getFullYear(), month: update[0].getMonth() + 1, day: update[0].getDate()}
        let endDate = {year: update[1].getFullYear(), month: update[1].getMonth() + 1, day: update[1].getDate()}
        let stack = condition.stack;
        if(stack.indexOf('date') === -1) stack.push('date');
        setCondition({distriction:dist, date:{start: {...startDate}, end: {...endDate}}, stack:stack});
    }

    let distArr = Array.from({length: options.distriction.length},(_,index)=>index);

    return(
        <div className='selectors'>
            <div>
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
                    wrapperClassName='datePicker'
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
                />
            </div>
        </div>
    );
}

export default Selectors;