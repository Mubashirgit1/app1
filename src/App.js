import './App.css';
import { useState,useEffect,useReducer,useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

const query = `query{
  allLifts{
    name
    elevationGain
    status
  }
}`;

  const tahoe_peaks = [
    {name:"freel",elevation:10891},
    {name:"Monument",elevation:9002},
    {name:"pyramid",elevation:12055},
    {name:"Tallac",elevation:15000},
  ]; 
function List({data,renderItem,renderEmpty}){
  console.log(data.length);

return !data.length ? (renderEmpty) : (
  <ul>
    {data.map((item)=>(
      <li key={item.name}>{renderItem(item)}</li>
    ))}
  </ul>
);
}

function GithubUser({name,id,avatar}){
  return(
    <div>
      <h1>{name}</h1>
      <p>{id}</p>
      <img src={avatar} alt={name} height={150}/>
    </div>
  );
}

function Lift({name, elevationGain,status}){
  return(
    <div>
      <h1>{name}</h1>
      <p>{elevationGain} {status}</p>
    </div>
  );
}


export function History(){
    return (
      <div>
        <h1>Our History</h1>
      </div>
    );
}

export function Contact(){

const [error,setError] = useState(null);
const [loading, setLoading] = useState(false);
const [data, setData] = useState(null);

const opts = {
  method:"POST",
  headers:{"Content-Type" : "application/json"},
  body:JSON.stringify({query})
}

  useEffect(()=> {
    setLoading(true);
    fetch('https://snowtooth.moonhighway.com/',opts)
    .then((response)=>response.json())
    .then(setData)
    .then(() => setLoading(false))
    .catch(setError);

  },[]);
  if(loading){return <h1>Loading...</h1>}
  if(error){return <pre>{JSON.stringfy(error)}</pre>}
  if(!data) return null;
  console.log(data);
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>  
    </nav>
      <h1>Fetch Data From GraphQL</h1>
      {data.data.allLifts.map((lift)=>(
        <Lift name={lift.name} elevationGain={lift.elevationGain} status={lift.status}/>
      ))}
    </div>
  );
}
export function About(){
  const [emotion,setEmotion] = useState("happy");
  const [secondary, setSecondary] = useState("grateful");
  useEffect(()=> { 
  },[emotion,secondary]);

  useEffect(()=>{
  },[secondary])
  
  const [checked, setChecked] =useReducer((checked)=> !checked,false);


//////// use reference hooks

  const txttitle = useRef();
  const hexcolor = useRef();

  const submit1 = e =>{
    e.preventDefault();
    const title = txttitle.current.value;
    const color = hexcolor.current.value;
    txttitle.current.value ="";
    hexcolor.current.value ="";
    alert(`${title},${color}`);
  }; 
////// use state
  const [title , setTitle] = useState("");
  const [color , setColor] = useState("#000000");

  const Submit = e =>{
    e.preventDefault();
    alert(`${title},${color}`);
    setTitle('');
    setColor('#000000')
  }; 
 
  //// custom Hooks

    function useInput(initialValue){
      const [value,setValue]  = useState(initialValue);
        return [
          {
            value,
            onChange:(e) => setValue(e.target.value)
          },
          () =>setValue(initialValue)
        ]
    }

    const [titleProps , resetTitle] = useInput("");
    const [colorProps , resetColor] = useInput("#000000");

    const Submit2 = e =>{
      e.preventDefault();
      alert(`${titleProps.value},${colorProps.value}`);
      resetTitle();
      resetColor();
    }; 
  ////fetching API Data

    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(()=> {
      setLoading(true);
        fetch(`https://api.github.com/users/mubashirhussain77`)
        .then((response)=> response.json())
        .then(setData)
        .then(()=>setLoading(false))
        .catch(setError);
      },
      [])
      if(loading) return <h1>Loading</h1>;
      if(error) return <pre>{JSON.stringify(error)}</pre>;
      if(!data) return null; 
    return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>  
    </nav>
    <Outlet></Outlet>
      <h1>Current emotion is {emotion}</h1>
      <button onClick={()=> setEmotion("sad")} >Sad</button>
      <button onClick={()=> setEmotion("Excited")} >Excited</button>
      <button onClick={()=> setEmotion("upset")} >upset</button>
      <h2>Secondayry Emotion is {secondary}</h2>
      <button onClick={()=> setSecondary("tired")}>tired</button>
      <input type='checkbox' value={checked} onChange={()=>setChecked(checked)}/>
      <label>{checked ? "checked":"unchecked" }</label>
      <h2>with refference Hooks</h2>
      <form onSubmit={submit1}>
        <input type="text" ref={txttitle} placeholder='color title'  />
        <input type="color" ref={hexcolor} />
        <button>Add</button>
      </form>
      <h2>With UseState Hooks</h2>
      <form onSubmit={Submit}>
        <input type="text" value={title}  placeholder='color title' onChange={(event)=>
          setTitle(event.target.value)
        }/>

        <input type="color" value={color} onChange={(event)=>
          setColor(event.target.value)
        } />

        <button>Add</button>
      </form>

      <h2>Custom Hook</h2>
      <form onSubmit={Submit2}> 
        <input type="text"  placeholder='color title' {...titleProps} />
        <input type="color" {...colorProps}/>
        <button>Add</button>
      </form>
      
      {/* form handling hooks in React
      FormIK
      ReactHooks
      useHooks
      */}
      
      <h1>Fetching Data With Api</h1>
      <GithubUser name={data.login} id={data.id} avatar={data.avatar_url}/>
    </div>
  );
}
function Home(){
return (
  <div>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>  
    </nav>
      <List data={tahoe_peaks} 
      renderEmpty={<p>this list is empty</p>} 
      renderItem={(item)=> (<>{item.name} - {item.elevation} ft.</>)} />
  </div>
);
}
export function App() {
 return <Home/>
}


