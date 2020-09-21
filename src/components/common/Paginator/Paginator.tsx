import React, {useState} from "react";
import classes from './Paginator.module.css';
import { Button } from "antd";

type PropsType = {
    totalUsersCount: number,
    currentPage: number,
    onPageChanged: (p: number) => void,
    pageSize: number,
    portionSize?: number
}


let Paginator: React.FC<PropsType> = ({totalUsersCount, currentPage, onPageChanged, pageSize, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div>
            <div>
                {portionNumber > 1 &&
                <Button onClick={() => setPortionNumber(portionNumber - 1)}>LEFT</Button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => <span
                    onClick={(e) => {onPageChanged(p)}}
                    className={currentPage === p ? classes.selectedPage : ''}
                >{p}</span>)}
                {portionCount > portionNumber &&
                <Button onClick={() => setPortionNumber(portionNumber + 1)}>RIGHT</Button>}
            </div>
        </div>
    )
};


export default Paginator;