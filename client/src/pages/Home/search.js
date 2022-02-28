import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import axios from "axios";
import PerfumeSearch from "../../components/PerfumeSearch";
import '../Chat/App.css';


function Search() {
  const [search, setSearch] = useState('');
  const [perfumeList, setPerfumeList] = useState([]);
    const [reset, setReset] = useState(false);

  useEffect(() => {
    //console.log(msg);
    //setMsgs(c.data);
      //rend();
  }, []);


    const handleInput = event => {
	console.log(event);
        rend(event);

    };
    

    const rend = async (word) => {
        let q = { params: {} };
        q['params']['search'] = word;
        try {
	    await axios.get('http://localhost:8000/perfume/search', q).then( (c) => {
		console.log(typeof(c.data));
		console.log(c.data);
		setPerfumeList(c.data);
                //if (msgsList[0] == null || msgsList[0]['message_id'] != c.data[0]['message_id']){
		//    setMsgsList(c.data);
		//    console.log('reload');
                //} else {
		//    console.log('not reload');
                //}
		//setMsgs(c.data[0]);
	    }
	    );
        } catch (e) {
            console.error(e);
        }
        //return ( <div>{ms.map(m => <div>{m}</div>)}</div>);
        //return ( <div></div>);
    };

    let renderPerfumeList = perfumeList?.map((perfume) => {
        const { name, brand, scents, perfume_id, item_rating, middle_note, base_note } = perfume;
    //const m = perfume.name;

    //console.log(perfume.message);
	return (
	    <PerfumeSearch
		key={perfume_id}
		id={perfume_id}
		name={name}
		brand={brand}
		scents={scents}
		rating={item_rating}
              middle_note={middle_note}
              base_note={base_note}
	    />
	);
    });

  return (
    <div>
	    <div className="chatContainer">
		<div className="messageInputs">
      <input

	placeholder="Search..."
        onChange = {(event) => setSearch(event.target.value)}>
      </input>
      <button onClick={() => {handleInput(search);
                              //setReset(true);
                             }}>
        search
      </button>
		</div>
	    </div>
      
      <PerfumeLayout>{renderPerfumeList}</PerfumeLayout>
    </div>
  );
 //return(<div> hello </div>);
}
      //{renderPerfumeList}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 24px;
  align-self: center;
`;

const Heading = styled.h3`
  margin: 48px 0;
`;

const PerfumeLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 32px;
  padding-bottom: 150px;
`;

export default Search;
  //return (
  //  <div>
  //    <p> chat </p>
  //    {renderMsgsList}
  //    <input onChange = {(event) => setMsg(event.target.value)}>
  //    </input>
  //    <button onClick={() => {handleInput(msg);
  //                            setReset(true);
  //                           }}>
  //      Click me
  //    </button>
  //  </div>
  //);
