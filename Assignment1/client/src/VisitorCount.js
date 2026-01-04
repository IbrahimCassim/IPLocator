import React, { useEffect, useState } from 'react';

export default function VisitorCount ({ url }) {
    const [ count, setCount] = useState(null);
    
    useEffect(() => {
      fetch(url)
        .then(res => res.json())
        .then(res => setCount(res))
        .catch(() => null);
    }, []);
    
    if(count !== null){
      return (
        <p>The number of times users have visited this site: {count.visitorCount} </p>
      )
    }
    return null;
}