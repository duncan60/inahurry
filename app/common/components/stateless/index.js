import React from 'react';

export function HeaderInfo({type, station}){
    return (
        <p className="table-header__subsection">
            <small className="table-header__subsection--small">
                距離
            </small>
            {station.name}
            {type === 'twtraffic' ? '火車站' : ''}
            <small className="table-header__subsection--small">
                約 {(+station.dist).toFixed(2)} Km
            </small>
        </p>
    );
};

export function NotHasTrainsItem(){
    return (
        <li className="item">
            <div className="item__inner">
                <div className="item__heading">
                    <p>目前沒有任何列車</p>
                </div>
            </div>
        </li>
    );
};

export function ListGroup({title, items}){
    return (
        <div className="list-wrapper south-list">
            <p className="list-title"><span className="icon-train" />{title}</p>
            <ul className="list-group">
                {items}
            </ul>
        </div>
    );
};