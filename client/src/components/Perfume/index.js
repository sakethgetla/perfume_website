import React from 'react';
import { perfumeList } from './_data/PerfumeList';

const AllPerfumes = () => {
    return (
        <div>
            <h1>All Perfumes</h1>
            <div>
                {perfumeList.map( (perfume, i) => {
                    return (
                        <div key={i}>
                            <h3>Name: {perfume.name}</h3>
                            <p>Notes: {perfume.notes}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AllPerfumes;