import React, {useState} from "react";
import classes from './Paginator.module.css';



let Paginator = ({totalUsersCount, currentPage, onPageChanged, pageSize, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages = [];
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
                <button onClick={() => setPortionNumber(portionNumber - 1)}>LEFT</button>}
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => <span
                    onClick={(e) => {onPageChanged(p)}}
                    className={currentPage === p && classes.selectedPage}
                >{p}</span>)}
                {portionCount > portionNumber &&
                <button onClick={() => setPortionNumber(portionNumber + 1)}>RIGHT</button>}
            </div>
        </div>
    )
};


export default Paginator;