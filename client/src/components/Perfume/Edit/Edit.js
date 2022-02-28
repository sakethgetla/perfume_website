import React, { useEffect, useState } from 'react';
import { perfumeList } from '../_data/PerfumeList';


const Delete = () => {
    const [currentList, setCurrentList] = useState(perfumeList);
    
    
    useEffect( () => {
        console.log("currentList: ", currentList);
        console.log("currentList.length: ", currentList.length);
    }, [currentList]);

    function deletePerfume(id) {
        const newList = currentList.filter(p => p.id !== id);
        console.log("newList: ", newList);
        setCurrentList(newList);

        // send changes database - make sure you use "newList" value
    }

    function renderPerfumes(){
        return(
            <>
                {currentList.map( (perfume, i) => {
                    return (
                        <div key={i}>
                            <input placeholder={perfume.name}></input>
                            <p>Notes: {perfume.notes}</p>
                            <button onClick={() => deletePerfume(perfume.id)}>Delete</button>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <h1>Delete Perfume</h1>
            <div>
                {currentList.length > 0 ?
                    renderPerfumes()
                    :
                    <p>No perfumes to delete!</p>
                }
            </div>
        </div>
    );
};

export default Delete;