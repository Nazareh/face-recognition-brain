import React from "react";

const Rank = ({user}) => {
    return (
        <div>
            <div className='white f3'>
                {`${user.name}, your current Rank is...`}
            </div>
            <div className='white f1'>
                {'#5'}
            </div>
        </div>
    )
};
export default Rank;