import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function StylistDetail() {
  const { id } = useParams();  // Get the stylist ID from URL parameters
//   const navigate = useNavigate();  // For navigation after delete
  const [stylist, setStylist] = useState(null);  // State to hold the stylist data
  const [loading, setLoading] = useState(true);  // State for loading indicator

  useEffect(() => {
    fetch(`http://127.0.0.1:5555/stylists/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch stylist");
        }
        return res.json();
      })
      .then(stylistData => {
        setStylist(stylistData);  // Store fetched stylist in state
      })
      .catch(err => {
        console.error("Unable to fetch stylist details:", err);
      })
      .finally(() => {
        setLoading(false);  // Stop loading once data is fetched
      });
  }, [id]);

  // Delete stylist by ID
//   const handleDelete = () => {
//     fetch(`http://127.0.0.1:5555/stylists/${id}`, {
//       method: 'DELETE',
//     })
//       .then(res => {
//         if (res.ok) {
//           alert("Stylist deleted successfully");
//           navigate('/stylists');  // Redirect to the stylists list page
//         } else {
//           throw new Error("Failed to delete stylist");
//         }
//       })
//       .catch(err => {
//         console.error("Error deleting stylist:", err);
//       });
//   };

  if (loading) {
    return <div>Loading stylist...</div>; 
  }

  if (!stylist) {
    return <div>No stylist found.</div>; 
  }

  return (
    <div>
      <h2>Stylist Profile</h2>
      <p>Stylist: {stylist.name || 'Unknown'}</p>
      <p>Specialty: {stylist.specialty || 'Unknown'}</p>

 
      {/* <button 
        onClick={handleDelete} 
        style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
        Delete
      </button> */}
    </div>
  );
}

export default StylistDetail;
