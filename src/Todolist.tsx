import React from 'react';

type PropsType = {
    title: string;
}

export const Todolist: React.FC<PropsType> = (props) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <input/>
            </div>
            <div>
                <div style={{listStyle: 'none', paddingTop: '15px'}}>
                    <li>
                        <input type="checkbox" checked={true}/>
                        HTML & CSS
                    </li>
                    <li>
                        <input type="checkbox" checked={true}/>
                        Javascript
                    </li>
                    <li>
                        <input type="checkbox" checked={false}/>
                        React
                    </li>
                </div>
            </div>
        </div>
    );
};
